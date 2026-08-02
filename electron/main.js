/**
 * Kunlun Agent OS — Electron 主进程 (Main Process)
 * 
 * 职责：
 * 1. 检测 8888 端口是否可用，冲突时自动寻找可用端口（端口自愈）
 * 2. 以子进程方式启动 Express 网关 (src/index.js)
 * 3. 创建无边框桌面窗口，加载本地 index.html
 * 4. 网关崩溃时自动秒级热重启（守护进程保活）
 * 5. 将选定端口通过 IPC 注入到前端，前端动态修正 GATEWAY_URL
 */

const { app, BrowserWindow, ipcMain, shell, Menu, utilityProcess } = require('electron');
const path = require('path');
const net  = require('net');
const { spawn } = require('child_process');
const fs = require('fs');

// ==========================================
// 工具函数：探测可用端口（自愈机制）
// ==========================================
function findAvailablePort(startPort) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      // 端口冲突，自动尝试下一个
      resolve(findAvailablePort(startPort + 1));
    });
  });
}

// ==========================================
// 全局变量
// ==========================================
let mainWindow = null;
let gatewayProcess = null;
let activePort = 8888;
let restartCount = 0;
const MAX_RESTARTS = 10;

// ==========================================
function startGateway(port) {
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  const gatewayPath = isDev
    ? path.join(__dirname, '../src/index.js')
    : path.join(process.resourcesPath, 'app/src/index.js');

  const env = Object.assign({}, process.env, {
    PORT: String(port),
    NODE_ENV: isDev ? 'development' : 'production',
    KUNLUN_USER_DATA_PATH: app.getPath('userData') // ✅ 物理注入 OS 提供的安全可写目录
  });

  if (isDev) {
    // ------------------------------------------
    // 🛠️ 开发模式：使用系统 Node.js 启动网关
    // 原因：开发环境下本地 sqlite3 等原生模块是针对系统 Node 编译的，防止 ABI 报错崩溃。
    // ------------------------------------------
    const { spawn } = require('child_process');
    console.log(`[Electron] [Dev Mode] Starting gateway with system node on port ${port}`);
    gatewayProcess = spawn('node', [gatewayPath], {
      env,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    gatewayProcess.stdout.on('data', (data) => {
      console.log(`[Gateway STDOUT] ${data.toString().trim()}`);
    });

    gatewayProcess.stderr.on('data', (data) => {
      console.error(`[Gateway STDERR] ${data.toString().trim()}`);
    });

    gatewayProcess.on('exit', (code, signal) => {
      console.warn(`[Gateway] Dev Process exited with code=${code}, signal=${signal}`);
      handleGatewayExit(port);
    });
  } else {
    // ------------------------------------------
    // 📦 生产打包模式：使用内置 utilityProcess 启动网关
    // 原因：打包后，electron-builder 会自动将 sqlite3 原生模块重新编译为 Electron ABI。
    // 这样不仅免除了客户安装 Node.js 的技术依赖，且完美契合 Electron 原生模块签名，实现零依赖绿色运行。
    // ------------------------------------------
    console.log(`[Electron] [Prod Mode] Starting gateway with utilityProcess on port ${port}`);
    gatewayProcess = utilityProcess.fork(gatewayPath, [], {
      env,
      stdio: 'pipe'
    });

    gatewayProcess.stdout.on('data', (data) => {
      console.log(`[Gateway STDOUT] ${data.toString().trim()}`);
    });

    if (gatewayProcess.stderr) {
      gatewayProcess.stderr.on('data', (data) => {
        console.error(`[Gateway STDERR] ${data.toString().trim()}`);
      });
    }

    gatewayProcess.on('exit', (code) => {
      console.warn(`[Gateway] Prod UtilityProcess exited with code=${code}`);
      handleGatewayExit(port);
    });
  }
}

function handleGatewayExit(port) {
  if (restartCount < MAX_RESTARTS && mainWindow && !mainWindow.isDestroyed()) {
    restartCount++;
    console.log(`[Guardian] Auto-restarting gateway (attempt ${restartCount}/${MAX_RESTARTS})...`);
    setTimeout(() => startGateway(activePort), 1500);
  } else if (restartCount >= MAX_RESTARTS) {
    console.error('[Guardian] Max restart attempts reached. Please restart the app.');
  }
}

// ==========================================
// 创建主窗口
// ==========================================
async function createWindow() {
  // 1. 端口自愈探测
  activePort = await findAvailablePort(8888);
  console.log(`[Electron] Selected gateway port: ${activePort}`);

  // 2. 启动网关
  startGateway(activePort);

  // 3. 等待网关就绪（3.5 秒，给 node 子进程足够的启动时间）
  await new Promise(r => setTimeout(r, 3500));

  // 4. 创建窗口
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    titleBarStyle: 'hiddenInset',      // macOS 苹果原生交通灯按钮内嵌
    trafficLightPosition: { x: 18, y: 18 },
    backgroundColor: '#f5f5f7',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false,  // 先隐藏，等页面 ready 后显示（避免白屏闪烁）
    icon: getAppIcon(),
  });

  // 5. 加载页面（注入端口参数）
  const indexPath = path.join(__dirname, '../index.html');
  mainWindow.loadFile(indexPath, {
    query: { gateway_port: String(activePort) }
  });

  // 6. 页面加载完成后显示窗口（苹果丝滑淡入）
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // 通知前端使用正确的端口（延迟 500ms 确保 JS 上下文初始化完毕）
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.executeJavaScript(
          `try { 
            window.__GATEWAY_PORT__ = ${activePort}; 
            if(typeof window.initGatewayUrl === 'function') window.initGatewayUrl(${activePort});
            console.log('[Electron IPC] Gateway port injected:', ${activePort});
          } catch(e) { console.warn('initGatewayUrl not ready yet', e); }`
        ).catch(e => console.error('[Electron] executeJavaScript error:', e));
      }
    }, 500);
  });

  // 7. 外链在系统浏览器打开
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 8. 设置精简菜单
  buildAppMenu();
}

// ==========================================
// 应用图标（容错处理）
// ==========================================
function getAppIcon() {
  const assetsDir = path.join(__dirname, '../assets');
  if (process.platform === 'darwin' && fs.existsSync(path.join(assetsDir, 'icon.icns'))) {
    return path.join(assetsDir, 'icon.icns');
  }
  if (process.platform === 'win32' && fs.existsSync(path.join(assetsDir, 'icon.ico'))) {
    return path.join(assetsDir, 'icon.ico');
  }
  return undefined;
}

// ==========================================
// 苹果风格精简应用菜单
// ==========================================
function buildAppMenu() {
  const template = [
    {
      label: '昆仑增长 Agent OS',
      submenu: [
        { label: '关于', role: 'about' },
        { type: 'separator' },
        { label: '服务', role: 'services' },
        { type: 'separator' },
        { label: '隐藏', role: 'hide', accelerator: 'Cmd+H' },
        { label: '退出', role: 'quit', accelerator: 'Cmd+Q' },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '重做', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '全选', role: 'selectAll' },
      ],
    },
    {
      label: '视图',
      submenu: [
        { label: '重新载入', role: 'reload', accelerator: 'Cmd+R' },
        { label: '开发者工具', role: 'toggleDevTools', accelerator: 'Alt+Cmd+I' },
        { type: 'separator' },
        { label: '实际大小', role: 'resetZoom' },
        { label: '放大', role: 'zoomIn' },
        { label: '缩小', role: 'zoomOut' },
      ],
    },
    {
      label: '窗口',
      submenu: [
        { label: '最小化', role: 'minimize', accelerator: 'Cmd+M' },
        { label: '全屏', role: 'togglefullscreen' },
        { label: '关闭', role: 'close', accelerator: 'Cmd+W' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ==========================================
// IPC 处理：前端请求当前端口
// ==========================================
ipcMain.handle('get-gateway-port', () => activePort);

// ==========================================
// Electron 应用生命周期
// ==========================================
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// 退出前终止网关子进程
app.on('before-quit', () => {
  if (gatewayProcess) {
    console.log('[Electron] Killing gateway process before quit...');
    gatewayProcess.kill('SIGTERM');
    gatewayProcess = null;
  }
});

process.on('uncaughtException', (err) => {
  console.error('[Electron] Uncaught Exception:', err);
});
