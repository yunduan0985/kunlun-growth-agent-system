# 🌩️ Cloudflare 边缘计算与全量 Agent 共享部署 SOP

> **知识沉淀时间**：2026-08-03  
> **核心指示**：“Cloudflare 让我们的 Agent 能复用，我们有的，Agent 也要有！”  
> **适用范围**：全量 AI Agent 节点、自动化 CI/CD 构建、Cloudflare Pages 边缘节点发布与 API 复用

---

## 📌 一、 Cloudflare 边缘资产与配置标准

- **线上发布统一主域名**：👉 `https://kunlungrowthai.pages.dev/`
- **GitHub - Cloudflare 联动机制**：
  在 `kunlun-growth-agent-system` 仓库主分支 `main` 上发生的每一次 `git push`，Cloudflare Pages 会在 15-30 秒内自动捕获并完成边缘增量编译发布。
- **Agent 工具与 API 复用机制**：
  所有 AI Agent 节点在进行 Web 开发、测试及部署时，无需额外配置，统一复用此 Git-Driven 边缘网络。

---

## 🚀 二、全量 Agent 部署与连通性标准动作

1. **静态代码规范**：所有 Web 项目统一维护在 `/Volumes/MOVESPEED/下载/AIcode/Agent/apps/` 目录下。
2. **边缘发布指令**：
   ```bash
   cd "/Volumes/MOVESPEED/下载/AIcode/Agent"
   git add .
   git commit -m "feat(deploy): [Agent名称] 触发 Cloudflare 边缘秒级更新"
   git push origin main
   ```
3. **自动化边缘存活校验 (Health Check)**：
   Agent 提交代码后，通过访问 `https://kunlungrowthai.pages.dev/` 查验 HTTP 状态码是否为 200，并检查 `CF-RAY` 边缘节点 Header。

---

## 🛡️ 三、Subagents (子 Agent) 共享调度规程

- **共享 Skill**：`.agents/skills/cloudflare-agent-deploy/SKILL.md`
- **规则生效范围**：无论当前主 Agent 还是后续派生（Spawned）的 Subagents，均默认继承并可直接调用该 Cloudflare 边缘通道。
