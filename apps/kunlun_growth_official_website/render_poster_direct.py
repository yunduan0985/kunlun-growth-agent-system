import time
import os
import subprocess

def render_poster():
    print("🚀 正在通过本地服务渲染无损 4K 海报原图...")
    
    # 使用 Python 启动临时 HTTP 服务
    server_proc = subprocess.Popen(["python3", "-m", "http.server", "8099"], cwd="/Volumes/MOVESPEED/下载/AIcode/Agent/apps/kunlun_growth_official_website")
    time.sleep(1.5)
    
    output_png = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/kunlun_growth_official_website/大帅_Marshall_麦肯锡风高奢微信社交名片海报_4K.png"
    
    # 尝试使用 macOS 自带或系统的网页截图渲染命令
    # 或者用 Chrome / Safari headless 截图
    chrome_paths = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
    ]
    
    chrome_cmd = None
    for path in chrome_paths:
        if os.path.exists(path):
            chrome_cmd = path
            break
            
    if chrome_cmd:
        print(f"✅ 使用 Chrome Headless 导出 4K 无损原图: {chrome_cmd}")
        cmd = [
            chrome_cmd,
            "--headless",
            "--disable-gpu",
            "--window-size=1200,1600",
            "--force-device-scale-factor=3",
            f"--screenshot={output_png}",
            "http://localhost:8099/poster_generator.html"
        ]
        subprocess.run(cmd, check=True)
        print(f"🎉 4K 超高清无损海报已成功生成至: {output_png}")
    else:
        print("⚠️ 尝试备用渲染...")
        
    server_proc.terminate()
    
    # 如果生成成功，使用 macOS open 打开图片
    if os.path.exists(output_png):
        subprocess.run(["open", output_png])

render_poster()
