/**
 * Electron Preload Script (预加载脚本)
 * 
 * 职责：在渲染进程（网页）和主进程之间提供安全的 IPC 桥接。
 * contextIsolation = true 保证网页无法直接访问 Node.js API。
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 获取网关实际运行端口（自愈后的端口）
  getGatewayPort: () => ipcRenderer.invoke('get-gateway-port'),
  
  // 判断是否在 Electron 桌面环境中运行
  isElectron: true,
  
  // 平台信息
  platform: process.platform,
});
