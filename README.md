# 昆仑增长多智能体 (Multi-Agent) 兼容合集

这是一个专为**昆仑增长**团队打造的、高度模块化的通用 Agent 配置合集。该合集共包含 **6 大业务分组、30 个核心 Agent**。

所有 Agent 的配置完全基于声明式标准（即：高精度 System Prompt + OpenAPI Tools 规范），不仅能完美兼容 **飞书机器人 / 多维表格**，还可以一键导入至 **Workbuddy**、**Codex (扣子/Coze)**、**Claude Projects**、**Marvis** 以及 **Hermes** 等国内外主流 Agent 平台。

---

## 📁 目录结构

本仓库结构清晰，每个 Agent 都拥有独立的目录，方便您针对特定平台“单兵导入”或整体部署：

```
.
├── README.md                           # 本说明文档
├── docker-compose.yml                  # 核心本地微服务（Dify, Whisper, Wechaty等）一键启动
├── agents/                             # 30个 Agent 配置包
│   ├── 01_agent_organization/          # agent组织部 (开发与多智能体拓扑监控)
│   ├── 02_data_group/                  # 数据组 (数据抓取、RAG 检索、转录与点赞监控)
│   ├── 03_content_group/               # 内容组 (选题、风控、公众号排版与知识星球发布)
│   ├── 04_management_group/            # 管理组 (CEO大脑、财务分析、项目及日程监控)
│   ├── 05_combat_group/                # 实战组 (情报监控与增长手册汇编)
│   └── 06_operation_group/             # 运营组 (答疑交付、销冠话术与设计海报生成)
├── mcp/                                # 昆仑增长 MCP 服务 (Node.js 编写)
│   └── kunlun_growth_mcp/              # 支持 Model Context Protocol 的工具网关
├── services/                           # 开源桥接微服务
│   ├── video_transcriber/              # 视频转录微服务 API 源码
│   └── meeting_summarizer/             # 会议纪要整理微服务 API 源码
└── docs/                               # 统一的多平台导入与集成指南
    ├── feishu_integration.md           # 飞书集成与多维表格配置指南
    ├── coze_codex_integration.md       # Coze/Codex 导入指南
    └── workbuddy_integration.md        # Workbuddy 导入指南
```

每一个 Agent 目录下均包含 4 个核心文件：
1. `metadata.json`：Agent 元数据（包含头像、名字、描述和平台兼容版本）。
2. `system_prompt.md`：结构化的高内聚 System Prompt。支持 Markdown 语法，内置防 AI 腔调逻辑与数据操作流。
3. `tools.json`：符合 OpenAPI 3.0 标准的自定义工具接口描述文件。
4. `import_guide.md`：针对该 Agent 的导入指南。

---

## 🛠️ 兼容平台导入快速指引

### 1. 导入至 飞书 (Feishu)
* **场景一：飞书自定义机器人**
  * 在飞书群聊或开发者后台创建自定义机器人，将 `system_prompt.md` 贴入指令区。
* **场景二：飞书多维表格 (Bitable) AI 字段**
  * 在多维表格中新增 AI 字段，配置角色指令为 `system_prompt.md` 的内容。在外部 Tool 栏中配置 `tools.json` 中的端点。
  * 详细指南见 [docs/feishu_integration.md](file:///Volumes/MOVESPEED/下载/AIcode/Agent/docs/feishu_integration.md)。

### 2. 导入至 Workbuddy / Codex (Coze)
* **步骤**：
  1. 打开 Workbuddy/Coze，选择“创建 Bot”。
  2. 将 `system_prompt.md` 贴入 **Persona & Prompt** 区。
  3. 点击右侧插件 (Plugins) -> 创建自定义插件，选择 **Raw JSON** 模式，将 `tools.json` 贴入并创建。之后在 Bot 中绑定该插件。
  4. 将“帅总知识库”等 PDF/TXT 文件上传至知识库模块，绑定到该 Bot。
  * 详细指南见 [docs/coze_codex_integration.md](file:///Volumes/MOVESPEED/下载/AIcode/Agent/docs/coze_codex_integration.md)。

### 3. 导入至 Claude (Projects)
* **步骤**：
  1. 打开 Claude.ai，新建 Project（项目）。
  2. 在项目的 Custom Instructions（自定义指令）中粘贴 `system_prompt.md`。
  3. 在 Project Files 中上传您需要该 Agent 具备的本地知识（例如将会员手册、销冠话术库、研报等上传为知识库）。

### 4. 导入至 Marvis / Hermes
* **步骤**：
  1. 登录平台，在“智能体”或“模型配置”处点击新建。
  2. 将 `metadata.json` 中的名称与建议头像填入。
  3. 将 `system_prompt.md` 作为 System Instruction 导入。
  4. 开启对 MCP (Model Context Protocol) 服务的支持，配置其连接到 `mcp/` 目录下的 MCP 服务器，即可自动识别昆仑增长的外部 API 工具。

---

## 🔗 后台开源微服务与 MCP 网关

本项目中，部分数据与抓取类 Agent 需要底层的 API 工具支持。我们为您设计并封装了：
1. **昆仑增长 MCP 服务器**：让 Claude/Marvis 直接调用天眼查、X检索等数据。
2. **视频转录微服务**：利用 `yt-dlp` 配合开源 `Whisper`，实现视频链接一键转录。
3. **微信机器人数据网关**：基于 `Wechaty`，实现群组对话数据的提取与监听。

您可以在服务器或本地使用 `docker-compose up -d` 快速部署上述开源微服务。

---

## 📝 30个 Agent 职责总览

请参考每个具体 Agent 目录下的 `metadata.json` 和 `system_prompt.md`：
- **agent组织部**：Claude code, agent架构师, agent运维官, agent应用审核专员, 技术专家。
- **数据组**：帅总知识库, 昆仑增长MCP, 天眼查, 微信数据专员, 会议纪要专员, 视频转录助手, Notebook&Weread, Github检索, X检索官, X点赞收集官。
- **内容组**：选题官, 风控官, content_expert, 内容生产官, 公众号编辑, 星球发布助手。
- **管理组**：AI帅总, CEO助理, 投资顾问, 项目经理, 财务分析师。
- **实战组**：情报收集者, 情报研究者, 昆仑增长手册编辑。
- **运营组**：会员交付负责人, AI销冠, AI设计师。
