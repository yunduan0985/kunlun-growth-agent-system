import urllib.request

url = "http://localhost:8808/"
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=5) as resp:
        print(f"🎉 面壁官方原版 VoxCPM WebUI ({url}) 响应状态: HTTP {resp.status} (极速丝滑运行中!)")
except Exception as e:
    print(f"⚠️ 校验: {e}")
