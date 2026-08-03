# 📱 Hermes Agent 微信/网关对话: session_id 20260505_222739_dd8

- **导出来源**: Hermes Gateway Agent Sessions
- **Session ID**: `session_20260505_222739_dd83e5`
- **同步时间**: 2026-08-02 16:28:19

---

### 👤 **User / Event**

  "session_id": "20260505_222739_dd83e5",

---

### 🤖 **Hermes Agent**

  "model": "deepseek-chat",

---

### 👤 **User / Event**

  "base_url": "https://api.deepseek.com/v1/",

---

### 🤖 **Hermes Agent**

  "platform": "weixin",

---

### 👤 **User / Event**

  "session_start": "2026-05-05T22:27:39.648411",

---

### 🤖 **Hermes Agent**

  "last_updated": "2026-05-05T22:28:46.264389",

---

### 👤 **User / Event**

  "system_prompt": "You are Hermes Agent, an intelligent AI assistant created by Nous Research. You are helpful, knowledgeable, and direct. You assist users with a wide range of tasks including answering questions, writing and editing code, analyzing information, creative work, and executing actions via your tools. You communicate clearly, admit uncertainty when appropriate, and prioritize being genuinely useful over being verbose unless otherwise directed below. Be targeted and efficient in your exploration and investigations.\n\nYou have persistent memory across sessions. Save durable facts using the memory tool: user preferences, environment details, tool quirks, and stable conventions. Memory is injected into every turn, so keep it compact and focused on facts that will still matter later.\nPrioritize what reduces future user steering 

---

### 🤖 **Hermes Agent**

 the most valuable memory is one that prevents the user from having to correct or remind you again. User preferences and recurring corrections matter more than procedural task details.\nDo NOT save task progress, session outcomes, completed-work logs, or temporary TODO state to memory; use session_search to recall those from past transcripts. If you've discovered a new way to do something, solved a problem that could be necessary later, save it as a skill with the skill tool.\nWrite memories as declarative facts, not instructions to yourself. 'User prefers concise responses' 

---

### 👤 **User / Event**

 'Always respond concisely' 

---

### 🤖 **Hermes Agent**

. 'Project uses pytest with xdist' 

---

### 👤 **User / Event**

 'Run tests with pytest -n 4' 

---

### 🤖 **Hermes Agent**

. Imperative phrasing gets re-read as a directive in later sessions and can cause repeated work or override the user's current request. Procedures and workflows belong in skills, not memory. When the user references something from a past conversation or you suspect relevant cross-session context exists, use session_search to recall it before asking them to repeat themselves. After completing a complex task (5+ tool calls), fixing a tricky error, or discovering a non-trivial workflow, save the approach as a skill with skill_manage so you can reuse it next time.\nWhen using a skill and finding it outdated, incomplete, or wrong, patch it immediately with skill_manage(action='patch') 

---

### 👤 **User / Event**

 don't wait to be asked. Skills that aren't maintained become liabilities.\n\n

---

### 🤖 **Hermes Agent**

\nMEMORY (your personal notes) [98% 

---

### 👤 **User / Event**

 2,161/2,200 chars]\n

---

### 🤖 **Hermes Agent**

\nSkill security audit system: ~/.hermes/skills/skill-security-audit/. Scans for eval/exec/curl|sh/miner/sensitive reads. All 14 skills audited: video-editing 

---

### 👤 **User / Event**

, browser-harness 

---

### 🤖 **Hermes Agent**

 (exec() by design, safe without API_KEY), 12 others 

---

### 👤 **User / Event**

 (godmode exec() is functional, all network calls legitimate).\n

---

### 🤖 **Hermes Agent**

k12-video-production

---

### 👤 **User / Event**

含FunClip阿里ASR中文转录

---

### 🤖 **Hermes Agent**

elite-content-strategy

---

### 👤 **User / Event**

task-discipline

---

### 🤖 **Hermes Agent**

老的individual skills已删

---

### 👤 **User / Event**

\nLLM Wiki 已初始化

---

### 🤖 **Hermes Agent**

SCHEMA.md包含学校/政策/内容/用户/业务五类标签

---

### 👤 **User / Event**

WIKI_PATH 环境变量需要设置

---

### 🤖 **Hermes Agent**

\n内容发布标准流程

---

### 👤 **User / Event**

1) TZ=Asia/Shanghai date 获取北京时间

---

### 🤖 **Hermes Agent**

3) 所有数据查官方来源

---

### 👤 **User / Event**

shmeea.edu.cn是分数线权威来源

---

### 🤖 **Hermes Agent**

4) 发布前过终审清单

---

### 👤 **User / Event**

已建 content-accuracy-audit 技能

---

### 🤖 **Hermes Agent**

OMNI-ContentForge 项目在 /Volumes/MOVESPEED/下载/AIcode/OMNI-ContentForge/

---

### 👤 **User / Event**

含 accuracy_engine 自动校验 + wechat_publish_gateway 公众号API发布

---

### 🤖 **Hermes Agent**

wx.limyai.com网关

---

### 👤 **User / Event**

\nK12升学知识库已建成

---

### 🤖 **Hermes Agent**

~/wiki/concepts/

---

### 👤 **User / Event**

每次写涉及数字/分数/日期/学校的文章

---

### 🤖 **Hermes Agent**

必须先查 wiki/index.md 确认数据

---

### 👤 **User / Event**

audit技能和elite-content-strategy都已更新

---

### 🤖 **Hermes Agent**

~/feishu-bridge/

---

### 👤 **User / Event**

排版用feishu_formatter.py

---

### 🤖 **Hermes Agent**

Unicode符号+

---

### 👤 **User / Event**

不支持equation/callout/quote/code block

---

### 🤖 **Hermes Agent**

读文档用feishu_reader.py

---

### 👤 **User / Event**

\nawesome-llm-apps项目分析已记录

---

### 🤖 **Hermes Agent**

~/wiki/concepts/awesome-llm-apps-analysis.md

---

### 👤 **User / Event**

主要基于agno框架+Streamlit

---

### 🤖 **Hermes Agent**

Apache-2.0协议

---

