# 📱 Hermes Agent 微信/网关对话: role session_meta tools type f

- **导出来源**: Hermes Gateway Agent Sessions
- **Session ID**: `20260421_085258_2fea4078`
- **同步时间**: 2026-08-02 16:28:20

---

### 👤 **User / Event**

{"role": "session_meta", "tools": [{"type": "function", "function": {"name": "browser_back", "description": "Navigate back to the previous page in browser history. Requires browser_navigate to be called first.", "parameters": {"type": "object", "properties": {}, "required": []}}}, {"type": "function", "function": {"name": "browser_click", "description": "Click on an element identified by its ref ID from the snapshot (e.g., '@e5'). The ref IDs are shown in square brackets in the snapshot output. Requires browser_navigate and browser_snapshot to be called first.", "parameters": {"type": "object", "properties": {"ref": {"type": "string", "description": "The element reference from the snapshot (e.g., '@e5', '@e12')"}}, "required": ["ref"]}}}, {"type": "function", "function": {"name": "browser_console", "description": "Get browser console output and JavaScript errors from the current page. Returns console.log/warn/error/info messages and uncaught JS exceptions. Use this to detect silent JavaScript errors, failed API calls, and application warnings. Requires browser_navigate to be called first. When 'expression' is provided, evaluates JavaScript in the page context and returns the result 

---

### 🤖 **Hermes Agent**

 use this for DOM inspection, reading page state, or extracting data programmatically.", "parameters": {"type": "object", "properties": {"clear": {"type": "boolean", "default": false, "description": "If true, clear the message buffers after reading"}, "expression": {"type": "string", "description": "JavaScript expression to evaluate in the page context. Runs in the browser like DevTools console 

---

### 👤 **User / Event**

 full access to DOM, window, document. Return values are serialized to JSON. Example: 'document.title' or 'document.querySelectorAll(\"a\").length'"}}, "required": []}}}, {"type": "function", "function": {"name": "browser_get_images", "description": "Get a list of all images on the current page with their URLs and alt text. Useful for finding images to analyze with the vision tool. Requires browser_navigate to be called first.", "parameters": {"type": "object", "properties": {}, "required": []}}}, {"type": "function", "function": {"name": "browser_navigate", "description": "Navigate to a URL in the browser. Initializes the session and loads the page. Must be called before other browser tools. Use browser tools when you need to interact with a page (click, fill forms, dynamic content). Returns a compact page snapshot with interactive elements and ref IDs 

---

### 🤖 **Hermes Agent**

 no need to call browser_snapshot separately after navigating.", "parameters": {"type": "object", "properties": {"url": {"type": "string", "description": "The URL to navigate to (e.g., 'https://example.com')"}}, "required": ["url"]}}}, {"type": "function", "function": {"name": "browser_press", "description": "Press a keyboard key. Useful for submitting forms (Enter), navigating (Tab), or keyboard shortcuts. Requires browser_navigate to be called first.", "parameters": {"type": "object", "properties": {"key": {"type": "string", "description": "Key to press (e.g., 'Enter', 'Tab', 'Escape', 'ArrowDown')"}}, "required": ["key"]}}}, {"type": "function", "function": {"name": "browser_scroll", "description": "Scroll the page in a direction. Use this to reveal more content that may be below or above the current viewport. Requires browser_navigate to be called first.", "parameters": {"type": "object", "properties": {"direction": {"type": "string", "enum": ["up", "down"], "description": "Direction to scroll"}}, "required": ["direction"]}}}, {"type": "function", "function": {"name": "browser_snapshot", "description": "Get a text-based snapshot of the current page's accessibility tree. Returns interactive elements with ref IDs (like @e1, @e2) for browser_click and browser_type. full=false (default): compact view with interactive elements. full=true: complete page content. Snapshots over 8000 chars are truncated or LLM-summarized. Requires browser_navigate first. Note: browser_navigate already returns a compact snapshot 

---

### 👤 **User / Event**

 use this to refresh after interactions that change the page, or with full=true for complete content.", "parameters": {"type": "object", "properties": {"full": {"type": "boolean", "description": "If true, returns complete page content. If false (default), returns compact view with interactive elements only.", "default": false}}, "required": []}}}, {"type": "function", "function": {"name": "browser_type", "description": "Type text into an input field identified by its ref ID. Clears the field first, then types the new text. Requires browser_navigate and browser_snapshot to be called first.", "parameters": {"type": "object", "properties": {"ref": {"type": "string", "description": "The element reference from the snapshot (e.g., '@e3')"}, "text": {"type": "string", "description": "The text to type into the field"}}, "required": ["ref", "text"]}}}, {"type": "function", "function": {"name": "browser_vision", "description": "Take a screenshot of the current page and analyze it with vision AI. Use this when you need to visually understand what's on the page - especially useful for CAPTCHAs, visual verification challenges, complex layouts, or when the text snapshot doesn't capture important visual information. Returns both the AI analysis and a screenshot_path that you can share with the user by including MEDIA:<screenshot_path> in your response. Requires browser_navigate to be called first.", "parameters": {"type": "object", "properties": {"question": {"type": "string", "description": "What you want to know about the page visually. Be specific about what you're looking for."}, "annotate": {"type": "boolean", "default": false, "description": "If true, overlay numbered [N] labels on interactive elements. Each [N] maps to ref @eN for subsequent browser commands. Useful for QA and spatial reasoning about page layout."}}, "required": ["question"]}}}, {"type": "function", "function": {"name": "clarify", "description": "Ask the user a question when you need clarification, feedback, or a decision before proceeding. Supports two modes:\n\n1. **Multiple choice** 

---

### 🤖 **Hermes Agent**

 provide up to 4 choices. The user picks one or types their own answer via a 5th 'Other' option.\n2. **Open-ended** 

---

### 👤 **User / Event**

 omit choices entirely. The user types a free-form response.\n\nUse this tool when:\n- The task is ambiguous and you need the user to choose an approach\n- You want post-task feedback ('How did that work out?')\n- You want to offer to save a skill or update memory\n- A decision has meaningful trade-offs the user should weigh in on\n\nDo NOT use this tool for simple yes/no confirmation of dangerous commands (the terminal tool handles that). Prefer making a reasonable default choice yourself when the decision is low-stakes.", "parameters": {"type": "object", "properties": {"question": {"type": "string", "description": "The question to present to the user."}, "choices": {"type": "array", "items": {"type": "string"}, "maxItems": 4, "description": "Up to 4 answer choices. Omit this parameter entirely to ask an open-ended question. When provided, the UI automatically appends an 'Other (type your answer)' option."}}, "required": ["question"]}}}, {"type": "function", "function": {"name": "cronjob", "description": "Manage scheduled cron jobs with a single compressed tool.\n\nUse action='create' to schedule a new job from a prompt or one or more skills.\nUse action='list' to inspect jobs.\nUse action='update', 'pause', 'resume', 'remove', or 'run' to manage an existing job.\n\nTo stop a job the user no longer wants: first action='list' to find the job_id, then action='remove' with that job_id. Never guess job IDs 

---

### 🤖 **Hermes Agent**

 always list first.\n\nJobs run in a fresh session with no current-chat context, so prompts must be self-contained.\nIf skills are provided on create, the future cron run loads those skills in order, then follows the prompt as the task instruction.\nOn update, passing skills=[] clears attached skills.\n\nNOTE: The agent's final response is auto-delivered to the target. Put the primary\nuser-facing content in the final response. Cron jobs run autonomously with no user\npresent 

---

### 👤 **User / Event**

 built into hermes_tools):\n  json_parse(text: str) 

---

### 🤖 **Hermes Agent**

 json.loads with strict=False; use for terminal() output with control chars\n  shell_quote(s: str) 

---

### 👤 **User / Event**

 shlex.quote(); use when interpolating dynamic strings into shell commands\n  retry(fn, max_attempts=3, delay=2) 

---

### 🤖 **Hermes Agent**

 retry with exponential backoff for transient failures", "parameters": {"type": "object", "properties": {"code": {"type": "string", "description": "Python code to execute. Import tools with `from hermes_tools import terminal, ...` and print your final result to stdout."}}, "required": ["code"]}}}, {"type": "function", "function": {"name": "memory", "description": "Save durable information to persistent memory that survives across sessions. Memory is injected into future turns, so keep it compact and focused on facts that will still matter later.\n\nWHEN TO SAVE (do this proactively, don't wait to be asked):\n- User corrects you or says 'remember this' / 'don't do that again'\n- User shares a preference, habit, or personal detail (name, role, timezone, coding style)\n- You discover something about the environment (OS, installed tools, project structure)\n- You learn a convention, API quirk, or workflow specific to this user's setup\n- You identify a stable fact that will be useful again in future sessions\n\nPRIORITY: User preferences and corrections > environment facts > procedural knowledge. The most valuable memory prevents the user from having to repeat themselves.\n\nDo NOT save task progress, session outcomes, completed-work logs, or temporary TODO state to memory; use session_search to recall those from past transcripts.\nIf you've discovered a new way to do something, solved a problem that could be necessary later, save it as a skill with the skill tool.\n\nTWO TARGETS:\n- 'user': who the user is -- name, role, preferences, communication style, pet peeves\n- 'memory': your notes -- environment facts, project conventions, tool quirks, lessons learned\n\nACTIONS: add (new entry), replace (update existing -- old_text identifies it), remove (delete -- old_text identifies it).\n\nSKIP: trivial/obvious info, things easily re-discovered, raw data dumps, and temporary task state.", "parameters": {"type": "object", "properties": {"action": {"type": "string", "enum": ["add", "replace", "remove"], "description": "The action to perform."}, "target": {"type": "string", "enum": ["memory", "user"], "description": "Which memory store: 'memory' for personal notes, 'user' for user profile."}, "content": {"type": "string", "description": "The entry content. Required for 'add' and 'replace'."}, "old_text": {"type": "string", "description": "Short unique substring identifying the entry to replace or remove."}}, "required": ["action", "target"]}}}, {"type": "function", "function": {"name": "patch", "description": "Targeted find-and-replace edits in files. Use this instead of sed/awk in terminal. Uses fuzzy matching (9 strategies) so minor whitespace/indentation differences won't break it. Returns a unified diff. Auto-runs syntax checks after editing.\n\nReplace mode (default): find a unique string and replace it.\nPatch mode: apply V4A multi-file patches for bulk changes.", "parameters": {"type": "object", "properties": {"mode": {"type": "string", "enum": ["replace", "patch"], "description": "Edit mode: 'replace' for targeted find-and-replace, 'patch' for V4A multi-file patches", "default": "replace"}, "path": {"type": "string", "description": "File path to edit (required for 'replace' mode)"}, "old_string": {"type": "string", "description": "Text to find in the file (required for 'replace' mode). Must be unique in the file unless replace_all=true. Include enough surrounding context to ensure uniqueness."}, "new_string": {"type": "string", "description": "Replacement text (required for 'replace' mode). Can be empty string to delete the matched text."}, "replace_all": {"type": "boolean", "description": "Replace all occurrences instead of requiring a unique match (default: false)", "default": false}, "patch": {"type": "string", "description": "V4A format patch content (required for 'patch' mode). Format:\n*** Begin Patch\n*** Update File: path/to/file\n@@ context hint @@\n context line\n-removed line\n+added line\n*** End Patch"}}, "required": ["mode"]}}}, {"type": "function", "function": {"name": "process", "description": "Manage background processes started with terminal(background=true). Actions: 'list' (show all), 'poll' (check status + new output), 'log' (full output with pagination), 'wait' (block until done or timeout), 'kill' (terminate), 'write' (send raw stdin data without newline), 'submit' (send data + Enter, for answering prompts), 'close' (close stdin/send EOF).", "parameters": {"type": "object", "properties": {"action": {"type": "string", "enum": ["list", "poll", "log", "wait", "kill", "write", "submit", "close"], "description": "Action to perform on background processes"}, "session_id": {"type": "string", "description": "Process session ID (from terminal background output). Required for all actions except 'list'."}, "data": {"type": "string", "description": "Text to send to process stdin (for 'write' and 'submit' actions)"}, "timeout": {"type": "integer", "description": "Max seconds to block for 'wait' action. Returns partial output on timeout.", "minimum": 1}, "offset": {"type": "integer", "description": "Line offset for 'log' action (default: last 200 lines)"}, "limit": {"type": "integer", "description": "Max lines to return for 'log' action", "minimum": 1}}, "required": ["action"]}}}, {"type": "function", "function": {"name": "read_file", "description": "Read a text file with line numbers and pagination. Use this instead of cat/head/tail in terminal. Output format: 'LINE_NUM|CONTENT'. Suggests similar filenames if not found. Use offset and limit for large files. Reads exceeding ~100K characters are rejected; use offset and limit to read specific sections of large files. NOTE: Cannot read images or binary files 

---

### 👤 **User / Event**

 use vision_analyze for images.", "parameters": {"type": "object", "properties": {"path": {"type": "string", "description": "Path to the file to read (absolute, relative, or ~/path)"}, "offset": {"type": "integer", "description": "Line number to start reading from (1-indexed, default: 1)", "default": 1, "minimum": 1}, "limit": {"type": "integer", "description": "Maximum number of lines to read (default: 500, max: 2000)", "default": 500, "maximum": 2000}}, "required": ["path"]}}}, {"type": "function", "function": {"name": "search_files", "description": "Search file contents or find files by name. Use this instead of grep/rg/find/ls in terminal. Ripgrep-backed, faster than shell equivalents.\n\nContent search (target='content'): Regex search inside files. Output modes: full matches with line numbers, file paths only, or match counts.\n\nFile search (target='files'): Find files by glob pattern (e.g., '*.py', '*config*'). Also use this instead of ls 

---

### 🤖 **Hermes Agent**

 FTS5 defaults to AND which misses sessions that only mention some terms. If a broad OR query returns nothing, try individual keyword searches in parallel. Returns summaries of the top matching sessions.", "parameters": {"type": "object", "properties": {"query": {"type": "string", "description": "Search query 

---

### 👤 **User / Event**

 reusable approaches for recurring task types. New skills go to ~/.hermes/skills/; existing skills can be modified wherever they live.\n\nActions: create (full SKILL.md + optional category), patch (old_string/new_string 

---

### 🤖 **Hermes Agent**

 preferred for fixes), edit (full SKILL.md rewrite 

---

### 👤 **User / Event**

 major overhauls only), delete, write_file, remove_file.\n\nCreate when: complex task succeeded (5+ calls), errors overcome, user-corrected approach worked, non-trivial workflow discovered, or user asks you to remember a procedure.\nUpdate when: instructions stale/wrong, OS-specific failures, missing steps or pitfalls found during use. If you used a skill and hit issues not covered by it, patch it immediately.\n\nAfter difficult/iterative tasks, offer to save as a skill. Skip for simple one-offs. Confirm with user before creating/deleting.\n\nGood skills: trigger conditions, numbered steps with exact commands, pitfalls section, verification steps. Use skill_view() to see format examples.", "parameters": {"type": "object", "properties": {"action": {"type": "string", "enum": ["create", "patch", "edit", "delete", "write_file", "remove_file"], "description": "The action to perform."}, "name": {"type": "string", "description": "Skill name (lowercase, hyphens/underscores, max 64 chars). Must match an existing skill for patch/edit/delete/write_file/remove_file."}, "content": {"type": "string", "description": "Full SKILL.md content (YAML frontmatter + markdown body). Required for 'create' and 'edit'. For 'edit', read the skill first with skill_view() and provide the complete updated text."}, "old_string": {"type": "string", "description": "Text to find in the file (required for 'patch'). Must be unique unless replace_all=true. Include enough surrounding context to ensure uniqueness."}, "new_string": {"type": "string", "description": "Replacement text (required for 'patch'). Can be empty string to delete the matched text."}, "replace_all": {"type": "boolean", "description": "For 'patch': replace all occurrences instead of requiring a unique match (default: false)."}, "category": {"type": "string", "description": "Optional category/domain for organizing the skill (e.g., 'devops', 'data-science', 'mlops'). Creates a subdirectory grouping. Only used with 'create'."}, "file_path": {"type": "string", "description": "Path to a supporting file within the skill directory. For 'write_file'/'remove_file': required, must be under references/, templates/, scripts/, or assets/. For 'patch': optional, defaults to SKILL.md if omitted."}, "file_content": {"type": "string", "description": "Content for the file. Required for 'write_file'."}}, "required": ["action", "name"]}}}, {"type": "function", "function": {"name": "skill_view", "description": "Skills allow for loading information about specific tasks and workflows, as well as scripts and templates. Load a skill's full content or access its linked files (references, templates, scripts). First call returns SKILL.md content plus a 'linked_files' dict showing available references/templates/scripts. To access those, call again with file_path parameter.", "parameters": {"type": "object", "properties": {"name": {"type": "string", "description": "The skill name (use skills_list to see available skills). For plugin-provided skills, use the qualified form 'plugin:skill' (e.g. 'superpowers:writing-plans')."}, "file_path": {"type": "string", "description": "OPTIONAL: Path to a linked file within the skill (e.g., 'references/api.md', 'templates/config.yaml', 'scripts/validate.py'). Omit to get the main SKILL.md content."}}, "required": ["name"]}}}, {"type": "function", "function": {"name": "skills_list", "description": "List available skills (name + description). Use skill_view(name) to load full content.", "parameters": {"type": "object", "properties": {"category": {"type": "string", "description": "Optional category filter to narrow results"}}, "required": []}}}, {"type": "function", "function": {"name": "terminal", "description": "Execute shell commands on a Linux environment. Filesystem usually persists between calls.\n\nDo NOT use cat/head/tail to read files 

---

### 🤖 **Hermes Agent**

 use read_file instead.\nDo NOT use grep/rg/find to search 

---

### 👤 **User / Event**

 use search_files instead.\nDo NOT use ls to list directories 

---

### 🤖 **Hermes Agent**

 use search_files(target='files') instead.\nDo NOT use sed/awk to edit files 

---

### 👤 **User / Event**

 use patch instead.\nDo NOT use echo/cat heredoc to create files 

---

### 🤖 **Hermes Agent**

 use write_file instead.\nReserve terminal for: builds, installs, git, processes, scripts, network, package managers, and anything that needs a shell.\n\nForeground (default): Commands return INSTANTLY when done, even if the timeout is high. Set timeout=300 for long builds/scripts 

---

### 👤 **User / Event**

 you'll still get the result in seconds if it's fast. Prefer foreground for short commands.\nBackground: Set background=true to get a session_id. Two patterns:\n  (1) Long-lived processes that never exit (servers, watchers).\n  (2) Long-running tasks with notify_on_complete=true 

---

### 🤖 **Hermes Agent**

 you can keep working on other things and the system auto-notifies you when the task finishes. Great for test suites, builds, deployments, or anything that takes more than a minute.\nFor servers/watchers, do NOT use shell-level background wrappers (nohup/disown/setsid/trailing '&') in foreground mode. Use background=true so Hermes can track lifecycle and output.\nAfter starting a server, verify readiness with a health check or log signal, then run tests in a separate terminal() call. Avoid blind sleep loops.\nUse process(action=\"poll\") for progress checks, process(action=\"wait\") to block until done.\nWorking directory: Use 'workdir' for per-command cwd.\nPTY mode: Set pty=true for interactive CLI tools (Codex, Claude Code, Python REPL).\n\nDo NOT use vim/nano/interactive tools without pty=true 

---

### 👤 **User / Event**

 they hang without a pseudo-terminal. Pipe git output to cat if it might page.\n", "parameters": {"type": "object", "properties": {"command": {"type": "string", "description": "The command to execute on the VM"}, "background": {"type": "boolean", "description": "Run the command in the background. Two patterns: (1) Long-lived processes that never exit (servers, watchers). (2) Long-running tasks paired with notify_on_complete=true 

---

### 🤖 **Hermes Agent**

 you can keep working and get notified when the task finishes. For short commands, prefer foreground with a generous timeout instead.", "default": false}, "timeout": {"type": "integer", "description": "Max seconds to wait (default: 180, foreground max: 600). Returns INSTANTLY when command finishes 

---

### 👤 **User / Event**

 set high for long tasks, you won't wait unnecessarily. Foreground timeout above 600s is rejected; use background=true for longer commands.", "minimum": 1}, "workdir": {"type": "string", "description": "Working directory for this command (absolute path). Defaults to the session working directory."}, "pty": {"type": "boolean", "description": "Run in pseudo-terminal (PTY) mode for interactive CLI tools like Codex, Claude Code, or Python REPL. Only works with local and SSH backends. Default: false.", "default": false}, "notify_on_complete": {"type": "boolean", "description": "When true (and background=true), you'll be automatically notified when the process finishes 

---

### 🤖 **Hermes Agent**

 no polling needed. Use this for tasks that take a while (tests, builds, deployments) so you can keep working on other things in the meantime.", "default": false}, "watch_patterns": {"type": "array", "items": {"type": "string"}, "description": "Strings to watch for in background process output. Fires a notification the first time each pattern matches a line of output. **Use ONLY for mid-process signals** you want to react to before the process exits 

---

### 👤 **User / Event**

 errors, readiness markers, intermediate step markers (e.g. [\"ERROR\", \"Traceback\", \"listening on port\"]). Do NOT use for end-of-run markers (summary headers, 'DONE', 'PASS' printed right before exit) 

---

### 🤖 **Hermes Agent**

{"role": "user", "content": "你现在在干嘛呢

---

### 👤 **User / Event**

我们现在能生成视频吗

---

### 🤖 **Hermes Agent**

你看一下有没有好用的那种生成视频的技能

---

### 👤 **User / Event**

就通过代码或者通过HTML这些东西看怎么样去生成视频

---

### 🤖 **Hermes Agent**

因为我们主要讲的是学科类的东西

---

### 👤 **User / Event**

而且知识点什么的都可以用代码展示嘛

---

### 🤖 **Hermes Agent**

都可以用代码去形成文字

---

### 👤 **User / Event**

{"role": "assistant", "content": "李老师好

---

### 🤖 **Hermes Agent**

我是Hermes Agent

---

### 👤 **User / Event**

我现在正在等待您的指令

---

### 🤖 **Hermes Agent**

可以协助您处理各种任务

---

### 👤 **User / Event**

\n\n关于视频生成

---

### 🤖 **Hermes Agent**

直接生成代码/HTML来创建交互式可视化或动画视频

---

### 👤 **User / Event**

比传统视频生成更灵活

---

### 🤖 **Hermes Agent**

而且知识点展示更精准

---

### 👤 **User / Event**

\n\n让我先查看一下现有的视频生成相关技能

---

### 🤖 **Hermes Agent**

{"role": "tool", "content": "{\"success\": true, \"skills\": [{\"name\": \"architecture-diagram\", \"description\": \"Generate dark-themed SVG diagrams of software systems and cloud infrastructure as standalone HTML files with inline SVG graphics. Semantic component colors (cyan=frontend, emerald=backend, violet=database, amber=cloud/AWS, rose=security, orange=message bus), JetBrains Mono font, grid background. Best suited for software architecture, cloud/VPC topology, microservice maps, service-mesh diagrams, database + API layer diagrams, security groups, message buses 

---

### 👤 **User / Event**

 anything that fits a tech-infra deck with a dark aesthetic. If a more specialized diagramming skill exists for the subject (scientific, educational, hand-drawn, animated, etc.), prefer that 

---

### 🤖 **Hermes Agent**

 otherwise this skill can also serve as a general-purpose SVG diagram fallback. Based on Cocoon AI's architecture-diagram-generator (MIT).\", \"category\": \"creative\"}, {\"name\": \"ascii-art\", \"description\": \"Generate ASCII art using pyfiglet (571 fonts), cowsay, boxes, toilet, image-to-ascii, remote APIs (asciified, ascii.co.uk), and LLM fallback. No API keys required.\", \"category\": \"creative\"}, {\"name\": \"ascii-video\", \"description\": \"Production pipeline for ASCII art video 

---

### 👤 **User / Event**

 any format. Converts video/audio/images/generative input into colored ASCII character video output (MP4, GIF, image sequence). Covers: video-to-ASCII conversion, audio-reactive music visualizers, generative ASCII art animations, hybrid video+audio reactive, text/lyrics overlays, real-time terminal rendering. Use when users request: ASCII video, text art video, terminal-style video, character art animation, retro text visualization, audio visualizer in ASCII, converting video to ASCII art, matrix-style effects, or any animated ASCII output.\", \"category\": \"creative\"}, {\"name\": \"baoyu-infographic\", \"description\": \"Generate professional infographics with 21 layout types and 21 visual styles. Analyzes content, recommends layout

---

### 🤖 **Hermes Agent**

style combinations, and generates publication-ready infographics. Use when user asks to create \\\"infographic\\\", \\\"visual summary\\\", \\\"信息图\\\", \\\"可视化\\\", or \\\"高密度信息大图\\\".\", \"category\": \"creative\"}, {\"name\": \"excalidraw\", \"description\": \"Create hand-drawn style diagrams using Excalidraw JSON format. Generate .excalidraw files for architecture diagrams, flowcharts, sequence diagrams, concept maps, and more. Files can be opened at excalidraw.com or uploaded for shareable links.\", \"category\": \"creative\"}, {\"name\": \"ideation\", \"description\": \"Generate project ideas through creative constraints. Use when the user says 'I want to build something', 'give me a project idea', 'I'm bored', 'what should I make', 'inspire me', or any variant of 'I have tools but no direction'. Works for code, art, hardware, writing, tools, and anything that can be made.\", \"category\": \"creative\"}, {\"name\": \"manim-video\", \"description\": \"Production pipeline for mathematical and technical animations using Manim Community Edition. Creates 3Blue1Brown-style explainer videos, algorithm visualizations, equation derivations, architecture diagrams, and data stories. Use when users request: animated explanations, math animations, concept visualizations, algorithm walkthroughs, technical explainers, 3Blue1Brown style videos, or any programmatic animation with geometric/mathematical content.\", \"category\": \"creative\"}, {\"name\": \"p5js\", \"description\": \"Production pipeline for interactive and generative visual art using p5.js. Creates browser-based sketches, generative art, data visualizations, interactive experiences, 3D scenes, audio-reactive visuals, and motion graphics 

---

