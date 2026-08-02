// 获取 tabBar 页面列表进行免检
const tabBarPages = (appJson.tabBar && appJson.tabBar.list || []).map(item => item.pagePath);

// 2. 扫描所有非主页的页面，保证具有返回键和回退逻辑
pages.forEach(pagePath => {
  if (tabBarPages.some(tabPath => pagePath.includes(tabPath))) {
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
  
  // 必须在模板包含返回钩子 (支持常见的返回函数及分包特有的 goDeck)
  const hasBackTemplate = wxml.includes("goBack") || wxml.includes("mp-back") || wxml.includes("navigateBack") || wxml.includes("backHome") || wxml.includes("wx.navigateBack") || wxml.includes("goDeck");
  // 必须在JS中定义回退或逻辑出口 (支持常见的返回函数及分包特有的 goDeck)
  const hasBackScript = js.includes("goBack") || js.includes("navigateBack") || js.includes("backHome") || js.includes("wx.navigateBack") || js.includes("goDeck");
  
  if (!hasBackTemplate || !hasBackScript) {
    failures.push(`${pagePath} 可能缺少回退出口 (Template: ${hasBackTemplate ? 'OK' : 'MISSING'}, Script: ${hasBackScript ? 'OK' : 'MISSING'})`);
  }
});