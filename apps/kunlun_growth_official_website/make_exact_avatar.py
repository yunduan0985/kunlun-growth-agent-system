import sys
from PIL import Image, ImageDraw, ImageFont, ImageOps

def create_exact_avatar():
    # 画布尺寸 1000x1000
    size = (1000, 1000)
    
    # 1. 创建立克莱因宝蓝背景 (#005ee6)
    bg_color = (0, 94, 230, 255)
    img = Image.new('RGBA', size, bg_color)
    
    # 2. 尝试使用系统毛笔/行书字体
    font_paths = [
        "/System/Library/Fonts/Supplemental/Kaiti.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
        "/System/Library/Fonts/PingFang.ttc"
    ]
    
    font = None
    for path in font_paths:
        try:
            font = ImageFont.truetype(path, 920)
            print(f"✅ 成功加载字体: {path}")
            break
        except Exception:
            continue
            
    if not font:
        font = ImageFont.load_default()
        
    # 3. 在 Mask 图像上绘制超大【帅】字 (撑满画布)
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    
    # 居中超大字体
    draw.text((500, 520), "帅", font=font, fill=255, anchor="mm")
    
    # 4. 创建白色字体图层，并在局部加入水彩粉色樱花印花
    # 创建纯白文字图层
    text_img = Image.new('RGBA', size, (255, 255, 255, 255))
    
    # 将文字应用到背景
    img.paste(text_img, (0, 0), mask=mask)
    
    # 转换为 RGB 并保存
    final_img = img.convert('RGB')
    final_img.save('/Volumes/MOVESPEED/下载/AIcode/Agent/apps/kunlun_growth_official_website/marshall_avatar.jpg', quality=98)
    print("✅ 精确合成基础图已保存！")

create_exact_avatar()
