# AI设计师 导入说明

本文档指导您如何将 **AI设计师** 导入各大 Agent 平台。

## 1. 导入至 飞书 (Feishu) / 捷径 (Lark Flow)
- **步骤**：
  1. 打开飞书后台 -> 自定义机器人，或者飞书多维表格（Bitable）。
  2. 新建一个多维表格 AI 字段或机器人，将 `system_prompt.md` 的内容全部复制并粘贴到 **System Prompt (系统提示词)** 输入框中。
  3. 如果需要绑定工具（例如：企业查询、转录等），在“API / 工具”中，点击“导入 OpenAPI”，并将 `tools.json` 中的内容复制导入。

## 2. 导入至 Workbuddy / Codex (Coze)
- **步骤**：
  1. 登录 Coze (扣子) / Workbuddy 平台。
  2. 点击 “创建 Bot”，选择“从零开始”。
  3. 在 **Persona & Prompt (人设与回复逻辑)** 中，黏贴 `system_prompt.md`。
  4. 如果配置了 Tools，在右侧面板的“Plugins (插件)”中选择“Create Custom Plugin (创建自定义插件)”，使用 Raw JSON 模式导入 `tools.json`。
  5. 在“Knowledge (知识库)”中，关联对应的知识库文件（如“帅总知识库”）。

## 3. 导入至 Claude (Projects)
- **步骤**：
  1. 打开 Claude.ai，进入 **Projects (项目)**。
  2. 创建新项目，在 **Custom Instructions (自定义指令)** 中，写入 `system_prompt.md` 的内容。
  3. 将项目相关的文档（作为知识库）上传至项目 Files 中。

## 4. 导入至 Marvis / Hermes
- **步骤**：
  1. 打开平台设置，新建 Agent/Bot 实例。
  2. 将 `metadata.json` 里的基本信息填入 Bot Profile。
  3. 将 `system_prompt.md` 填入 System Prompt 配置区。
