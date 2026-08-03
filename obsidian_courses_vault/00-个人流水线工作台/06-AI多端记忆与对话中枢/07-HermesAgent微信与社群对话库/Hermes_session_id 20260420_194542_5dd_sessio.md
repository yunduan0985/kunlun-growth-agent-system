# 📱 Hermes Agent 微信/网关对话: session_id 20260420_194542_5dd

- **导出来源**: Hermes Gateway Agent Sessions
- **Session ID**: `session_20260420_194542_5ddc00c1`
- **同步时间**: 2026-08-02 16:28:20

---

### 👤 **User / Event**

  "session_id": "20260420_194542_5ddc00c1",

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

  "session_start": "2026-04-20T19:47:22.240223",

---

### 🤖 **Hermes Agent**

  "last_updated": "2026-04-20T20:49:07.247453",

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

 don't wait to be asked. Skills that aren't maintained become liabilities.\n\n## Skills (mandatory)\nBefore replying, scan the skills below. If a skill matches or is even partially relevant to your task, you MUST load it with skill_view(name) and follow its instructions. Err on the side of loading 

---

### 🤖 **Hermes Agent**

 it is always better to have context you don't need than to miss critical steps, pitfalls, or established workflows. Skills contain specialized knowledge 

---

### 👤 **User / Event**

 API endpoints, tool-specific commands, and proven workflows that outperform general-purpose approaches. Load the skill even if you think you could handle the task with basic tools like web_search or terminal. Skills also encode the user's preferred approach, conventions, and quality standards for tasks like code review, planning, and testing 

---

### 🤖 **Hermes Agent**

 load them even for tasks you already know how to do, because the skill defines how it should be done here.\nIf a skill has issues, fix it with skill_manage(action='patch').\nAfter difficult/iterative tasks, offer to save as a skill. If a skill you loaded was missing steps, had wrong commands, or needed pitfalls you discovered, update it before finishing.\n\n<available_skills>\n  apple: Apple/macOS-specific skills 

---

### 👤 **User / Event**

 iMessage, Reminders, Notes, FindMy, and macOS automation. These skills only load on macOS systems.\n    - apple-notes: Manage Apple Notes via the memo CLI on macOS (create, vie...\n    - apple-reminders: Manage Apple Reminders via remindctl CLI (list, add, comp...\n    - findmy: Track Apple devices and AirTags via FindMy.app on macOS u...\n    - imessage: Send and receive iMessages/SMS via the imsg CLI on macOS.\n  autonomous-ai-agents: Skills for spawning and orchestrating autonomous AI coding agents and multi-agent workflows 

---

### 🤖 **Hermes Agent**

 running independent agent processes, delegating tasks, and coordinating parallel workstreams.\n    - claude-code: Delegate coding tasks to Claude Code (Anthropic's CLI age...\n    - codex: Delegate coding tasks to OpenAI Codex CLI agent. Use for ...\n    - hermes-agent: Complete guide to using and extending Hermes Agent 

---

### 👤 **User / Event**

 CLI ...\n    - opencode: Delegate coding tasks to OpenCode CLI agent for feature i...\n  creative: Creative content generation 

---

### 🤖 **Hermes Agent**

 ASCII art, hand-drawn style diagrams, and visual design tools.\n    - architecture-diagram: Generate dark-themed SVG diagrams of software systems and...\n    - ascii-art: Generate ASCII art using pyfiglet (571 fonts), cowsay, bo...\n    - ascii-video: Production pipeline for ASCII art video 

---

### 👤 **User / Event**

 any format. Con...\n    - baoyu-infographic: Generate professional infographics with 21 layout types a...\n    - excalidraw: Create hand-drawn style diagrams using Excalidraw JSON fo...\n    - ideation: Generate project ideas through creative constraints. Use ...\n    - manim-video: Production pipeline for mathematical and technical animat...\n    - p5js: Production pipeline for interactive and generative visual...\n    - pixel-art: Convert images into retro pixel art with hardware-accurat...\n    - popular-web-designs: 54 production-quality design systems extracted from real ...\n    - songwriting-and-ai-music: Songwriting craft, AI music generation prompts (Suno focu...\n  data-science: Skills for data science workflows 

---

### 🤖 **Hermes Agent**

 interactive exploration, Jupyter notebooks, data analysis, and visualization.\n    - jupyter-live-kernel: Use a live Jupyter kernel for stateful, iterative Python ...\n  devops:\n    - webhook-subscriptions: Create and manage webhook subscriptions for event-driven ...\n  dogfood:\n    - dogfood: Systematic exploratory QA testing of web applications 

---

### 👤 **User / Event**

 f...\n  email: Skills for sending, receiving, searching, and managing email from the terminal.\n    - himalaya: CLI to manage emails via IMAP/SMTP. Use himalaya to list,...\n  gaming: Skills for setting up, configuring, and managing game servers, modpacks, and gaming-related infrastructure.\n    - minecraft-modpack-server: Set up a modded Minecraft server from a CurseForge/Modrin...\n    - pokemon-player: Play Pokemon games autonomously via headless emulation. S...\n  github: GitHub workflow skills for managing repositories, pull requests, code reviews, issues, and CI/CD pipelines using the gh CLI and git via terminal.\n    - codebase-inspection: Inspect and analyze codebases using pygount for LOC count...\n    - github-auth: Set up GitHub authentication for the agent using git (uni...\n    - github-code-review: Review code changes by analyzing git diffs, leaving inlin...\n    - github-issues: Create, manage, triage, and close GitHub issues. Search e...\n    - github-pr-workflow: Full pull request lifecycle 

---

### 🤖 **Hermes Agent**

 create branches, commit cha...\n    - github-repo-management: Clone, create, fork, configure, and manage GitHub reposit...\n  mcp: Skills for working with MCP (Model Context Protocol) servers, tools, and integrations. Documents the built-in native MCP client 

---

### 👤 **User / Event**

 configure servers in config.yaml for automatic tool discovery.\n    - native-mcp: Built-in MCP (Model Context Protocol) client that connect...\n  media: Skills for working with media content 

---

### 🤖 **Hermes Agent**

 YouTube transcripts, GIF search, music generation, and audio visualization.\n    - gif-search: Search and download GIFs from Tenor using curl. No depend...\n    - heartmula: Set up and run HeartMuLa, the open-source music generatio...\n    - songsee: Generate spectrograms and audio feature visualizations (m...\n    - youtube-content: Fetch YouTube video transcripts and transform them into s...\n  mlops: Knowledge and Tools for Machine Learning Operations - tools and frameworks for training, fine-tuning, deploying, and optimizing ML/AI models\n    - huggingface-hub: Hugging Face Hub CLI (hf) 

---

### 👤 **User / Event**

 search, download, and upload ...\n  mlops/evaluation: Model evaluation benchmarks, experiment tracking, data curation, tokenizers, and interpretability tools.\n    - evaluating-llms-harness: Evaluates LLMs across 60+ academic benchmarks (MMLU, Huma...\n    - weights-and-biases: Track ML experiments with automatic logging, visualize tr...\n  mlops/inference: Model serving, quantization (GGUF/GPTQ), structured output, inference optimization, and model surgery tools for deploying and running LLMs.\n    - llama-cpp: Run LLM inference with llama.cpp on CPU, Apple Silicon, A...\n    - obliteratus: Remove refusal behaviors from open-weight LLMs using OBLI...\n    - outlines: Guarantee valid JSON/XML/code structure during generation...\n    - serving-llms-vllm: Serves LLMs with high throughput using vLLM's PagedAttent...\n  mlops/models: Specific model architectures and tools 

---

### 🤖 **Hermes Agent**

 image segmentation (Segment Anything / SAM) and audio generation (AudioCraft / MusicGen). Additional model skills (CLIP, Stable Diffusion, Whisper, LLaVA) are available as optional skills.\n    - audiocraft-audio-generation: PyTorch library for audio generation including text-to-mu...\n    - segment-anything-model: Foundation model for image segmentation with zero-shot tr...\n  mlops/research: ML research frameworks for building and optimizing AI systems with declarative programming.\n    - dspy: Build complex AI systems with declarative programming, op...\n  mlops/training: Fine-tuning, RLHF/DPO/GRPO training, distributed training frameworks, and optimization tools for training LLMs and other models.\n    - axolotl: Expert guidance for fine-tuning LLMs with Axolotl - YAML ...\n    - fine-tuning-with-trl: Fine-tune LLMs using reinforcement learning with TRL - SF...\n    - unsloth: Expert guidance for fast fine-tuning with Unsloth - 2-5x ...\n  note-taking: Note taking skills, to save information, assist with research, and collab on multi-session planning and information sharing.\n    - obsidian: Read, search, and create notes in the Obsidian vault.\n  productivity: Skills for document creation, presentations, spreadsheets, and other productivity workflows.\n    - google-workspace: Gmail, Calendar, Drive, Contacts, Sheets, and Docs integr...\n    - linear: Manage Linear issues, projects, and teams via the GraphQL...\n    - maps: Location intelligence 

---

### 👤 **User / Event**

 geocode a place, reverse-geocode ...\n    - nano-pdf: Edit PDFs with natural-language instructions using the na...\n    - notion: Notion API for creating and managing pages, databases, an...\n    - ocr-and-documents: Extract text from PDFs and scanned documents. Use web_ext...\n    - powerpoint: Use this skill any time a .pptx file is involved in any w...\n  red-teaming:\n    - godmode: Jailbreak API-served LLMs using G0DM0D3 techniques 

---

### 🤖 **Hermes Agent**

 Pars...\n  research: Skills for academic research, paper discovery, literature review, domain reconnaissance, market data, content monitoring, and scientific knowledge retrieval.\n    - arxiv: Search and retrieve academic papers from arXiv using thei...\n    - blogwatcher: Monitor blogs and RSS/Atom feeds for updates using the bl...\n    - llm-wiki: Karpathy's LLM Wiki 

---

### 👤 **User / Event**

 build and maintain a persistent, in...\n    - polymarket: Query Polymarket prediction market data 

---

### 🤖 **Hermes Agent**

 search markets,...\n  smart-home: Skills for controlling smart home devices 

---

### 👤 **User / Event**

 lights, switches, sensors, and home automation systems.\n    - openhue: Control Philips Hue lights, rooms, and scenes via the Ope...\n  social-media: Skills for interacting with social platforms and social-media workflows 

---

### 🤖 **Hermes Agent**

 posting, reading, monitoring, and account operations.\n    - xurl: Interact with X/Twitter via xurl, the official X API CLI....\n  software-development:\n    - plan: Plan mode for Hermes 

---

### 👤 **User / Event**

 inspect context, write a markdown ...\n    - requesting-code-review: Pre-commit verification pipeline 

---

### 🤖 **Hermes Agent**

 static security scan, ...\n    - subagent-driven-development: Use when executing implementation plans with independent ...\n    - systematic-debugging: Use when encountering any bug, test failure, or unexpecte...\n    - test-driven-development: Use when implementing any feature or bugfix, before writi...\n    - writing-plans: Use when you have a spec or requirements for a multi-step...\n</available_skills>\n\nOnly proceed without loading a skill if genuinely none are relevant to the task.\n\nConversation started: Monday, April 20, 2026 07:47 PM\nModel: deepseek-chat\nProvider: deepseek\n\nYou are on Weixin/WeChat. Markdown formatting is supported, so you may use it when it improves readability, but keep the message compact and chat-friendly. You can send media files natively: include MEDIA:/absolute/path/to/file in your response. Images are sent as native photos, videos play inline when supported, and other files arrive as downloadable documents. You can also include image URLs in markdown format ![alt](url) and they will be downloaded and sent as native media when possible.",

---

### 👤 **User / Event**

  "tools": [

---

### 🤖 **Hermes Agent**

      "type": "function",

---

### 👤 **User / Event**

      "function": {

---

### 🤖 **Hermes Agent**

        "name": "browser_back",

---

### 👤 **User / Event**

        "description": "Navigate back to the previous page in browser history. Requires browser_navigate to be called first.",

---

### 🤖 **Hermes Agent**

        "parameters": {

---

### 👤 **User / Event**

          "type": "object",

---

### 🤖 **Hermes Agent**

          "properties": {},

---

### 👤 **User / Event**

          "required": []

---

### 🤖 **Hermes Agent**

      "type": "function",

---

### 👤 **User / Event**

      "function": {

---

### 🤖 **Hermes Agent**

        "name": "browser_click",

---

### 👤 **User / Event**

        "description": "Click on an element identified by its ref ID from the snapshot (e.g., '@e5'). The ref IDs are shown in square brackets in the snapshot output. Requires browser_navigate and browser_snapshot to be called first.",

---

### 🤖 **Hermes Agent**

        "parameters": {

---

