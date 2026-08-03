# 📱 Hermes Agent 微信/网关对话: session_id 20260423_185012_789

- **导出来源**: Hermes Gateway Agent Sessions
- **Session ID**: `session_20260423_185012_789bc6`
- **同步时间**: 2026-08-02 16:28:18

---

### 👤 **User / Event**

  "session_id": "20260423_185012_789bc6",

---

### 🤖 **Hermes Agent**

  "model": "deepseek-chat",

---

### 👤 **User / Event**

  "base_url": "https://api.deepseek.com/v1",

---

### 🤖 **Hermes Agent**

  "platform": "weixin",

---

### 👤 **User / Event**

  "session_start": "2026-04-23T18:50:12.242080",

---

### 🤖 **Hermes Agent**

  "last_updated": "2026-04-23T19:17:56.299543",

---

### 👤 **User / Event**

  "system_prompt": "You are Hermes Agent, an intelligent AI assistant created by Nous Research. You are helpful, knowledgeable, and direct. You assist users with a wide range of tasks including answering questions, writing and editing code, analyzing information, creative work, and executing actions via your tools. You communicate clearly, admit uncertainty when appropriate, and prioritize being genuinely useful over being verbose unless otherwise directed below. Be targeted and efficient in your exploration and investigations.\n\nConversation started: Thursday, April 23, 2026 06:50 PM\nModel: deepseek-chat\nProvider: deepseek\n\nYou are on Weixin/WeChat. Markdown formatting is supported, so you may use it when it improves readability, but keep the message compact and chat-friendly. You can send media files natively: include MEDIA:/absolute/path/to/file in your response. Images are sent as native photos, videos play inline when supported, and other files arrive as downloadable documents. You can also include image URLs in markdown format ![alt](url) and they will be downloaded and sent as native media when possible.",

---

### 🤖 **Hermes Agent**

  "tools": [

---

### 👤 **User / Event**

      "type": "function",

---

### 🤖 **Hermes Agent**

      "function": {

---

### 👤 **User / Event**

        "name": "process",

---

### 🤖 **Hermes Agent**

        "description": "Manage background processes started with terminal(background=true). Actions: 'list' (show all), 'poll' (check status + new output), 'log' (full output with pagination), 'wait' (block until done or timeout), 'kill' (terminate), 'write' (send raw stdin data without newline), 'submit' (send data + Enter, for answering prompts), 'close' (close stdin/send EOF).",

---

### 👤 **User / Event**

        "parameters": {

---

### 🤖 **Hermes Agent**

          "type": "object",

---

### 👤 **User / Event**

          "properties": {

---

### 🤖 **Hermes Agent**

            "action": {

---

### 👤 **User / Event**

              "type": "string",

---

### 🤖 **Hermes Agent**

              "enum": [

---

### 👤 **User / Event**

                "list",

---

### 🤖 **Hermes Agent**

                "poll",

---

### 👤 **User / Event**

                "log",

---

### 🤖 **Hermes Agent**

                "wait",

---

### 👤 **User / Event**

                "kill",

---

### 🤖 **Hermes Agent**

                "write",

---

### 👤 **User / Event**

                "submit",

---

### 🤖 **Hermes Agent**

                "close"

---

### 👤 **User / Event**

              ],

---

### 🤖 **Hermes Agent**

              "description": "Action to perform on background processes"

---

### 👤 **User / Event**

            },

---

### 🤖 **Hermes Agent**

            "session_id": {

---

### 👤 **User / Event**

              "type": "string",

---

### 🤖 **Hermes Agent**

              "description": "Process session ID (from terminal background output). Required for all actions except 'list'."

---

### 👤 **User / Event**

            },

---

### 🤖 **Hermes Agent**

            "data": {

---

### 👤 **User / Event**

              "type": "string",

---

### 🤖 **Hermes Agent**

              "description": "Text to send to process stdin (for 'write' and 'submit' actions)"

---

### 👤 **User / Event**

            },

---

### 🤖 **Hermes Agent**

            "timeout": {

---

### 👤 **User / Event**

              "type": "integer",

---

### 🤖 **Hermes Agent**

              "description": "Max seconds to block for 'wait' action. Returns partial output on timeout.",

---

### 👤 **User / Event**

              "minimum": 1

---

### 🤖 **Hermes Agent**

            },

---

### 👤 **User / Event**

            "offset": {

---

### 🤖 **Hermes Agent**

              "type": "integer",

---

### 👤 **User / Event**

              "description": "Line offset for 'log' action (default: last 200 lines)"

---

### 🤖 **Hermes Agent**

            },

---

### 👤 **User / Event**

            "limit": {

---

### 🤖 **Hermes Agent**

              "type": "integer",

---

### 👤 **User / Event**

              "description": "Max lines to return for 'log' action",

---

### 🤖 **Hermes Agent**

              "minimum": 1

---

