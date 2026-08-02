# Codex (扣子/Coze) 导入与集成指南

Codex (在国内称为扣子/Coze) 是字节跳动推出的高集成度 Agent 开发平台。它支持自定义 Bot、可视化工作流 (Workflows)、知识库 (Knowledge Base) 和插件 (Plugins) 绑定。

本合集中的 30 个 Agent 完美契合 Coze/Codex 的底层架构，以下是详细导入流程。

---

## 步骤一：创建并配置 Bot 基础人设

1. 登录 [Coze/Codex 平台](https://www.coze.com/)。
2. 点击左侧导航栏的 **Create Bot** (创建 Bot)，输入 Bot 的名称（如“昆仑选题官”）与描述。
3. 进入 Bot 编辑页，在左侧的 **Persona & Prompt** 输入框中，清空默认内容，完整复制并粘贴对应 Agent 的 `system_prompt.md` 内容。
4. 在 Model 设置中，建议选择推理能力较强的模型（如 GPT-4o 或 Claude 3.5 Sonnet），并将 Temperature 设为适合该 Agent 的值（内容组推荐 0.7，数据组和管理组推荐 0.2）。

---

## 步骤二：绑定外部工具 (Plugins)

如果 Agent（如：天眼查、视频转录助手、GitHub 检索）需要调用 API 进行外部交互：

1. 在 Bot 页面右侧的 **Plugins** 模块中，点击 **Add Plugin** -> **Create Custom Plugin** (创建自定义插件)。
2. 配置插件元数据：
   * **Plugin Name**: 建议与 Agent 对应（如 `Tianyancha_Tool`）。
   * **Schema Type**: 选择 **OpenAPI**。
   * **Authentication**: 根据实际后端服务选择（本地测试选 No Auth，生产环境选 API Key 或 Bearer Token）。
3. 选择 **Raw JSON** 模式，打开 Agent 目录下的 `tools.json`，将其内容复制并粘贴到 Schema 输入框中。
4. 点击“保存”并发布插件。
5. 返回 Bot 页面，在 Plugins 中搜索并添加刚才创建的插件，勾选需要激活的 API 端点。

---

## 步骤三：连接知识库 (Knowledge Base)

对于“帅总知识库”、“Notebook&Weread”以及“AI销冠”等重度依赖私有文档的 Agent：

1. 在 Coze 平台左侧导航栏中点击 **Knowledge Base** -> **Create Knowledge Base**。
2. 上传您的源文件（支持 PDF、TXT、Markdown、Word，或直接配置在线网页爬取 URL）。
3. 选择分段规则（如自动分段），等待知识库解析与向量化完成。
4. 回到对应的 Bot 编辑页，在右侧 **Knowledge** 模块点击 **Add Knowledge Base**，选择刚刚建立的知识库。
5. 此时，Agent 在回答问题时，会自动通过向量检索匹配最相关的信息作为上下文，再通过 `system_prompt.md` 中的规范组织语言输出。

---

## 步骤四：发布至飞书或其他渠道

1. Bot 调试完毕且效果满意后，点击页面右上角的 **Publish** (发布) 按钮。
2. 填写版本更新说明。
3. 在渠道发布列表中，勾选 **Lark/Feishu** (或者 Telegram、Discord、Web Widget)。
4. 如果是飞书渠道，按照平台引导完成飞书 App 授权即可。
