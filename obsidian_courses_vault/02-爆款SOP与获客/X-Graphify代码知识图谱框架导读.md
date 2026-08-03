---
type: book-guide
domain: ai-agents, code-intelligence, knowledge-graph, rag
title: Graphify（Graphify-Labs）代码知识图谱框架导读
source: https://github.com/Graphify-Labs/graphify
author: Graphify-Labs（YC S26）
captured: 2026-08-03
full_repo: ~/.hermes/profiles/yiren/knowledge/graphify/
tags: [知识图谱, 代码分析, tree-sitter, 无向量库RAG, MCP, Claude Code, 代码检索]
related: knowledge/ai-job-search-overview.md, knowledge/claude-mem-architecture-notes.md, knowledge/fde-guidance-book-overview.md
extra_meta:
  stars: 101558
  forks: 9858
  license: Apache-2.0
  language: Python
  default_branch: v8
  homepage: https://www.graphify.com
  topics: [ai-agents, graphrag, knowledge-graph, tree-sitter, ast, claude-code, codex, cursor, gemini, mcp, leiden, skills, code-analysis]
---

# Graphify（Graphify-Labs）代码知识图谱框架导读

> 一句话定义：在 AI 编程助手里输入 `/graphify .`，把整个项目（代码、文档、PDF、图片、音视频）映射成一张**可查询的知识图谱**，用它代替 grep 逐文件翻代码。代码用 tree-sitter AST **确定性本地解析**（零 LLM、数据不出机器），带 `EXTRACTED`/`INFERRED` 边标签，**不是向量索引**——无 embedding、无向量库，是一张真正可遍历的图。101.5K★，Apache-2.0，YC S26。

## 为什么值得看（与 YIREN 的关联）
这是**"无向量库"确定性语义检索**的全球标杆——直接用树状语法解析出可查询的图，对比我们 `memory-auto-layer` kb_search.py 的 BM25 召回，是另一种更硬、零幻觉的"具身记忆"路线。它和《ai-job-search》一样是 Claude Code Skills 生态的顶流，且自带 MCP server 与 Obsidian 导出，能直接喂进我们的 agent 编排。

## 核心价值主张
- **代码免费全本地**：tree-sitter AST 确定性解析，无 LLM，数据不出机器（docs/PDF/图/视频才需语义通道，且要你显式配置 backend）。
- **每条边都有解释**：`EXTRACTED`（源码显式：import/直接调用）/ `INFERRED`（图解析推导：call-graph 二遍/上下文共现）/ `AMBIGUOUS`（不确定，进 GRAPH_REPORT.md 标给人审）。
- **不是向量索引**：无 embedding 无向量库，真图可遍历。问问题、求两概念最短路径、解释单概念。
- **零成本建索引**：graph build 用 0 LLM credits，约 supermemory 的 1/11 成本。

## 30 秒上手（三个文件）
```bash
uv tool install graphifyy      # CLI 装在 graphifyy 包（双 y），命令仍是 graphify
graphify install               # 注册 skill 到你的 AI 助手
# 然后 /graphify .
```
产出三个文件到 `graphify-out/`：
```
├── graph.html      浏览器打开，点节点/过滤/搜索
├── GRAPH_REPORT.md 要点：关键概念、意外连接、推荐提问
└── graph.json      全图，随时查询无需重读文件
```
支持 20+ 助手：Claude Code / Cursor / Codex / Gemini CLI / Copilot / Aider / Devin / Trae 等。

## 核心查询能力（真实输出）
```bash
graphify explain "APIRouter"     # 展示节点：来源文件L2210/社区/度47/47条连接
graphify path "FastAPI" "ModelField"   # 两概念最短路径(3跳)：FastAPI--uses-->DefaultPlaceholder<--references--get_request_handler()--references-->ModelField
graphify query "<问题>"           # 返回限定子图
```
- **God nodes**：连接最密的概念，一眼看出一切流经什么。
- **Communities**：Leiden 算法把图切分子系统，LLM-free 标签。
- **跨文件链接**：`calls`/`imports`/`inherits`/`mixes_in` 跨 ~40 语言解析。
- **Rationale + doc refs**：`# NOTE:`/`# WHY:` 注释和 ADR/RFC 引用变成图中一等节点。
- **Beyond code**：docs/PDF/图/音视频全部映射进同一张图。

## 架构：单函数流水线（无共享状态）
```
detect() → extract() → build_graph() → cluster() → analyze() → report() → export()
```
每阶段一个模块一个函数，通过纯 dict + NetworkX 图通信，无副作用全在 `graphify-out/`。

### 提取输出 schema（所有 extractor 统一）
```json
{"nodes":[{"id","label","source_file","source_location"}],
 "edges":[{"source","target","relation":"calls|imports|uses|...","confidence":"EXTRACTED|INFERRED|AMBIGUOUS"}]}
```
`validate.py` 在 `build_graph()` 前强制 schema。

## 基准成绩（同 harness 同模型 Kimi K2.6，盲评 90.6% 一致）
- LOCOMO(n=300) recall@10 = **0.497**（mem0 0.048、supermemory 0.149、BM25 0.362）
- LOCOMO QA 准确率 45.3%（+18 于 mem0，接近 supermemory 49.7% 但 ingest 是其 1/11 成本）
- LongMemEval-S QA 76%（与 dense RAG 打平）
- graph build LLM credits **$0**；ingest 约 $1.40（supermemory $15.67）
- 见 BENCHMARKS.md 全表

## 关键细节与陷阱
- **PyPI 包名是 `graphifyy`（双 y）**，其他 `graphify*` 包不官方。命令仍是 `graphify`。
- `uvx --from graphifyy graphify install`（直接 `uvx graphify` 会失败——工具名≠包名）。
- **避免 pip install**：skill 运行时按 `graphify-out/.graphify_python` 解析 Python，pip 装错环境会 `ModuleNotFoundError`。用 uv tool/pipx 隔离。
- **graphify: command not found**：装完 `~/.local/bin` 没进 PATH（新 macOS+zsh 常见），跑 `uv tool update-shell` 或 `pipx ensurepath`。或 `python -m graphify`。
- PowerShell 用 `graphify .` 不是 `/graphify .`（前斜杠是路径分隔符）。
- `wait`: graphify hook install 会把解释器路径硬编码进 hook 脚本，重装/升级需重跑 `graphify hook install`。
- **Strict 模式(Claude Code)**：`graphify install --project --strict` 会阻断会话第一次原始源码读、强制转图查询，之后恢复 nudge。可用 `GRAPHIFY_HOOK_STRICT=1/0` 切换。
- **新增语言 extractor**：在 `extract.py` 加 `extract_<lang>()`（tree-sitter parse → 走节点收集 nodes/edges → call-graph 二遍 INFERRED calls），注册后缀到 extract()/detect.py/watch.py，加 tree-sitter 依赖，加 fixture + test_languages.py 测试。

## 安全模型
所有外部输入过 `security.py`：URL 仅 http/https + `_NoFileRedirectHandler` 拦 file:// 重定向；`safe_fetch` 限尺寸超时；graph 路径必须 resolve 进 `graphify-out/`；label 清洗（去控制字符/截 256/HTML 转义）。见 SECURITY.md。

## 与 YIREN 引擎联动建议
1. **代码理解增强**：我们编排引擎/自动化脚本库若需理解大 codebase，可用 graphify 建图代替逐文件读——尤其 Claude Code 内容工厂、FDE 技能库这类多文件项目。gb_search 的 BM25 可与之互补。
2. **零幻觉语义检索参考**：graphify 的"EXTRACTED/INFERRED 边标签 + deterministic AST"给了我们 `memory-auto-layer` kb_search 一条"无 embedding 硬召回"升级思路（对结构化 agent 技能库尤其适用）。
3. **MCP 复用**：graphify 自带 MCP stdio server（`serve.py`），可挂进我们 native-mcp，让内容生产引擎直接图查询。
4. **Obsidian 导出**：graphify `export()` 直接产出 Obsidian vault 格式——和我们知识库天然打通。
