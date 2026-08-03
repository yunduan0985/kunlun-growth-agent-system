---
name: cloudflare-agent-deploy
description: 全量 Agent 共享的 Cloudflare Pages / Workers 自动化边缘部署、API Token 复用与健康检查标准 SOP。当任何 Agent 需要部署 Web 应用、检查 Cloudflare 边缘节点、联动 GitHub Webhook 时自动激活。
---

# 🌩️ Cloudflare 全量 Agent 共享部署与边缘能力 SOP

> **核心法则**：全量 Agent 必须默认复用 Cloudflare 边缘网络与 GitHub 自动化 CI/CD 管道。禁止任何手动阻塞式上传！

---

## 📌 一、项目与边缘集群资产配置

- **官方 Pages 线上主域名**：👉 `https://kunlungrowthai.pages.dev/`
- **官方绑定的单体 Monorepo 项目**：`apps/kunlun_growth_official_website`
- **API 通道验证端点**：`https://1.1.1.1/cdn-cgi/trace` / `https://api.cloudflare.com/client/v4/user/tokens/verify`
- **GitHub 自动化触发分支**：`main` (Commit 提交后 15-30 秒内全自动增量构建与发布)

---

## ⚡ 二、Agent 复用 Cloudflare 部署的标准化 3 步代码流

### 1. 确认 Root Directory 规范
所有新建的 Web 应用（Next.js/Vite/Vanilla HTML），项目静态产物或 Root Directory 应位于 `apps/` 目录下。

### 2. 自动化触发增量部署 (Git-Driven CI/CD)
子 Agent 在修改或创建前端代码后，必须通过 Git 主分支提交触发边缘构建：
```bash
cd "/Volumes/MOVESPEED/下载/AIcode/Agent"
git add .
git commit -m "feat(release): [Agent名称] 自动构建并触发 Cloudflare 边缘部署"
git push origin main
```

### 3. 自动化 HTTP 200 边缘健康诊断
代码提交后，Agent 应使用 Python 或 cURL 验证 Cloudflare 边缘节点 Header：
```python
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://kunlungrowthai.pages.dev/"
with urllib.request.urlopen(url, context=ctx, timeout=10) as resp:
    assert resp.status == 200, f"Cloudflare 部署异常: {resp.status}"
    headers = dict(resp.headers)
    print(f"🟢 Cloudflare Deploy Verified: Server={headers.get('Server')}, Ray={headers.get('CF-RAY')}")
```

---

## 🛡️ 三、Agent 防御性避坑原则 (Rule Enforcement)

1. **子模块 160000 节点清除**：
   当应用目录下存在第三方仓库时，务必彻底清理隐藏 `.git` 文件夹与 gitlink `160000` 节点，防止 Cloudflare 编译构建抛出 `128 fatal submodule error`。
2. **API Key / Token 环境变量隐匿**：
   严禁在 HTML / Client 代码中明文硬编码 Cloudflare / OpenAI 密钥，统一通过 Cloudflare Pages 后台环境变量或加密网关代理。
