const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const appJson = JSON.parse(fs.readFileSync(path.join(ROOT, "app.json"), "utf8"));
const projectJson = JSON.parse(fs.readFileSync(path.join(ROOT, "project.config.json"), "utf8"));

// 1. 获取所有的页面路径
const pages = [...(appJson.pages || [])];
if (appJson.subPackages) {
  appJson.subPackages.forEach(sub => {
    (sub.pages || []).forEach(page => {
      pages.push(`${sub.root}/${page}`);
    });
  });
}

const failures = [];

// 2. 扫描所有非主页的页面，保证具有返回键和回退逻辑
pages.forEach(pagePath => {
  if (pagePath.includes("pages/home/home") || pagePath.includes("pages/my/my")) {
    return; // 主页 Tab 页面不需要回退键
  }
  
  const wxmlPath = path.join(ROOT, `${pagePath}.wxml`);
  const jsPath = path.join(ROOT, `${pagePath}.js`);
  
  if (!fs.existsSync(wxmlPath) || !fs.existsSync(jsPath)) {
    failures.push(`文件缺失: ${pagePath} (wxml 或 js 缺失)`);
    return;
  }
  
  const wxml = fs.readFileSync(wxmlPath, "utf8");
  const js = fs.readFileSync(jsPath, "utf8");
  
  // 必须在模板包含返回钩子
  const hasBackTemplate = wxml.includes("goBack") || wxml.includes("mp-back") || wxml.includes("navigateBack") || wxml.includes("backHome") || wxml.includes("wx.navigateBack");
  // 必须在JS中定义回退或逻辑出口
  const hasBackScript = js.includes("goBack") || js.includes("navigateBack") || js.includes("backHome") || js.includes("wx.navigateBack");
  
  if (!hasBackTemplate || !hasBackScript) {
    failures.push(`${pagePath} 可能缺少回退出口 (Template: ${hasBackTemplate ? 'OK' : 'MISSING'}, Script: ${hasBackScript ? 'OK' : 'MISSING'})`);
  }
});

// 3. 校验 home.js 中是否具有完整的 5 学段入口定义
const homeJs = fs.readFileSync(path.join(ROOT, "pages/home/home.js"), "utf8");
const expectedStages = ["kindergarten", "primary_to_junior", "junior_middle", "junior_high", "high_school"];
expectedStages.forEach(stage => {
  if (!homeJs.includes(stage)) {
    failures.push(`home.js 缺失学段入口定义: ${stage}`);
  }
});

// 4. 计算主包资源体积
function mainPackageSize() {
  const ignores = (projectJson.packOptions && projectJson.packOptions.ignore) || [];
  const subpackages = (appJson.subPackages || []).map((item) => String(item.root || "").replace(/\/$/, ""));
  const cloudRoot = projectJson.cloudfunctionRoot ? String(projectJson.cloudfunctionRoot).replace(/\/$/, "") : "";
  
  function walkFiles(directory, base = directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkFiles(fullPath, base);
      return [{ fullPath, relativePath: path.relative(base, fullPath) }];
    });
  }
  
  function ignoredByProject(relativePath, ignores) {
    return ignores.some((item) => {
      const value = String(item.value || "").replace(/\/$/, "");
      if (item.type === "file") return relativePath === value;
      if (item.type === "folder") return relativePath === value || relativePath.startsWith(`${value}/`);
      return false;
    });
  }

  return walkFiles(ROOT)
    .filter(({ relativePath }) => !ignoredByProject(relativePath, ignores))
    .filter(({ relativePath }) => !subpackages.some((root) => relativePath === root || relativePath.startsWith(`${root}/`)))
    .filter(({ relativePath }) => !cloudRoot || (relativePath !== cloudRoot && !relativePath.startsWith(`${cloudRoot}/`)))
    .reduce((sum, item) => sum + fs.statSync(item.fullPath).size, 0);
}

const mainSize = mainPackageSize();
const sizeLimit = 2 * 1024 * 1024; // 2MB
if (mainSize > sizeLimit) {
  failures.push(`主包体积超限: ${Math.ceil(mainSize / 1024)}KB，已超过 2048KB 限制`);
}

if (failures.length) {
  console.error("发布门禁检查失败：\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`发布门禁全部通过！主包大小: ${Math.ceil(mainSize / 1024)}KB，WXML与学段配置扫描成功。`);