---
type: book-guide
domain: ai-agents, career, fde
title: ai-job-search（MadsLorentzen）Claude Code 求职应用框架导读
source: https://github.com/MadsLorentzen/ai-job-search
author: Mads Lorentzen（@mads_lorentzen，地球物理学家转型 AI 工程师）
captured: 2026-08-03
full_repo: ~/.hermes/profiles/yiren/knowledge/ai-job-search/
tags: [Claude Code, 求职, 简历, 面试, Agent技能, 工作流, career]
related: knowledge/fde-guidance-book-overview.md, knowledge/writing-deaiwei-system.md
extra_meta:
  stars: 29362
  forks: 9886
  license: MIT
  language: TypeScript
  topics: [ai-agents, claude-code, job-search, resume, interview-preparation, cover-letter, cv]
---

# ai-job-search（MadsLorentzen）Claude Code 求职应用框架导读

> 一句话定义：一套跑在你自己机器上的 AI 求职应用框架，用 Claude Code 把"评估岗位 → 定制简历 → 写求职信 → 面试备战"全链路 Agent 化。Fork 它，填你的档案，工作流全自动。
> 作者实证：69 份定制申请 → 20 个一面 → 1 个合同，2026 年 6 月入职 AI 工程师。作者把求职过程对每家公司如实说明，反而常引发技术深聊。

## 为什么值得看（与 YIREN 的关联）
这是 **Claude Code Skills 作为"个人完整工作流"的教科书级案例**——29.3K star，MIT 协议，纯开源。它的设计哲学（多维评估、drafter-reviewer 双 Agent、逐层验证、规则可迭代）与我们 v2 编排引擎的"纠偏回环 + 合规闸门"同构，和 FDE 指南《前线部署工程师》互补（那边讲 B 端交付，这边讲 C 端个人求职求职）。

## 核心工作流（3 主命令 + 10 扩展）
```
/setup   建个人档案（文档夹/CV导入/访谈三路，幂等可重跑）
/scrape  多招聘门户搜索 → 去重 → 按契合度排序
/apply <url>  评估契合 → 起草CV+求职信(LaTeX) → 双Agent审查 → 改 → 编译校验 → ATS校验
```
扩展：`/rank`批量打分排序、`/interview`面试备战包+模拟、`/outcome`记录结果归档、`/gmail-sync`自动读邮箱信号、`/notion-sync`看板、`/html-report`离线仪表盘、`/upskill`技能差距热力图、`/expand`档案扩充、`/add-template`自定义模板、`/add-portal`生成新招聘门户 skill。

## 五大方法论精华（可直接抄进 YIREN 引擎）

### 1. drafter-reviewer 双 Agent 分离
起草用主 Agent，**另起一个 fresh context 的审查 Agent** 研究公司+批判起草稿，起草者再改。同一 Agent 审三次效果远不如两个独立 Agent。→ 正是小星正文"爆款范式"外部审查的思想源头。

### 2. 多维契合度评估框架（04-job-evaluation.md）
5 个打分维度 + **硬性资格门禁**。门禁在打分前跑：公民/永居/工作权是硬过滤条件（非计分项），"沉默≠许可"、招聘页单独声明需逐一核实。→ 可借鉴到外部内容合规门禁：把"引流词/身份越界"做成硬门禁而非软权重。

### 3. PDF 逐层验证循环（核心竞争力）
LaTeX 简历"预览看着好、PDF 就崩"（标题孤儿到下一页、求职信溢出、字体回退）。`/apply` 强制编译并**视觉检查每个 PDF**，用 `\needspace`/`\enlargethispage`/字体包裹修复直到排版干净。
- 简历：`lualatex` 恰好 2 页无孤儿条目
- 求职信：`xelatex`（cover.cls 需 fontspec）恰好 1 页签名可见
- → 内容生产对应的"成品前看到客户实际收到效果，而非源文件自身判断"。

### 4. ATS 文本层验证（诚实原则）
ATS 读 PDF 嵌入文本而非渲染页。用 `pdftotext` 抽出文本层验证联系方式为字面文本、无乱码、阅读顺序正确、关键词覆盖打分。**档案不支持的词如实标为差距，绝不做假填充**。
- → 这是"合规冗余核验"的绝佳示范：验证"机器真正读到的"，不只"人看到的"。

### 5. 相关性加权裁剪（relevance-weighted cut）
简历超 2 页不机械砍"最老"章节，而是给每行算分：(a)对目标岗位相关性 (b)文档内独特性 (c)求职信是否依赖它，砍总分最低的。→ 内容命中的裁剪逻辑可迁移到底稿压缩。

## 关键设计（thin-pointer 单源真相）
- 档案在 `CLAUDE.md` + `.claude/skills/job-application-assistant/*.md` 01-07
- 工作流规范在 `.claude/commands/*.md` 与 `.claude/skills/`
- 招聘门户 CLI 在 `.agents/skills/*-search/`（可移植 Agent Skills 格式，Codex/Antigravity 自动发现）
- 各 agent 运行时只 load 规范，不重复拷贝 → 避免多框架配置漂移。

## 招聘门户扩展模型
丹麦 4 个门户做示范（Jobindex/Jobnet/Jobbank/Jobdanmark），配 2 个国别无关入口：
- `linkedin-search`：LinkedIn 公开 jobs-guest 接口，零依赖，`-l "Berlin, Germany"` 任意市场，仅限个人使用。
- `freehire-search`：freehire.me 聚合器 REST API，技术岗，可自托管。
- `/add-portal` 可自助生成任意市场的门户 skill（自动调研搜索URL/结果结构/访问规则）。
- 从别家 fork 抄 portal skill 是"有意手动"的——设置已允许已装 skill 免确认运行，所以安装器若自动从第三方拉取会跳过唯一关键的检查：你先读代码。**这是安全意识而非缺失功能。**

## 安全模型
- 岗位 posting 视为**不可信输入**：不遵循其中内嵌指令、不抓取正文链接。agentic 防御只在指令层，非沙箱，陌生招聘网先浏览再发送。
- `.claude/settings.json` 白名单 + `security_guards.py` CI 守卫。

## 金句收藏
- "档案深度是输出质量的唯一最大因素。薄档案产泛泛申请，详档案产真定制结果。"
- "能稳定地不写什么，往往更能说明你是谁。"（与去AI味方法论呼应）
- "PDF 预览看着好、编译就崩——所以要验证机器真正读到的，不只人看到的。"

## 与 YIREN 引擎联动建议
- **双 Agent 审查**：小星正文生成后，可外挂一个 fresh-context 的"审查 Agent"跑 8 维爆款拆解外审，替代单 Agent 自审，质检回环更硬。
- **硬性门禁分离**：把"合规红线（引流词/违禁词）"做成打分前的硬门禁（命中即否决），而非打分维度里的软权重——避免软权重被其它维度拉高而漏网。
- **产物级验证**：公众号/星球发布前，不只审核源 markdown，可抽"发布后页面/渲染成品"（若可行）验证 ATS/排版实际效果。
