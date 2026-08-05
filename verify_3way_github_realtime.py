import urllib.request
import ssl
import json
import subprocess
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

accounts = ["yunduan0985", "Daseanle", "shaunlee0561"]
repo_name = "kunlun-growth-agent-system"

print("============================================================")
print("🔍 正在对大帅 3 大 GitHub 账号进行 100% 真实 HTTP 探测与同步排查...")
print("============================================================")

results = {}

for acc in accounts:
    url = f"https://github.com/{acc}/{repo_name}"
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=8) as resp:
            print(f"🌐 账号 [{acc}] 仓库地址: {url}")
            print(f"   Status: HTTP {resp.status} OK (仓库已成功部署上云，可公开/私有访问！)")
            results[acc] = {"status": "HTTP 200 OK", "url": url, "exist": True}
    except urllib.error.HTTPError as e:
        print(f"⚠️ 账号 [{acc}] 探测返回: HTTP {e.code}")
        results[acc] = {"status": f"HTTP {e.code}", "url": url, "exist": False}
    except Exception as e:
        print(f"⚠️ 账号 [{acc}] 异常: {e}")
        results[acc] = {"status": f"ERR: {e}", "url": url, "exist": False}

print("------------------------------------------------------------")
print("⚡ 核心同步尝试 (Git Push 校验):")

repo_dir = "/Volumes/MOVESPEED/下载/AIcode/Agent"
os.chdir(repo_dir)

remotes = {
    "yunduan0985": "origin_yunduan",
    "Daseanle": "origin_dasean",
    "shaunlee0561": "origin_shaun"
}

for acc, remote in remotes.items():
    print(f"🚀 正在尝试推送到 [{acc}] ({remote})...")
    res = subprocess.run(["git", "push", remote, "main"], capture_output=True, text=True)
    if res.returncode == 0:
        print(f"   ✅ [{acc}] 推送成功！100% 镜像全量同步完成！")
    else:
        err = res.stderr.strip()
        print(f"   ℹ️ [{acc}] 结果: {err[:100]}")

print("============================================================")

