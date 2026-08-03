const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function createPerfectAvatar() {
    const width = 800;
    const height = 800;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 1. 绘制纯正克莱因宝蓝背景 (#0052cc)
    ctx.fillStyle = '#0052cc';
    ctx.fillRect(0, 0, width, height);

    // 2. 绘制超粗、饱满撑满框的汉字【帅】作为蒙版
    // 使用纯白色绘制极其粗壮的书法/黑体汉字
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 620px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 居中绘制超大【帅】字
    ctx.fillText('帅', width / 2, height / 2 + 30);

    // 导出高质量 JPEG
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    fs.writeFileSync('/Volumes/MOVESPEED/下载/AIcode/Agent/apps/kunlun_growth_official_website/marshall_avatar.jpg', buffer);
    console.log('✅ 100% 干净精确的宝蓝【帅】字头像生成完毕！');
}

createPerfectAvatar().catch(err => console.error(err));
