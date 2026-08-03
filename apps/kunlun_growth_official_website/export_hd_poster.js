const playwright = require('playwright');
const path = require('path');

async function exportHDPoster() {
    console.log('🚀 正在使用 Chromium 超高 DPI 渲染导出 4K 无损海报图片...');
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext({
        deviceScaleFactor: 3 // 3倍超高清 Retina 采样，告别任何截图模糊
    });
    const page = await context.newPage();
    
    const htmlPath = 'file://' + path.resolve(__dirname, 'poster_generator.html');
    await page.goto(htmlPath, { waitUntil: 'networkidle' });
    
    // 等待二维码和字体渲染完成
    await page.waitForTimeout(1000);
    
    const posterElement = await page.$('#poster');
    const outputPath = path.resolve(__dirname, 'marshall_official_poster_hd.png');
    
    if (posterElement) {
        await posterElement.screenshot({
            path: outputPath,
            type: 'png',
            omitBackground: true
        });
        console.log('🎉 4K 超高清无损海报已成功导出到:', outputPath);
    } else {
        console.error('❌ 未找到 #poster 元素');
    }
    
    await browser.close();
}

exportHDPoster().catch(err => {
    console.error('Playwright 渲染失败:', err);
});
