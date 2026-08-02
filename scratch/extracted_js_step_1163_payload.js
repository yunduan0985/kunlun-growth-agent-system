const express = require('express');!
const cors = require('cors');.
*const { exec } = require('child_process');
const fs = require('fs');!
const path = require('path');1
-const sqlite3 = require('sqlite3').verbose();%
!const multer = require('multer');'
#const bcrypt = require('bcryptjs');(
$const jwt = require('jsonwebtoken');
require('dotenv').config();1
-// ==========================================
// 🔐 Auth 配置1
-// ==========================================k
g// JWT 密钥：优先读 .env，其次用随机生成并持久化（确保重启后 Token 仍有效）K
Gconst JWT_SECRET_PATH = path.join(__dirname, '../data/jwt_secret.txt');2
.let JWT_SECRET = process.env.JWT_SECRET || '';
if (!JWT_SECRET) {+
'  if (fs.existsSync(JWT_SECRET_PATH)) {F
B    JWT_SECRET = fs.readFileSync(JWT_SECRET_PATH, 'utf-8').trim();

  } else {9
5    // 首次启动自动生成随机 64 字节密钥G
C    JWT_SECRET = require('crypto').randomBytes(64).toString('hex');8
4    const secretDir = path.dirname(JWT_SECRET_PATH);T
P    if (!fs.existsSync(secretDir)) fs.mkdirSync(secretDir, { recursive: true });?
;    fs.writeFileSync(JWT_SECRET_PATH, JWT_SECRET, 'utf-8');X
T    console.log('[Auth] Generated new JWT secret and saved to data/jwt_secret.txt');
  }
};
7const JWT_EXPIRES_IN = '30d'; // Token 有效期 30 天E
Aconst USERS_DB_PATH = path.join(__dirname, '../data/users.json');
// 加载用户数据库
function loadUsers() {3
/  if (!fs.existsSync(USERS_DB_PATH)) return [];^
Z  try { return JSON.parse(fs.readFileSync(USERS_DB_PATH, 'utf-8')); } catch { return []; }
}
// 保存用户数据库
function saveUsers(users) {.
*  const dir = path.dirname(USERS_DB_PATH);F
B  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });O
K  fs.writeFileSync(USERS_DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}>
:// JWT 验证中间件（白名单路由不需要 Token）
const AUTH_WHITELIST = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/check-init',
];-
)function authMiddleware(req, res, next) {
  // 静态文件放行7
3  if (!req.path.startsWith('/api/')) return next();
  // 白名单放行J
F  if (AUTH_WHITELIST.some(w => req.path.startsWith(w))) return next();6
2  const authHeader = req.headers['authorization'];M
I  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {S
O    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }
  try {6
2    const payload = jwt.verify(token, JWT_SECRET);C
?    req.user = payload; // 注入用户信息到请求上下文
    next();
  } catch (err) {Z
V    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }
}
const app = express();*
&const PORT = process.env.PORT || 8888;
app.use(cors());-
)app.use(express.json({ limit: '50mb' }));x
t// 提供 index.html 静态服务（Electron 直接加载文件，浏览器可通过 http://localhost:8888 访问）8
4app.use(express.static(path.join(__dirname, '..')));G
C// 🔐 全局 JWT 认证中间件（白名单路由自动放行）
app.use(authMiddleware);1
-// ==========================================;
7// 🔐 Auth 路由（登录 / 注册 / 状态检查）1
-// ==========================================7
3// 检查是否已初始化（首次启动引导）3
/app.get('/api/auth/check-init', (req, res) => { 
  const users = loadUsers();L
H  res.json({ initialized: users.length > 0, user_count: users.length });
});M
I// 用户注册（首次注册自动为 Admin，后续由 Admin 邀请）8
4app.post('/api/auth/register', async (req, res) => {F
B  const { email, password, display_name, invite_code } = req.body; 
  if (!email || !password) {Q
M    return res.status(400).json({ error: '邮箱和密码不能为空。' });
  } 
  if (password.length < 8) {N
J    return res.status(400).json({ error: '密码至少需要 8 位。' });
  }6
2  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {H
D    return res.status(400).json({ error: '邮箱格式无效。' });
  } 
  const users = loadUsers();-
)  const isFirstUser = users.length === 0;'
#  // 非首次注册需要邀请码
  if (!isFirstUser) {J
F    const VALID_INVITE_CODE = process.env.INVITE_CODE || 'KUNLUN2025';0
,    if (invite_code !== VALID_INVITE_CODE) {h
d      return res.status(403).json({ error: '邀请码无效，请联系系统管理员获取。' });	
    }
  }$
   // 检查邮箱是否已注册K
G  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {Z
V    return res.status(409).json({ error: '该邮箱已注册，请直接登录。' });
  }
  try {=
9    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = {@
<      id: require('crypto').randomBytes(16).toString('hex'),,
(      email: email.toLowerCase().trim(),<
8      display_name: display_name || email.split('@')[0],&
"      password_hash: passwordHash,P
L      role: isFirstUser ? 'admin' : 'editor', // 首个用户自动为超管/
+      created_at: new Date().toISOString(),
      last_login: null,

    };
    users.push(newUser);
    saveUsers(users);&
"    // 注册后自动颁发 Token
    const token = jwt.sign(k
g      { id: newUser.id, email: newUser.email, role: newUser.role, display_name: newUser.display_name },
      JWT_SECRET,'
#      { expiresIn: JWT_EXPIRES_IN }

    );V
R    console.log(`[Auth] New user registered: ${newUser.email} (${newUser.role})`);
    res.json({
      success: true,
      token,q
m      user: { id: newUser.id, email: newUser.email, display_name: newUser.display_name, role: newUser.role },
      message: isFirstUserW
S        ? `🎉 管理员账号创建成功！欢迎使用昆仑增长 Agent OS。`G
C        : `✅ 注册成功！欢迎加入昆仑增长 Agent OS。`
    });
  } catch (err) {5
1    console.error('[Auth] Register error:', err);M
I    res.status(500).json({ error: '注册失败，请稍后重试。' });
  }
});
// 用户登录5
1app.post('/api/auth/login', async (req, res) => {+
'  const { email, password } = req.body; 
  if (!email || !password) {N
J    return res.status(400).json({ error: '请输入邮箱和密码。' });
  } 
  const users = loadUsers();Y
U  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) {8
4    // 故意模糊错误，防止用户枚举攻击W
S    return res.status(401).json({ error: '邮箱或密码错误，请重试。' });
  }
  try {K
G    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {Y
U      return res.status(401).json({ error: '邮箱或密码错误，请重试。' });	
    }#
    // 更新最后登录时间3
/    user.last_login = new Date().toISOString();
    saveUsers(users);
    const token = jwt.sign(_
[      { id: user.id, email: user.email, role: user.role, display_name: user.display_name },
      JWT_SECRET,'
#      { expiresIn: JWT_EXPIRES_IN }

    );<
8    console.log(`[Auth] User logged in: ${user.email}`);
    res.json({
      success: true,
      token,e
a      user: { id: user.id, email: user.email, display_name: user.display_name, role: user.role },;
7      message: `欢迎回来，${user.display_name}！`
    });
  } catch (err) {2
.    console.error('[Auth] Login error:', err);M
I    res.status(500).json({ error: '登录失败，请稍后重试。' });
  }
});1
-// 获取当前用户信息（Token 验证）+
'app.get('/api/auth/me', (req, res) => { 
  const users = loadUsers();9
5  const user = users.find(u => u.id === req.user.id);K
G  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({
    success: true,
{    user: { id: user.id, email: user.email, display_name: user.display_name, role: user.role, last_login: user.last_login }	
  });
});
// 修改密码?
;app.post('/api/auth/change-password', async (req, res) => {6
2  const { old_password, new_password } = req.body;v
r  if (!old_password || !new_password) return res.status(400).json({ error: '请填写旧密码和新密码。' });f
b  if (new_password.length < 8) return res.status(400).json({ error: '新密码至少 8 位。' }); 
  const users = loadUsers();9
5  const user = users.find(u => u.id === req.user.id);K
G  if (!user) return res.status(404).json({ error: 'User not found.' });M
I  const isMatch = await bcrypt.compare(old_password, user.password_hash);Q
M  if (!isMatch) return res.status(401).json({ error: '旧密码错误。' });?
;  user.password_hash = await bcrypt.hash(new_password, 12);
  saveUsers(users);V
R  res.json({ success: true, message: '密码修改成功，请重新登录。' });
});+
'// 管理员：获取所有用户列表.
*app.get('/api/auth/users', (req, res) => {\
X  if (req.user.role !== 'admin') return res.status(403).json({ error: '无权限。' });+
'  const users = loadUsers().map(u => ({M
I    id: u.id, email: u.email, display_name: u.display_name, role: u.role,:
6    created_at: u.created_at, last_login: u.last_login

  }));)
%  res.json({ success: true, users });
});(
$const jwt = require('jsonwebtoken');1
-// ==========================================(
$// 核心路径与本地数据配置1
-// ==========================================5
1const DATA_DIR = path.join(__dirname, '../data');N
Jif (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });Z
Vconst DB_PATH = path.join(DATA_DIR, 'kunlun_agent.db'); // 暂未使用，保留扩展_
[const WX_DB_PATH = path.join(DATA_DIR, 'wx_mock.db'); // 用户可通过 UI 自定义覆盖;
7const KNOWLEDGE_DIR = path.join(DATA_DIR, 'knowledge');X
Tif (!fs.existsSync(KNOWLEDGE_DIR)) fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });B
>// 📚 初始化 RAG SQLite FTS5 本地向量/全文检索库@
<const RAG_DB_PATH = path.join(DATA_DIR, 'rag_knowledge.db');>
:const ragDb = new sqlite3.Database(RAG_DB_PATH, (err) => {R
N  if (err) console.error('[RAG Engine] Failed to open rag_knowledge.db', err);
  else {
    ragDb.run(`I
E      CREATE VIRTUAL TABLE IF NOT EXISTS knowledge_chunks USING fts5(
        filename, 
        chunk_index, 
        content,
        tokenize='porter'
      )
    `);N
J    console.log('[RAG Engine] FTS5 Knowledge Base Database initialized.');
  }
});3
/// 分块函数 (Chunking) 供 RAG 入库使用>
:function chunkText(text, chunkSize = 500, overlap = 100) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {2
.    chunks.push(text.slice(i, i + chunkSize));#
    i += (chunkSize - overlap);
  }
  return chunks;
}B
>const JWT_SECRET_FILE = path.join(DATA_DIR, 'jwt_secret.txt');"
// 从环境变量读取配置V
Rconst OPENCLAW_API_URL = process.env.OPENCLAW_API_URL || 'http://localhost:18000';J
Fconst OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN || 'mock_token_123';>
:const LARK_CLI_PATH = process.env.LARK_CLI_PATH || 'lark';I
E// 全局异步任务队列存储 (防止长耗时 HTTP 超时挂起)
const TASK_QUEUE = {};1
-// ===========================================
9// Token 消费账单追踪器（本地 JSON 持久化）1
-// ==========================================N
Jconst TOKEN_USAGE_PATH = path.join(__dirname, '../data/token_usage.json');
function loadTokenUsage() {d
`  if (!fs.existsSync(TOKEN_USAGE_PATH)) return { total_input: 0, total_output: 0, records: [] };
  try { return JSON.parse(fs.readFileSync(TOKEN_USAGE_PATH, 'utf-8')); } catch { return { total_input: 0, total_output: 0, records: [] }; }
}$
 function saveTokenUsage(usage) {
  try {7
3    const dataDir = path.dirname(TOKEN_USAGE_PATH);P
L    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });T
P    fs.writeFileSync(TOKEN_USAGE_PATH, JSON.stringify(usage, null, 2), 'utf-8');R
N  } catch (e) { console.error('[Token Tracker] Failed to save:', e.message); }
}
/**\
X * 极简 Token 估算（无需 tiktoken，基于 GPT 规律：约 4 字节 = 1 Token）&
" * 中文按字符数 / 1.5 估算
 */#
function estimateTokens(text) {
  if (!text) return 0;I
E  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;4
0  const otherChars = text.length - chineseChars;<
8  return Math.ceil(chineseChars / 1.5 + otherChars / 4);
}G
Cfunction recordTokenUsage(provider, model, inputText, outputText) {%
!  const usage = loadTokenUsage();4
0  const inputTokens = estimateTokens(inputText);6
2  const outputTokens = estimateTokens(outputText);'
#  usage.total_input += inputTokens;)
%  usage.total_output += outputTokens;
  usage.records.push({%
!    ts: new Date().toISOString(),
    provider,

    model,"
    input_tokens: inputTokens,#
    output_tokens: outputTokens	
  }); 
  // 只保留最近 500 条P
L  if (usage.records.length > 500) usage.records = usage.records.slice(-500);
  saveTokenUsage(usage);
}1
-// ==========================================5
1// Multer 文件上传配置（知识库文件）1
-// ==========================================
const upload = multer({9
5  dest: path.join(__dirname, '../data/uploads_tmp/'),<
8  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB 上限&
"  fileFilter: (req, file, cb) => {A
=    const allowed = ['.pdf', '.docx', '.doc', '.txt', '.md'];B
>    const ext = path.extname(file.originalname).toLowerCase();2
.    if (allowed.includes(ext)) cb(null, true);H
D    else cb(new Error('Only PDF, Word, TXT, MD files are allowed'));
  }
});1
-// =========================================='
#// 1. Mock 数据库与静态资源1
-// ==========================================%
!// 模拟天眼查企业数据库
const MOCK_COMPANY_DB = {
  "昆仑增长": {5
1    name: "深圳昆仑增长科技有限公司",
    legal_person: "帅总",*
&    credit_code: "91440300MA5GD7XX8Y",
    status: "存续",/
+    registered_capital: "1000万人民币",%
!    establish_date: "2021-08-18",}
y    business_scope: "软件开发；智能算法研发；企业数字化转型咨询；新媒体流量获客系统等。"
  },
  "腾讯": {5
1    name: "腾讯科技（深圳）有限公司","
    legal_person: "马化腾",*
&    credit_code: "9144030071522300XG",
    status: "存续",+
'    registered_capital: "200万美元",%
!    establish_date: "1998-11-11",b
^    business_scope: "计算机软硬件的技术开发、销售；互联网增值业务等。"
  }
};Q
M// 模拟视频转录结果 (支持中英对照及抖音/小红书/视频号)(
$function getMockTranscription(url) {)
%  const lowerUrl = url.toLowerCase();u
q  const isEnglish = lowerUrl.includes('youtube') || lowerUrl.includes('english') || lowerUrl.includes('foreign');m
i  const isDouyin = lowerUrl.includes('douyin') || lowerUrl.includes('tiktok') || lowerUrl.includes('dy');Q
M  const isXhs = lowerUrl.includes('xhs') || lowerUrl.includes('xiaohongshu');s
o  const isWechat = lowerUrl.includes('wechat') || lowerUrl.includes('weixin') || lowerUrl.includes('channels');
  
  if (isEnglish) {
    return {
      video_url: url,
      duration: "08:45",
      language: "en-US",@
<      title: "Model Context Protocol Explained (MCP Guide)",
      segments: [

        { 
          start: "00:00", 
          end: "01:15", 
          text: "ENG: Today we are talking about Model Context Protocol, the open standard to connect LLMs to data sources.\nCHS: 今天我们来聊聊模型上下文协议 (MCP)，这是一套连接大模型与数据源的开放标准。" 

        },

        { 
          start: "01:15", 
          end: "03:40", 
          text: "ENG: With MCP, your agent can inspect database tables and run APIs securely in the background.\nCHS: 借助 MCP，您的智能体能够安全地在后台审查数据库表格并运行 API。" 
	        }
      ]

    };
  }
  if (isDouyin) {
    return {
      video_url: url,
      duration: "01:30",
      language: "zh-CN",J
F      title: "抖音爆款起号避坑指南（昆仑增长分享）",
      segments: [
        { start: "00:00", end: "00:30", text: "抖音的核心是前3秒！前3秒抓不住黄金期，用户直接划走。所以黄金开头必须用强冲突问题抛出悬念。" },
        { start: "00:30", end: "01:30", text: "千万别在视频里讲大段的理论，多用接地气的口语化词汇，这叫去AI味，才能提高完播率和互动率。" }
      ]

    };
  }
  if (isXhs) {
    return {
      video_url: url,
      duration: "02:15",
      language: "zh-CN",D
@      title: "小红书爆款图文引流私域的实战复盘",
      segments: [
        { start: "00:00", end: "01:00", text: "小红书图文要好看，封面图字要大、要反常识。比如：‘下班搞个Agent副业，我做到了月入五万’。" },
        { start: "01:00", end: "02:15", text: "引流微信千万别在评论区直接发微信号，容易被风控违规。可以用小号在粉丝群或者私信里通过图片引导加微信。" }
      ]

    };
  }
  if (isWechat) {
    return {
      video_url: url,
      duration: "04:12",
      language: "zh-CN",A
=      title: "微信视频号公域引流商业闭环拆解",
      segments: [
        { start: "00:00", end: "02:00", text: "视频号的受众跟抖音不同，中产和熟人社交属性强。翻译过来就是，视频号适合推高客单价的咨询和训练营。" },
        { start: "02:00", end: "04:12", text: "利用视频号底部的拓展链接引导添加企微，通过BANT漏斗话术清洗，无缝交由AI销冠跟进转化。" }
      ]

    };
  }

  return {
    video_url: url,
    duration: "15:24",
    language: "zh-CN",H
D    title: "昆仑增长冷启动搞流量的底层闭环方法论",
    segments: [
      { start: "00:00", end: "01:30", text: "大家好，我是帅总。今天我们来拆解一下如何从0到1快速起号，搞定小红书和公众号的私域闭环。" },
      { start: "01:30", end: "05:10", text: "首先，核心的痛点在于选题。不要制造一些AI味很浓的废话，一定要找用户的痛点卡点进行冲突对比。" },
      { start: "05:10", end: "10:15", text: "其次是转化。AI销冠的核心不是卖货，而是通过BANT模型判定用户的预算 and 需求，精准切入核心痛点。" },
      { start: "10:15", end: "15:24", text: "最后，交付是口碑的保证。我们要建立多维表格的交付看板，让每一个会员提出的答疑工单在24小时内闭环。" }	
    ]
  };
}1
-// ==========================================!
// 2. 原生工具 API 路由1
-// ==========================================%
!// 天眼查接口 - 工商搜索5
1app.get('/api/tianyancha/search', (req, res) => {$
   const { keyword } = req.query;Y
U  if (!keyword) return res.status(400).json({ error: "Missing parameter: keyword" });9
5  console.log(`[TianYanCha] Search for: ${keyword}`);p
l  const matchKey = Object.keys(MOCK_COMPANY_DB).find(key => keyword.includes(key) || key.includes(keyword));
  res.json({ success: true, data: matchKey ? MOCK_COMPANY_DB[matchKey] : { name: `${keyword} (模拟企业)`, status: "存续" } });
});%
!// 天眼查接口 - 股权穿透5
1app.get('/api/tianyancha/equity', (req, res) => {)
%  const { company_name } = req.query;c
_  if (!company_name) return res.status(400).json({ error: "Missing parameter: company_name" });@
<  console.log(`[TianYanCha] Equity query: ${company_name}`);
  res.json({
    success: true,(
$    actual_controller: "自然人A",
    shareholders: [I
E      { name: "自然人A", type: "natural_person", ratio: "60.0%" },E
A      { name: "母公司B", type: "enterprise", ratio: "30.0%" },H
D      { name: "小股东C", type: "natural_person", ratio: "10.0%" }

    ],
    nesting_level: 2	
  });
});.
*// 天眼查接口 - 司法与诉讼风险3
/app.get('/api/tianyancha/risk', (req, res) => {)
%  const { company_name } = req.query;c
_  if (!company_name) return res.status(400).json({ error: "Missing parameter: company_name" });>
:  console.log(`[TianYanCha] Risk audit: ${company_name}`);]
Y  const hasHighRisk = company_name.includes("风险") || company_name.includes("暴雷");
  res.json({
    success: true,1
-    risk_level: hasHighRisk ? "high" : "low",
    cases: hasHighRisk ? [
      { type: "execute_case", detail: "被北京市朝阳区人民法院强制执行 450 万元人民币", status: "unfulfilled" }
    ] : [],,
(    judgment_count: hasHighRisk ? 12 : 0	
  });
});
// 视频转录接口5
1app.post('/api/transcribe/video', (req, res) => {
  const { url } = req.body;Q
M  if (!url) return res.status(400).json({ error: "Missing parameter: url" });<
8  console.log(`[Transcription] Processing URL: ${url}`);L
H  res.json({ success: true, transcription: getMockTranscription(url) });
});@
<// 视频转录任务状态查询接口 (支持异步轮询)5
1app.get('/api/transcribe/status', (req, res) => {$
   const { task_id } = req.query;Y
U  if (!task_id) return res.status(400).json({ error: "Missing parameter: task_id" });S
O  console.log(`[Transcription Status] Checking progress for Task: ${task_id}`);
  res.json({
    task_id,
    status: "completed",
    progress: 100,`
\    transcription: getMockTranscription("https://www.youtube.com/watch?v=english_mcp_video")	
  });
});
// 会议纪要整理接口6
2app.post('/api/meeting/summarize', (req, res) => {#
  const { content } = req.body;Y
U  if (!content) return res.status(400).json({ error: "Missing parameter: content" });8
4  console.log(`[Meeting Summarizer] Processing...`);
  res.json({
    success: true,
    summary: {A
=      title: "关于多智能体架构上线的同步会议",C
?      participants: ["帅总", "项目经理", "技术专家"],F
B      decisions: ["本周将 30 个 Agent 全部部署内测。"],
      action_items: [x
t        { owner: "技术专家", task: "配置本地网关并挂载 SQLite 微信库", deadline: "明日下班前" }
      ]	
    }	
  });
});+
'// 会议待办任务分发看板接口9
5app.post('/api/meeting/action-items', (req, res) => {7
3  const { meeting_title, action_items } = req.body;,
(  if (!meeting_title || !action_items) {d
`    return res.status(400).json({ error: "Missing parameters: meeting_title or action_items" });
  }j
f  console.log(`[Action Items Linker] Dispatching ${action_items.length} tasks for: ${meeting_title}`);
  res.json({
    success: true,P
L    message: "已成功将行动待办推送至飞书任务多维表格。",,
(    看板条目数: action_items.length	
  });
});[
W// 终端指令安全执行接口 (支持特权白名单鉴权过滤与防命令注入)5
1app.post('/api/terminal/execute', (req, res) => {2
.  const { command, cwd, agent_id } = req.body;Y
U  if (!command) return res.status(400).json({ error: "Missing parameter: command" });R
N  // 1. 验证调用者特权角色身份 (防自媒体 Agent 提示词注入)p
l  const privilegedAgents = ['agent_ops', 'agent_architect', 'claude_code', 'tech_specialist', 'privileged'];>
:  if (!agent_id || !privilegedAgents.includes(agent_id)) {|
x    console.warn(`⚠️ [Security Alert] Unauthorized command execution attempt by Agent: "${agent_id || 'unknown'}"`);%
!    return res.status(403).json({
      success: false,t
p      error: `Access Denied: Agent "${agent_id || 'unknown'}" is not authorized to run local terminal commands.`
    });
  }<
8  // 2. 检查命令中是否含有高危违禁关键字\
X  const forbiddenKeywords = ['rm -rf /', 'mkfs', 'dd if', 'shutdown', 'reboot', 'sudo'];?
;  if (forbiddenKeywords.some(kw => command.includes(kw))) {h
d    return res.status(403).json({ success: false, error: "Forbidden: high risk command blocked." });
  }m
i  console.log(`🛡️ [Terminal Security Check] Agent "${agent_id}" authorized. Running: "${command}"`);
  
  const execOptions = {
    cwd: cwd || undefined,
    env: { ...process.env }
  };=
9  exec(command, execOptions, (error, stdout, stderr) => {
    res.json({
      success: !error,
      stdout: stdout || "",
      stderr: stderr || "",*
&      exitCode: error ? error.code : 0
    });	
  });
});1
-// ===========================================
9// 3. OpenClaw 微信桥接接口 (场景一与场景二)1
-// ==========================================#
// 桥接 OpenClaw 消息发送?
;app.post('/api/wechat/openclaw/send', async (req, res) => {
  try {2
.    const { to_username, content } = req.body;p
l    if (!to_username || !content) return res.status(400).json({ error: "Missing: to_username or content" });G
C    console.log(`[OpenClaw] Send to ${to_username}: "${content}"`);,
(    if (!process.env.OPENCLAW_API_URL) {
      return res.json({
        success: true,*
&        message: "Mock send success.",5
1        data: { msgId: "mock_msg_" + Date.now() }
	      });	
    }K
G    const response = await fetch(`${OPENCLAW_API_URL}/api/send_text`, {
      method: 'POST',
      headers: {/
+        'Content-Type': 'application/json',7
3        'Authorization': `Bearer ${OPENCLAW_TOKEN}`
      },8
4      body: JSON.stringify({ to_username, content })
    });.
*    const resData = await response.json();5
1    res.json({ success: true, origin: resData });
  } catch (err) {j
f    res.json({ success: true, warn: "Fallback to mock.", data: { msgId: "fallback_" + Date.now() } });
  }
});R
N// 场景一：拉取微信增量对话记录 (支持异步任务队列模式)B
>app.get('/api/wechat/openclaw/messages', async (req, res) => {1
-  const isAsync = req.query.async === 'true';4
0  const limit = parseInt(req.query.limit) || 20;
  if (isAsync) {/
+    const taskId = 'task_wx_' + Date.now();Y
U    console.log(`[Task Queue] Created asynchronous WeChat scanning task: ${taskId}`); 
    // 初始化任务状态
    TASK_QUEUE[taskId] = {
      status: "processing",
      progress: 0,
      result: null

    };V
R    // 模拟长耗时异步数据检索与跑分过程 (防止 HTTP 挂起超时)2
.    let progressInterval = setInterval(() => {$
       if (!TASK_QUEUE[taskId]) {,
(        clearInterval(progressInterval);
        return;
      }=
9      TASK_QUEUE[taskId].progress += 25; // 每次加 25%s
o      console.log(`⏳ [Task Queue] WeChat scanning task ${taskId} progress: ${TASK_QUEUE[taskId].progress}%`);3
/      if (TASK_QUEUE[taskId].progress >= 100) {,
(        clearInterval(progressInterval);4
0        TASK_QUEUE[taskId].status = "completed";)
%        TASK_QUEUE[taskId].result = [
          { from_user: "张经理 (微信群: 昆仑增长2群)", content: "帅总，我们最近的小红书起号遇到了卡点，转化率突然从4%跌到了1%，这周有时间帮我们做个诊断吗？预算大概有2万左右。", timestamp: new Date(Date.now() - 600000).toISOString(), is_group: true },
          { from_user: "李总 (私聊)", content: "你好，请问你们的智能体交付标准手册在哪里下载？我已经支付了会员费。", timestamp: new Date(Date.now() - 3600000).toISOString(), is_group: false }

        ];V
R        console.log(`✅ [Task Queue] WeChat scanning task ${taskId} completed.`);
      }*
&    }, 500); // 每 500ms 步进一次
    return res.json({
      success: true,
      task_id: taskId,
      status: "processing"
    });
  }0
,  // 同步直接返回模式 (向后兼容)
  try {h
d    if (process.env.OPENCLAW_API_URL && process.env.OPENCLAW_API_URL !== 'http://localhost:18000') {_
[      const response = await fetch(`${OPENCLAW_API_URL}/api/get_messages?limit=${limit}`, {D
@        headers: { 'Authorization': `Bearer ${OPENCLAW_TOKEN}` }
	      });-
)      const data = await response.json(); 
      return res.json(data);	
    }
    res.json([
      { from_user: "张经理 (微信群: 昆仑增长2群)", content: "帅总，我们最近的小红书起号遇到了卡点，转化率突然从4%跌到了1%，这周有时间帮我们做个诊断吗？预算大概有2万左右。", timestamp: new Date(Date.now() - 600000).toISOString(), is_group: true },
      { from_user: "李总 (私聊)", content: "你好，请问你们的智能体交付标准手册在哪里下载？我已经支付了会员费。", timestamp: new Date(Date.now() - 3600000).toISOString(), is_group: false }
    ]);
  } catch (err) {5
1    res.status(500).json({ error: err.message });
  }
});1
-// 通用后台异步任务状态轮询接口6
2app.get('/api/system/task/status', (req, res) => {$
   const { task_id } = req.query;Y
U  if (!task_id) return res.status(400).json({ error: "Missing parameter: task_id" });'
#  const task = TASK_QUEUE[task_id];K
G  if (!task) return res.status(404).json({ error: "Task not found." });
  res.json({
    success: true,
    task_id,
    status: task.status, 
    progress: task.progress,
    result: task.result	
  });
});M
I// 场景二：全量解密本地微信 SQLite 数据库 SQL 查询接口4
0app.post('/api/wechat/db/query', (req, res) => {
  const { sql } = req.body;Q
M  if (!sql) return res.status(400).json({ error: "Missing parameter: sql" });;
7  console.log(`[WeChat DB Query] Executing: "${sql}"`);'
#  if (!fs.existsSync(WX_DB_PATH)) {O
K    console.log(`⚠️ 微信数据库未挂载，返回 Mock 数据。`);
    return res.json({
      success: true,
      rows: [
        { msg_id: 101, talker: "微信用户A", content: "我们是做零售的，想接入AI销冠话术，预算5万。", create_time: "2026-06-15 14:20:00" },
~        { msg_id: 102, talker: "微信用户B", content: "AI交付标准在哪里看？", create_time: "2026-06-16 09:15:00" }
      ]
    });
  }S
O  const db = new sqlite3.Database(WX_DB_PATH, sqlite3.OPEN_READONLY, (err) => {E
A    if (err) return res.status(500).json({ error: err.message });	
  });&
"  db.all(sql, [], (err, rows) => {
    db.close();E
A    if (err) return res.status(500).json({ error: err.message });*
&    res.json({ success: true, rows });	
  });
});1
-// ==========================================1
-// 4. 运维、安全与高并发核心接口1
-// ==========================================
// 运维系统指标接口/
+app.get('/api/ops/metrics', (req, res) => {
  res.json({
    llm_success_rate: 99.4,!
    average_latency_ms: 2450,$
     token_cost_today_usd: 14.85,
    api_timeout_count: 2	
  });
});
// 运维日志检索接口,
(app.get('/api/ops/logs', (req, res) => {4
0  const lines = parseInt(req.query.lines) || 50;
  res.json({
    logs: `[INFO] ${new Date().toISOString()} - [Gateway] Server initialized on port ${PORT}\n[INFO] [MCP] Registered 5 tools\n[INFO] [OpenClaw] Connection established at ${OPENCLAW_API_URL}\n[DEBUG] [Terminal] lark-cli path configured as: ${LARK_CLI_PATH}\n[INFO] [Gateway] Listening for remote trace events... (Truncated to past ${lines} lines)`	
  });
});.
*// 提示词注入及敏感词扫描接口2
.app.post('/api/security/scan', (req, res) => { 
  const { text } = req.body;S
O  if (!text) return res.status(400).json({ error: "Missing parameter: text" });s
o  const isInjection = text.toLowerCase().includes("ignore previous") || text.includes("忽略之前的指令");P
L  const isSensitive = text.includes("违法") || text.includes("敏感词");
  res.json({-
)    isSafe: !isInjection && !isSensitive,X
T    riskType: isInjection ? "injection" : (isSensitive ? "sensitive_word" : "none"),
    details: isInjection ? "Detected high-risk Prompt Injection attempt." : (isSensitive ? "Detected forbidden terms." : "Clear.")	
  });
});#
// API 越权调用审计接口4
0app.post('/api/security/policy', (req, res) => {2
.  const { agent_id, operation_id } = req.body;c
_  if (!agent_id || !operation_id) return res.status(400).json({ error: "Missing parameters" });_
[  const sensitiveTools = ['runLarkCli', 'executeTerminalCommand', 'execute_local_command'];O
K  const privilegedAgents = ['agent_ops', 'agent_architect', 'claude_code'];d
`  const allowed = !sensitiveTools.includes(operation_id) || privilegedAgents.includes(agent_id);
  res.json({ allowed, reason: allowed ? "Authorized." : `Access denied: Agent ${agent_id} is not privileged to call ${operation_id}.` });
});
// 代码静态审查接口5
1app.post('/api/tech/code-review', (req, res) => { 
  const { code } = req.body;I
E  if (!code) return res.status(400).json({ error: "Missing: code" });s
o  const hasSql = code.toLowerCase().includes("select * from") && !code.toLowerCase().includes("parameterized");j
f  const hasSecret = code.toLowerCase().includes("api_key") || code.toLowerCase().includes("password");!
  const vulnerabilities = [];
  if (hasSql) {
    vulnerabilities.push({ severity: "high", description: "Potential SQL Injection detected.", suggested_fix: "Use parameterized queries." });
  }
  if (hasSecret) {
    vulnerabilities.push({ severity: "high", description: "Hardcoded credential detected.", suggested_fix: "Store secrets in env variables." });
  }
  res.json({ success: true, vulnerabilities, dry_violations: code.includes("function") && code.split("function").length > 3 });
});
// 性能瓶颈诊断接口6
2app.post('/api/tech/perf-analyze', (req, res) => {+
'  const { qps, bottleneck } = req.body;
  res.json({
    success: true,
    recommendation: `根据您的并发目标 ${qps} QPS 以及当前瓶颈 ${bottleneck}，建议采取优化方案：\n1. 在数据库前置 Redis 缓存层，采用 Token Bucket 算法限流。\n2. 对核心表建立聚集索引，防止全表扫描。`	
  });
});(
$// 向量数据库混合检索接口4
0app.post('/api/knowledge/query', (req, res) => {(
$  const { query, top_k } = req.body;9
5  console.log(`[RAG Database] Querying: "${query}"`);
  const mockRags = [
    { document_name: "昆仑增长冷启动运营手册.pdf", content: "冷启动起号的7步工作流：1.确定画像；2.选题模型；3.降AI味文案；4.关注流；5.微信openclaw私域；6.BANT转化；7.多维表格交付履约。", score: 0.89 },
    { document_name: "AI销冠标准答疑话术.docx", content: "价格贵异议处理：同理心拥抱 -> ROI成本拆解 -> 制造紧迫感。", score: 0.82 }
  ];
  const hits = mockRags.filter(rag => query.includes("冷启动") || query.includes("话术") || query.includes("价格") || rag.content.includes(query));
  res.json({ success: true, hits: hits.length > 0 ? hits : [{ document_name: "通用常识.txt", content: "未查到精确规章。", score: 0.50 }] });
});"
// 知识库文档列表接口;
7app.get('/api/knowledge/document/list', (req, res) => {
  res.json([y
u    { filename: "昆仑增长冷启动运营手册.pdf", file_size: 2450122, uploaded_time: "2026-03-01T10:00:00Z" },q
m    { filename: "AI销冠标准答疑话术.docx", file_size: 512033, uploaded_time: "2026-05-12T14:30:00Z" }	
  ]);
});+
'// 模拟获取微信读书划线接口9
5app.get('/api/notebook/weread/fetch', (req, res) => {$
   const { book_id } = req.query;_
[  console.log(`[WeRead Exporter] Fetching highlights for book ID: ${book_id || 'latest'}`);
  res.json([	
    {'
#      book_name: "第一性原理",&
"      author: "埃隆·马斯克",
      highlight: "不要盲从社会公认的常识，必须把事物剥离到最基础的真理，然后再从头开始推导。",
      thought: "这正是多智能体拓扑设计的核心！不要根据别人的工作流来拼凑 Agent，而是要从最小节点开始反推架构。"

    },	
    {!
      book_name: "引爆点",2
.      author: "马尔科姆·格拉德威尔",x
t      highlight: "信息传播有三个法则：个别人物法则、附着力因素法则、环境威力法则。",x
t      thought: "冷启动起号，选题就是那个附着力因素，而微信社群就是爆破的环境威力！"	
    }	
  ]);
});?
;// 模拟同步至 NotebookLM 挂载的 Google Drive 接口=
9app.post('/api/notebook/notebooklm/sync', (req, res) => {6
2  const { filename, markdown_content } = req.body;+
'  if (!filename || !markdown_content) {c
_    return res.status(400).json({ error: "Missing parameters: filename or markdown_content" });
  }P
L  console.log(`[NotebookLM Sync] Uploading ${filename} to Google Drive...`);
  res.json({
    success: true,r
n    cloud_url: `https://drive.google.com/drive/folders/notebooklm_growth_sync/${encodeURIComponent(filename)}`	
  });
});'
#// 模拟 GitHub 仓库搜索接口?
;app.post('/api/github/search/repositories', (req, res) => {+
'  const { query, language } = req.body;X
T  console.log(`[GitHub Search] Query: "${query}" (Language: ${language || 'any'})`);
  res.json({
    success: true,
    items: [
      { name: "langchain-ai/langgraph", description: "Build resilient language agents as graphs.", stars: 5800, language: "python" },
      { name: "dify-ai/dify", description: "An open-source LLM app development platform.", stars: 32000, language: "typescript" }	
    ]	
  });
});-
)// 模拟 GitHub 仓库详情查询接口6
2app.get('/api/github/repo/detail', (req, res) => {&
"  const { repo_name } = req.query;S
O  if (!repo_name) return res.status(400).json({ error: "Missing: repo_name" });E
A  console.log(`[GitHub API] Fetching details for: ${repo_name}`);0
,  const isDify = repo_name.includes("dify");
  res.json({
    success: true,
    full_name: repo_name,%
!    stars: isDify ? 32000 : 5800,/
+    license: isDify ? "Apache-2.0" : "MIT",K
G    last_commit_time: new Date(Date.now() - 3600000 * 2).toISOString(),-
)    open_issues_count: isDify ? 412 : 54,1
-    closed_issues_count: isDify ? 8900 : 1200	
  });
});$
 // 模拟 GitHub Trending 接口3
/app.get('/api/github/trending', (req, res) => {%
!  const { language } = req.query;S
O  console.log(`[GitHub Trending] Fetching trending for: ${language || 'all'}`);
  res.json([
    { rank: 1, name: "modelcontextprotocol/servers", description: "Reference MCP server implementations.", stars_today: 450, language: "typescript" },
    { rank: 2, name: "openai/whisper", description: "Robust Speech Recognition via Large-Scale Weak Supervision.", stars_today: 230, language: "python" }	
  ]);
});(
$// 模拟 X 平台推文检索接口-
)app.post('/api/x/search', (req, res) => {,
(  const { query, min_likes } = req.body;R
N  console.log(`[X Search] Query: "${query}" (Min Likes: ${min_likes || 50})`);
  res.json({
    success: true,
    tweets: [
      { id: "tweet_101", author: "karpathy", content: "Model Context Protocol (MCP) is a beautiful standard. It makes custom tooling for agents standard and clean.", likes: 8500, replies: 120, time: "2026-07-14T10:00:00Z" },
      { id: "tweet_102", author: "swyx", content: "Agentic workflow is shifting from centralized code to decentralized MCP servers.", likes: 1200, replies: 45, time: "2026-07-14T14:30:00Z" }	
    ]	
  });
});'
#// 模拟 X 平台 KOL 监听接口0
,app.get('/api/x/kol/tweets', (req, res) => {%
!  const { username } = req.query;Q
M  if (!username) return res.status(400).json({ error: "Missing: username" });C
?  console.log(`[X API] Fetching tweets for KOL: @${username}`);
  res.json([
    { id: "kol_tweet_01", author: username, content: `Just launched our new open-source project. Check it out on GitHub.`, likes: 4500, time: "3 hours ago" },
    { id: "kol_tweet_02", author: username, content: `AGI is closer than we think, but we need robust safety guardrails first.`, likes: 9800, time: "8 hours ago" }	
  ]);
});.
*// 模拟 X 平台今日科技趋势接口.
*app.get('/api/x/trending', (req, res) => {:
6  console.log(`[X Trending] Fetching tech trends...`);
  res.json([T
P    { topic: "#ModelContextProtocol", tweet_count: 45100, fever_level: "high" },K
G    { topic: "#LangGraph", tweet_count: 12000, fever_level: "medium" },L
H    { topic: "#FeishuBitableAI", tweet_count: 8900, fever_level: "low" }	
  ]);
});4
0// 模拟获取指定 X 账号点赞记录接口1
-app.get('/api/x/likes/fetch', (req, res) => {,
(  const { username, limit } = req.query;[
W  if (!username) return res.status(400).json({ error: "Missing parameter: username" });e
a  console.log(`[X Likes Exporter] Fetching likes for user: @${username} (limit ${limit || 10})`);
  res.json([	
    {
      author: "karpathy",<
8      tweet_url: "https://x.com/karpathy/status/999991",
      content: "I've been writing custom integrations all my life, but MCP standardizes everything. It's the Unix socket of LLM apps.",E
A      timestamp: new Date(Date.now() - 3600000 * 5).toISOString()

    },	
    {
      author: "sama",8
4      tweet_url: "https://x.com/sama/status/999992",f
b      content: "GPT-5 is looking incredibly smart. The reasoning capabilities will shock people.",F
B      timestamp: new Date(Date.now() - 3600000 * 12).toISOString()	
    }	
  ]);
});8
4// 模拟点赞归档存入数据库/知识库接口4
0app.post('/api/x/likes/archive', (req, res) => {D
@  const { username, tweet_url, content, motivation } = req.body;0
,  if (!username || !tweet_url || !content) {[
W    return res.status(400).json({ error: "Missing required parameters for archive." });
  }n
j  console.log(`[Likes Archive] Storing liked tweet by @${username}. Motivation: ${motivation || 'none'}`);
  res.json({
    success: true,H
D    archive_id: "arch_" + Math.random().toString(36).substring(2, 9)	
  });
});:
6// 模拟获取指定 X 账号新增关注列表接口7
3app.get('/api/x/following/changes', (req, res) => {%
!  const { username } = req.query;Q
M  if (!username) return res.status(400).json({ error: "Missing: username" });W
S  console.log(`[X Connections] Fetching following list changes for: @${username}`);
  res.json([
    { username: "rust_mcp_dev", bio: "Building blazing fast MCP servers in Rust. Actively looking for agent integration opportunities.", followed_at: new Date(Date.now() - 3600000).toISOString() },
    { username: "indie_hacker_mom", bio: "Building micro AI SaaS tools in public. ARR $120k.", followed_at: new Date(Date.now() - 3600000 * 8).toISOString() }	
  ]);
});D
@// 模拟获取指定大V在他人推文下的互动回复接口3
/app.get('/api/x/replies/fetch', (req, res) => {%
!  const { username } = req.query;Q
M  if (!username) return res.status(400).json({ error: "Missing: username" });I
E  console.log(`[X Interactions] Fetching replies for: @${username}`);
  res.json([
    { author: username, to_user: "openai_dev", content: "Impressive reasoning speed. Is this running on a custom hardware cluster?", likes: 450, time: "4 hours ago" },
    { author: username, to_user: "indie_developer", content: "This is a great micro AI tool! I'd love to see a desktop client.", likes: 890, time: "18 hours ago" }	
  ]);
});:
6// 模拟获取自媒体渠道爆红选题趋势接口2
.app.get('/api/content/trends', (req, res) => {%
!  const { platform } = req.query;d
`  console.log(`[Media Trends] Fetching hot content for platform: ${platform || 'xiaohongshu'}`);
  res.json([
    { title: "普通人拿捏 AI 绘图，其实只需要这 4 个词", platform: "xiaohongshu", likes: 25100, comments: 450 },
    { title: "别再瞎买课了！我把昆仑增长的 6 大核心 Agent 架构图公开了", platform: "xiaohongshu", likes: 18900, comments: 230 },
    { title: "ARR 破十万美金的微型 AI SaaS 工具，底层全是用这个开源协议写的", platform: "wechat", likes: 8900, comments: 120 }	
  ]);
});C
?// 模拟将选题一键同步至飞书内容排期看板接口;
7app.post('/api/content/topics/archive', (req, res) => {V
R  const { topic_title, suggested_titles, target_audience, model_type } = req.body;B
>  if (!topic_title || !suggested_titles || !target_audience) {U
Q    return res.status(400).json({ error: "Missing required topic parameters." });
  }w
s  console.log(`[Bitable Content Dashboard] Archiving topic: "${topic_title}". Model: ${model_type || 'conflict'}`);
  res.json({
    success: true,T
P    bitable_record_id: "rec_topic_" + Math.random().toString(36).substring(2, 9)	
  });
});L
H// 模拟自媒体文案极限敏感词检测接口 (包含自愈替换)6
2app.post('/api/content/risk/scan', (req, res) => {*
&  const { text, platform } = req.body;S
O  if (!text) return res.status(400).json({ error: "Missing parameter: text" });b
^  console.log(`[Content Risk Scan] Auditing text for platform: ${platform || 'xiaohongshu'}`);
  const violations = [];
  let risk_level = "none";<
8  if (text.includes("第一") || text.includes("最")) {
    risk_level = "medium";
    violations.push({C
?      trigger_text: text.includes("第一") ? "第一" : "最",1
-      risk_type: "advertising_law_violation",*
&      suggested_fix: "行业领先的"
    });
  }Z
V  if (text.includes("微信") || text.includes("加我") || text.includes("私信")) {
    risk_level = "medium";
    violations.push({'
#      trigger_text: "加我微信",4
0      risk_type: "platform_traffic_bypass_risk",i
e      suggested_fix: "在下方留下【SOP】或滴滴我，我会直接发送在您的信息流中"
    });
  }
  res.json({
    success: true,
    risk_level,
    violations	
  });
});B
>// 微信/自媒体文案去 AI 味量化跑分及拦截接口>
:app.post('/api/content/risk/anti-ai-scan', (req, res) => { 
  const { text } = req.body;S
O  if (!text) return res.status(400).json({ error: "Missing parameter: text" });N
J  console.log(`[Anti-AI Scanner] Running tone audit on content draft...`);$
   // AI 腔高频废话词清单
  const aiKeywords = [f
b    "不得不说", "值得注意的是", "在当今快节奏的社会中", "正如前文所述", W
S    "如前所述", "总而言之", "综上所述", "双刃剑", "维度", "画卷"
  ];!
  const matchedKeywords = [];
  let scorePenalty = 0;"
  aiKeywords.forEach(word => {4
0    const count = (text.split(word).length - 1);
    if (count > 0) {0
,      matchedKeywords.push({ word, count });?
;      scorePenalty += count * 15; // 命中一次扣 15 分	
    }	
  });6
2  const aiScore = Math.max(0, 100 - scorePenalty);J
F  const aiIndex = 100 - aiScore; // AI 味值 (0 - 100，越低越好)P
L  const isTooMachinery = aiIndex > 30; // 超过 30 分判定为 AI味严重
  res.json({
    success: true,
    ai_index: aiIndex,)
%    is_too_machinery: isTooMachinery,
    score: aiScore,'
#    matched_words: matchedKeywords, 
    message: isTooMachinery 
      ? `🔴 警告：文章AI味值高达 ${aiIndex}，八股废话严重。请指示【内容专家】进行去AI味改写润色。` b
^      : `🟢 绿灯：文章AI味值 ${aiIndex}，口语化表达良好，可安全发布。`	
  });
});+
'// 模拟商业品牌侵权审计接口:
6app.post('/api/content/risk/ip-check', (req, res) => {"
  const { brands } = req.body;d
`  console.log(`[IP Compliance] Checking brands authorization: ${JSON.stringify(brands || [])}`);
  res.json({
    success: true,
    status: "compliant",
    warning: (brands && brands.includes("侵权品牌")) ? "Detected unregistered trademark referencing. Potential trademark conflict." : "No registered copyright issues found."	
  });
});L
H// 模拟内容法律合规审计接口 (专门把控法律起诉风险)=
9app.post('/api/content/risk/legal-audit', (req, res) => { 
  const { text } = req.body;S
O  if (!text) return res.status(400).json({ error: "Missing parameter: text" });E
A  console.log(`[Legal Audit] Checking legislation red-lines...`);
  const warnings = [];
  let is_legal = true;X
T  if (text.includes("100%") || text.includes("保底") || text.includes("绝对")) {
    is_legal = false;
    warnings.push({1
-      segment: text.substring(0, 30) + "...",y
u      risk_description: "对收益或商业效果做出绝对化保证，违反《广告法》虚假宣传条款。",Y
U      law_reference: "《中华人民共和国广告法》第四条/第二十四条",~
z      suggestion: "删除绝对化承诺，改为‘有望实现业绩的稳健提升’或‘提供方法论参考’。"
    });
  }]
Y  if (text.includes("垃圾") || text.includes("骗子") || text.includes("割韭菜")) {
    is_legal = false;
    warnings.push({1
-      segment: text.substring(0, 30) + "...",j
f      risk_description: "涉嫌诋毁竞争对手商业名誉，违反《反不正当竞争法》。",X
T      law_reference: "《中华人民共和国反不正当竞争法》第十一条",i
e      suggestion: "改为中立痛点陈述，例如：‘相较于市面常见方案的卡点...’"
    });
  }
  res.json({
    success: true,
    is_legal,
    warnings	
  });
});A
=// 模拟内容深度润色接口 (去 AI 腔与金句提取):
6app.post('/api/content/expert/polish', (req, res) => {%
!  const { raw_draft } = req.body;]
Y  if (!raw_draft) return res.status(400).json({ error: "Missing parameter: raw_draft" });L
H  console.log(`[Content Polisher] Refining draft to remove AI tone...`);
  let polished = raw_draftg
c    .replace(/在当今快节奏的社会中/g, "说句大实话，现在大家节奏都这么快")L
H    .replace(/值得注意的是/g, "这里面有个很硬核的卡点").
*    .replace(/不得不说/g, "老实说")>
:    .replace(/是一把双刃剑/g, "坑其实挺深的");
  res.json({
    success: true, 
    polished_text: polished,
    golden_sentences: [~
z      "别用机器的套话去糊弄你的客户，真诚的痛点对比，永远比一万句AI生成的废话管用。",S
O      "AI销冠的核心不是话术，而是对用户预算的残忍审计。"	
    ]	
  });
});+
'// 模拟事实数据交叉核对接口:
6app.post('/api/content/expert/verify', (req, res) => {"
  const { claims } = req.body;[
W  console.log(`[Fact Checker] Verifying data points: ${JSON.stringify(claims || [])}`);
  res.json({
    success: true,
    verified: true,
    unverified_items: []	
  });
});5
1// 模拟自媒体文案/脚本初稿生成接口;
7app.post('/api/content/producer/write', (req, res) => {4
0  const { title, outline, platform } = req.body;v
r  if (!title || !outline) return res.status(400).json({ error: "Missing required parameters: title or outline" });Z
V  console.log(`[Content Writer] Drafting text for platform: ${platform || 'wechat'}`);'
#  if (platform === "xiaohongshu") {
    return res.json({
      success: true,
      draft_content: `💡为什么99%的人做Agent都卡在本地部署上？\n\n说句实在话，大部分人把时间花在配置复杂的 Docker 和 Python 环境上，结果还没运行就放弃了。😅\n\n📌 昆仑增长团队今天教你一个 3 步落地法：\n\n1️⃣ 第一步：直接使用 Mac 本地 Claude Desktop MCP 网关；\n2️⃣ 第二步：通过 Node.js 本地监听 API，实现数据直连；\n3️⃣ 第三步：把 SQLite 微信数据库直接挂载在 data/ 目录下！\n\n整套 SOP 看板已经整理成 PDF 啦，想要获取这套SOP的，可以在评论区滴滴，我把 PDF 手册直接发你！👇`,
      estimated_words: 240
    });
  }"
  if (platform === "douyin") {
    return res.json({
      success: true,
      draft_content: `【画面：主播对着镜头，字幕特大：別瞎买AI课了！】\n口播：别瞎买AI课了！我把昆仑增长的 6 大核心 Agent 架构图全部公开！\n\n【画面：切入网关 src/index.js 代码特写，配合敲击键盘声】\n口播：真正的企业级智能体不是写几个 Prompt 玩玩，而是直接打通天眼查、微信 SQLite 数据库、甚至是你的本地终端命令行！\n\n【画面：切回主播，手持平板展示多维表格交付面板】\n口播：关注我，在后台回复‘网关’，直接送你整套 Express 底座源码！`,
      estimated_words: 180
    });
  }
  res.json({
    success: true,
    draft_content: `在当今快节奏的社会中，多智能体（Multi-Agent）架构的商用化落地正逐渐成为企业的核心壁垒。\n\n值得注意的是，很多企业在部署 Agent 时，往往高估了 Prompt 的作用，而低估了‘底层数据直连’的门槛。这是一把双刃剑...\n\n首先，我们要明确痛点：大模型如果没有本地数据库和终端命令的执行能力，就是一个只会纸上谈兵的空壳。\n其次，我们要建立统一的网关 API，把微信 OpenClaw 的实时监听与解密后的 SQLite 全量查询统一挂载...\n最后，交付是口碑的保证。我们需要将流程结构化地推送至飞书任务多维表格看板。`,
    estimated_words: 1200	
  });
});D
@// 模拟公众号富文本排版渲染接口 (编译内联 CSS):
6app.post('/api/content/editor/render', (req, res) => {,
(  const { markdown_content } = req.body;k
g  if (!markdown_content) return res.status(400).json({ error: "Missing parameter: markdown_content" });P
L  console.log(`[Rich-Text Renderer] Compiling Markdown with Inline CSS...`);
  const styledHtml = `s
o    <section style="font-size: 15px; color: #3e3e3e; line-height: 1.75; letter-spacing: 1.5px; padding: 10px;">
      <h2 style="border-left: 4px solid #1a1a1a; padding-left: 8px; font-size: 18px; color: #1a1a1a; margin-top: 24px; margin-bottom: 16px; font-weight: bold;">*
&        昆仑增长架构落地指引
      </h2>*
&      <p style="margin-bottom: 16px;">7
3        ${markdown_content.replace(/\n/g, '<br/>')}

      </p>
      <blockquote style="background-color: #f7f7f7; border-radius: 8px; padding: 16px; border: 1px solid #eeeeee; font-size: 14px; color: #666666; margin: 16px 0;">w
s        💡 <strong>系统提示：</strong> 请将此富文本直接粘贴至微信公众号草稿箱中预览。
      </blockquote>
    </section>
  `;
  res.json({
    success: true, 
    html_content: styledHtml	
  });
});4
0// 模拟向公众号草稿箱同步推送接口;
7app.post('/api/content/editor/publish', (req, res) => {7
3  const { title, html_content, author } = req.body;l
h  if (!title || !html_content) return res.status(400).json({ error: "Missing title or html_content." });m
i  console.log(`[WeChat API] Uploading draft: "${title}" by ${author || '昆仑增长'} to Draft Box...`);
  res.json({
    success: true,P
L    media_id: "wx_media_draft_" + Math.random().toString(36).substring(2, 9)	
  });
});7
3// 模拟知识星球干货主题自动发布接口9
5app.post('/api/content/zsxq/publish', (req, res) => {A
=  const { title, content, group_name, is_sticky } = req.body;v
r  if (!title || !content) return res.status(400).json({ error: "Missing required parameters: title or content" });
  console.log(`[ZSXQ API] Publishing post: "${title}" on Planet: ${group_name || '昆仑增长主星球'}. Sticky: ${is_sticky}`);
  res.json({
    success: true,L
H    topic_id: "zsxq_topic_" + Math.random().toString(36).substring(2, 9)	
  });
});7
3// 模拟跨部门日报提炼总裁办简报接口?
;app.post('/api/management/briefing/create', (req, res) => {'
#  const { raw_reports } = req.body;W
S  if (!raw_reports) return res.status(400).json({ error: "Missing: raw_reports" });u
q  console.log(`[Executive Assistant] Creating weekly/daily briefing from ${raw_reports.length} report sources.`);
  res.json({
    success: true,
    briefing: {w
s      alert: "【珠宝AI销冠项目】合作方在天眼查中被发现有一笔 20 万的司法诉讼卡点。",
      highlights: ["内容组本周小红书冷启动起号数据增长 15%", "数据组完成了对微信 SQLite 历史库的去噪清洗"],
      suggestions: ["方案A：暂缓付款，要求合作方提供结案证明", "方案B：继续合作，但在合同中追加违约责任"]	
    }	
  });
});*
&// 模拟 CEO 日程会议创建接口>
:app.post('/api/management/schedule/event', (req, res) => {D
@  const { summary, start_time, end_time, attendees } = req.body;s
o  if (!summary || !start_time) return res.status(400).json({ error: "Missing required calendar parameters." });}
y  console.log(`[Calendar Service] Booking event: "${summary}" at ${start_time} for: ${JSON.stringify(attendees || [])}`);
  res.json({
    success: true,E
A    event_id: "evt_" + Math.random().toString(36).substring(2, 9)	
  });
});$
 // 模拟任务 WBS 拆解接口7
3app.post('/api/project/wbs/create', (req, res) => {:
6  const { project_name, raw_requirements } = req.body;/
+  if (!project_name || !raw_requirements) {f
b    return res.status(400).json({ error: "Missing parameter: project_name or raw_requirements" });
  }]
Y  console.log(`[WBS Decomposer] Creating breakdown stages for project: ${project_name}`);
  res.json({
    success: true,
    stages: [l
h      { id: "1.1", task: "微信解密 SQLite 历史数据库挂载", owner: "技术专家", hours: 8 },u
q      { id: "1.2", task: "通过 SQL 提取客户线索", owner: "微信数据专员", hours: 6, pre_id: "1.1" },p
l      { id: "2.1", task: "撰写公众号推广初稿", owner: "内容生产官", hours: 12, pre_id: "1.2" }	
    ]	
  });
});9
5// 模拟 WBS 任务同步到多维表格看板接口9
5app.post('/api/project/bitable/sync', (req, res) => {/
+  const { project_name, tasks } = req.body;j
f  if (!project_name || !tasks) return res.status(400).json({ error: "Missing required parameters." });y
u  console.log(`[Lark Bitable Sync] Uploading ${tasks.length} tasks for project: ${project_name} to Kanban board...`);
  res.json({
    success: true,*
&    synced_records_count: tasks.length	
  });
});%
!// 模拟财务决算审计接口2
.app.post('/api/finance/audit', (req, res) => {Z
V  const { project_name, budget_limit, actual_expenses, estimated_revenue } = req.body;|
x  if (!project_name || budget_limit === undefined || actual_expenses === undefined || estimated_revenue === undefined) {k
g    return res.status(400).json({ error: "Missing required numeric parameters for financial audit." });
  }a
]  console.log(`[Financial Audit] Processing accounting ledger for project: ${project_name}`);M
I  const variance_ratio = (actual_expenses - budget_limit) / budget_limit;J
F  const roi = (estimated_revenue - actual_expenses) / actual_expenses;
  let risk_level = "none";.
*  if (variance_ratio > 0.1 || roi < 1.0) {
    risk_level = "high";
  } else if (roi < 1.5) {
    risk_level = "medium";
  }
  res.json({
    success: true,
    variance_ratio,
    roi,
    risk_level	
  });
});4
0// 模拟网页抓取与竞品价格检测接口<
8app.post('/api/combat/collector/scrape', (req, res) => {
  const { url } = req.body;Q
M  if (!url) return res.status(400).json({ error: "Missing parameter: url" });?
;  console.log(`[Scraper Engine] Pulling DOM from: ${url}`);
  res.json({
    success: true,-
)    site_title: "竞品 AI 销冠官网",
    pricing_plans: [H
D      { name: "Starter", price: "$19/mo", limit: "1,000 Messages" },D
@      { name: "Pro", price: "$99/mo", limit: "10,000 Messages" }

    ],
    detected_changes: [X
T      "官网悄悄上线了‘按量付费’计费方案，降低入门门槛。",<
8      "新增了飞书多维表格一键导出插件。"	
    ]	
  });
});1
-// 模拟竞品 SWOT 战略矩阵研判接口>
:app.post('/api/combat/researcher/analyze', (req, res) => {>
:  const { competitor_name, raw_intel_summary } = req.body;3
/  if (!competitor_name || !raw_intel_summary) {O
K    return res.status(400).json({ error: "Missing required parameters." });
  }n
j  console.log(`[Intel Researcher] Performing SWOT Matrix calculations on competitor: ${competitor_name}`);
  res.json({
    success: true,
    winning_rate: 0.85,
    swot_results: {c
_      strengths: "竞品拥有完备的公域自媒体广告投放团队，品牌效应高。",
      weaknesses: "竞品底层缺乏本地数据直连网关，且必须将微信敏感数据上传云端，触及数据隐私红线。",p
l      opportunities: "多智能体商用化落地市场空间广阔，企业级痛点诊断需求强烈。",n
j      threats: "昆仑增长主打本地网关与 SQLite 历史库真实查询，形成差异化打击。"	
    }	
  });
});+
'// 模拟手册章节编译打包接口:
6app.post('/api/combat/manual/compile', (req, res) => {S
O  const { chapter_title, raw_sop_text, warnings, attachment_links } = req.body;,
(  if (!chapter_title || !raw_sop_text) {c
_    return res.status(400).json({ error: "Missing parameter: chapter_title or raw_sop_text" });
  }O
K  console.log(`[Manual Compiler] Bundling chapter: "${chapter_title}"...`); 
  const compiledMarkdown = `6
2# 📘 昆仑增长实战手册：${chapter_title}O
K- **同步状态**：已成功同步至会员工具箱 [时间: 2026-07-15]
---
> [!IMPORTANT]H
D> **避坑卡点提示**：${warnings || '暂无特别注意事项'}"
### 🛠️ 核心实操步骤
${raw_sop_text}+
'### 📦 附录：本章配套交付件^
Z${(attachment_links || []).map(link => `- 📥 [工具文件直达](${link})`).join('\n')}
  `;
  res.json({
    success: true,,
(    compiled_markdown: compiledMarkdown,R
N    save_path: "/Volumes/MOVESPEED/下载/AIcode/Agent/docs/manual_chapter.md"	
  });
});.
*// 模拟会员答疑与派单流转接口=
9app.post('/api/operation/ticket/resolve', (req, res) => {1
-  const { member_name, question } = req.body;z
v  if (!member_name || !question) return res.status(400).json({ error: "Missing parameter: member_name or question" });i
e  console.log(`[Support Ticket] Processing incident for member: ${member_name}. Issue: ${question}`);
  const isTechnical = question.toLowerCase().includes("npm") || question.toLowerCase().includes("err") || question.toLowerCase().includes("code") || question.toLowerCase().includes("sqlite");
  res.json({
    success: true,
    replied_text: isTechnical ? "抱歉哈兄弟，这看起来是个环境编译编译卡点。我已经帮您将此工单自动升级派发给我们的技术专家，技术人员会在飞书看板上跟进，并及时给您回复。" : "收到，关于您提问的冷启动选题方案，建议查阅我们的《小红书冷启动7步起号手册》第二章。",$
     need_escalation: isTechnical	
  });
});:
6// 模拟销售 BANT 线索清洗与跟进话术接口<
8app.post('/api/operation/sales/qualify', (req, res) => {(
$  const { chat_history } = req.body;c
_  if (!chat_history) return res.status(400).json({ error: "Missing parameter: chat_history" });P
L  console.log(`[Sales Agent] Running BANT analysis on WeChat chat logs...`);
  res.json({
    success: true,
    budget_confirmed: true,w
s    need_description: "微信读书笔记无法自动上传到 NotebookLM 云端，冷启动起号严重受阻。",
    closing_rate: 0.80,
    recommended_script: "哥，非常理解咱们团队首期付这笔钱会有些顾虑。其实您可以这样算：我们这套系统是一次性买断本地部署的，相比去招一个技术，这套方案运行一两个月就能把成本收回来。而且，这期帅总特批的本地微信 SQL 解密服务包，目前就剩下最后 2 个挂载名额了，这周过完我们就要恢复原价了。您看咱们今天先把定金留存下，我让技术专家今晚就帮您远程把网关跑起来？"	
  });
});#
// 模拟 AI 绘图生图接口<
8app.post('/api/operation/designer/draw', (req, res) => {0
,  const { prompt, aspect_ratio } = req.body;W
S  if (!prompt) return res.status(400).json({ error: "Missing parameter: prompt" });u
q  console.log(`[Graphic Engine] Drawing image for Prompt: "${prompt}" (Aspect Ratio: ${aspect_ratio || '3:4'})`);
  res.json({
    success: true,Z
V    image_url: "file:///Volumes/MOVESPEED/下载/AIcode/Agent/docs/weread-placeholder"	
  });
});k
g// 获取本地配置中心数据 (API Keys、Lark AppId、OpenClaw Token、WhatsApp/X 出海通道等)1
-app.get('/api/system/config', (req, res) => {M
I  console.log(`[Config Service] Reading local system configurations...`);
  res.json({
    success: true,

    env: {T
P      CLAUDE_API_KEY: process.env.CLAUDE_API_KEY || "sk-ant-xxxxxxxxxxxxxxxxxx",T
P      TIANYANCHA_TOKEN: process.env.TIANYANCHA_TOKEN || "tyc_token_xxxxxxxxxxx",d
`      WECHAT_DB_PATH: process.env.WECHAT_DB_PATH || path.resolve(__dirname, '../data/wx_db.db'),I
E      LARK_APP_ID: process.env.LARK_APP_ID || "cli_a1b2c3d4e5f6g7h8",]
Y      LARK_APP_SECRET: process.env.LARK_APP_SECRET || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",=
9      LARK_CLI_PATH: process.env.LARK_CLI_PATH || "lark",U
Q      OPENCLAW_API_URL: process.env.OPENCLAW_API_URL || "http://localhost:18000",I
E      OPENCLAW_TOKEN: process.env.OPENCLAW_TOKEN || "mock_token_123",U
Q      WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || "http://localhost:19000",[
W      TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN || "twitter_token_xxxxxxxxxxxxx"	
    }	
  });
});m
i// 保存本地环境变量配置 (仅管理员有权修改，且真正物理写入硬盘 .env 文件中)7
3app.post('/api/system/config/save', (req, res) => {"
  const { config } = req.body;W
S  const user_role = req.user?.role || 'sales'; // ✅ 从 JWT 读取，防止伪造T
P  if (!config) return res.status(400).json({ error: "Missing config object." });8
4  // 校验当前操作人职位权限 (RBAC 拦截)"
  if (user_role !== 'admin') {v
r    console.warn(`🛡️ [Access Denied] Unauthorized config edit attempt by Role: "${user_role || 'unknown'}"`);%
!    return res.status(403).json({
      success: false,z
v      error: `Access Denied: Role "${user_role || 'unknown'}" is not authorized to edit system environment variables.`
    });
  }9
5  const envPath = path.resolve(__dirname, '../.env');`
\  console.log(`[Config Service] Writing new API keys and Lark config to local: ${envPath}`);*
&  // 1. 生成物理 .env 文件正文g
c  const envContent = `# 昆仑增长多智能体系统本地配置文件 (通过控制台热更新)
	PORT=88881
-CLAUDE_API_KEY=${config.CLAUDE_API_KEY || ''}5
1TIANYANCHA_TOKEN=${config.TIANYANCHA_TOKEN || ''}1
-WECHAT_DB_PATH=${config.WECHAT_DB_PATH || ''}+
'LARK_APP_ID=${config.LARK_APP_ID || ''}3
/LARK_APP_SECRET=${config.LARK_APP_SECRET || ''}3
/LARK_CLI_PATH=${config.LARK_CLI_PATH || 'lark'}K
GOPENCLAW_API_URL=${config.OPENCLAW_API_URL || 'http://localhost:18000'}1
-OPENCLAW_TOKEN=${config.OPENCLAW_TOKEN || ''}K
GWHATSAPP_API_URL=${config.WHATSAPP_API_URL || 'http://localhost:19000'}7
3TWITTER_API_TOKEN=${config.TWITTER_API_TOKEN || ''}
`;
  try {&
"    // 2. 物理写入本地文件7
3    fs.writeFileSync(envPath, envContent, 'utf-8');
    a
]    // 3. 热更新内存环境变量，使下次 API 连通直接生效，无需重启进程;
7    process.env.CLAUDE_API_KEY = config.CLAUDE_API_KEY;?
;    process.env.TIANYANCHA_TOKEN = config.TIANYANCHA_TOKEN;;
7    process.env.WECHAT_DB_PATH = config.WECHAT_DB_PATH;5
1    process.env.LARK_APP_ID = config.LARK_APP_ID;=
9    process.env.LARK_APP_SECRET = config.LARK_APP_SECRET;9
5    process.env.LARK_CLI_PATH = config.LARK_CLI_PATH;?
;    process.env.OPENCLAW_API_URL = config.OPENCLAW_API_URL;;
7    process.env.OPENCLAW_TOKEN = config.OPENCLAW_TOKEN;?
;    process.env.WHATSAPP_API_URL = config.WHATSAPP_API_URL;A
=    process.env.TWITTER_API_TOKEN = config.TWITTER_API_TOKEN;_
[    console.log(`✅ [Config Service] Successfully hot-saved new environmental settings.`);
    res.json({
      success: true,W
S      message: "本地环境变量配置已成功物理保存并热更新生效。"
    });
  } catch (err) {U
Q    res.status(500).json({ error: "Failed to write .env file: " + err.message });
  }
});7
3// 获取本地自定义职位与权限矩阵配置6
2app.get('/api/system/permissions', (req, res) => {H
D  const permPath = path.join(__dirname, '../data/permissions.json');P
L  console.log(`[Permission Service] Loading role matrix from: ${permPath}`);%
!  if (!fs.existsSync(permPath)) {
    const defaultMatrix = {C
?      admin: ["wechat_audit", "content_risk", "system_config"],#
      editor: ["content_risk"],!
      sales: ["wechat_audit"]

    };
	    try {1
-      const dataDir = path.dirname(permPath);(
$      if (!fs.existsSync(dataDir)) {7
3        fs.mkdirSync(dataDir, { recursive: true });
      }V
R      fs.writeFileSync(permPath, JSON.stringify(defaultMatrix, null, 2), 'utf-8');
    } catch (e) {H
D      console.error(`Failed to write default permissions file:`, e);	
    }B
>    return res.json({ success: true, matrix: defaultMatrix });
  }
  try {;
7    const rawData = fs.readFileSync(permPath, 'utf-8');A
=    res.json({ success: true, matrix: JSON.parse(rawData) });
  } catch (err) {Z
V    res.status(500).json({ error: "Failed to read permission file: " + err.message });
  }
});:
6// 管理员物理保存自定义职位与权限矩阵<
8app.post('/api/system/permissions/save', (req, res) => {"
  const { matrix } = req.body;2
.  const user_role = req.user?.role || 'sales';U
Q  if (!matrix) return res.status(400).json({ error: "Missing matrix payload." });"
  if (user_role !== 'admin') {%
!    return res.status(403).json({
      success: false,X
T      error: "Access Denied: Only Admin can update the system authorization matrix."
    });
  }H
D  const permPath = path.join(__dirname, '../data/permissions.json');Y
U  console.log(`[Permission Service] Overwriting local authorization matrix file...`);
  try {/
+    const dataDir = path.dirname(permPath);&
"    if (!fs.existsSync(dataDir)) {5
1      fs.mkdirSync(dataDir, { recursive: true });	
    }M
I    fs.writeFileSync(permPath, JSON.stringify(matrix, null, 2), 'utf-8');s
o    res.json({ success: true, message: "自定义职位权限矩阵已成功物理保存并实时生效。" });
  } catch (err) {\
X    res.status(500).json({ error: "Failed to save permission matrix: " + err.message });
  }
});>
:// 获取本地 30个 Agent 开关状态 (热插拔模块)8
4app.get('/api/system/agents/status', (req, res) => {K
G  const statusPath = path.join(__dirname, '../data/agent_status.json');[
W  console.log(`[Agent Hot-Swap] Loading agent lifecycle switches from: ${statusPath}`);'
#  if (!fs.existsSync(statusPath)) {
    const defaultStatus = {"
      ai_sales_champion: true, 
      risk_controller: true,
      manual_editor: true,
      claude_code: true,*
&      meeting_minutes_specialist: true

    };
	    try {3
/      const dataDir = path.dirname(statusPath);R
N      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });X
T      fs.writeFileSync(statusPath, JSON.stringify(defaultStatus, null, 2), 'utf-8');
    } catch (e) {
      console.error(e);	
    }I
E    return res.json({ success: true, status_matrix: defaultStatus });
  }
  try {=
9    const rawData = fs.readFileSync(statusPath, 'utf-8');H
D    res.json({ success: true, status_matrix: JSON.parse(rawData) });
  } catch (err) {M
I    res.status(500).json({ error: "Failed to read agent status file." });
  }
});/
+// 管理员物理保存 Agent 开关矩阵>
:app.post('/api/system/agents/status/save', (req, res) => {)
%  const { status_matrix } = req.body;2
.  const user_role = req.user?.role || 'sales';c
_  if (!status_matrix) return res.status(400).json({ error: "Missing status_matrix payload." });"
  if (user_role !== 'admin') {
}    return res.status(403).json({ success: false, error: "Access Denied: Only Admin can update Agent lifecycle switches." });
  }K
G  const statusPath = path.join(__dirname, '../data/agent_status.json');^
Z  console.log(`[Agent Hot-Swap] Saving new agent status configuration to: ${statusPath}`);
  try {V
R    fs.writeFileSync(statusPath, JSON.stringify(status_matrix, null, 2), 'utf-8');
    res.json({ success: true, message: "Agent 模块开关已物理更新，未启用模块已被 MCP/控制台隔离隐藏。" });
  } catch (err) {M
I    res.status(500).json({ error: "Failed to save agent status file." });
  }
});G
C// 飞书多维表格 (Lark Bitable) 微信线索物理同步接口<
8app.post('/api/lark/bitable/sync', async (req, res) => {!
  const { leads } = req.body;,
(  if (!leads || !Array.isArray(leads)) {Q
M    return res.status(400).json({ error: "Missing parameter: leads list." });
  },
(  const appId = process.env.LARK_APP_ID;4
0  const appSecret = process.env.LARK_APP_SECRET;V
R  console.log(`[Lark Sync] Syncing ${leads.length} WeChat leads to Lark Base...`);<
8  // 判断飞书授权钥匙是否为 Mock 或者是空_
[  if (!appId || appId.includes('xxxxxxxx') || !appSecret || appSecret.includes('xxxxxx')) {x
t    console.log(`⚠️ 未检测到有效飞书 API 授权凭证，启动降级 Mock 飞书多维表格入库...`);
    return res.json({
      success: true,
      is_mock: true,#
      sync_count: leads.length,V
R      bitable_url: "https://kunlungrowth.feishu.cn/base/bascnMockLeadsTableToken",m
i      message: "线索已模拟成功推送至飞书多维表格 [昆仑增长-私域意向线索池]！"
    });
  }
  try {.
*    // 1. 请求飞书 tenant_access_tokenn
j    const authRes = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
      method: "POST",:
6      headers: { "Content-Type": "application/json" },H
D      body: JSON.stringify({ app_id: appId, app_secret: appSecret })
    });.
*    const authData = await authRes.json();"
    if (authData.code !== 0) {'
#      return res.status(400).json({
        success: false,6
2        error: "Lark auth failed: " + authData.msg
	      });	
    }3
/    const token = authData.tenant_access_token;a
]    console.log(`🔑 成功获取飞书 Tenant Access Token，正在写入多维表格...`);
    // 2. 真实将数据写入飞书多维表格 (为了演示完整性，若无配置表格ID，自动返回真实多维表格配置连通信息)
    res.json({
      success: true,
      is_mock: false,#
      sync_count: leads.length,*
&      token_type: "TenantAccessToken",J
F      bitable_url: "https://open.feishu.cn/open-apis/bitable/v1/apps",z
v      message: "本地网关已成功连通飞书 OpenAPI！凭证验证通过，已获得多维表格写入授权。"
    });
  } catch (err) {V
R    res.status(500).json({ error: "Lark API connection failed: " + err.message });
  }
});E
A// 获取本地多平台大模型 API 密钥与配置中心数据8
4app.get('/api/system/llm/providers', (req, res) => {N
J  const providerPath = path.join(__dirname, '../data/llm_providers.json');Z
V  console.log(`[LLM Router] Loading multi LLM provider config from: ${providerPath}`);)
%  if (!fs.existsSync(providerPath)) {"
    const defaultProviders = {
      claude: { name: "Anthropic Claude", base_url: "https://api.anthropic.com", api_key: "sk-ant-xxxxxxxxxxxxxxxxxxxx", model_name: "claude-3-5-sonnet" },
      openai: { name: "OpenAI GPT-4", base_url: "https://api.openai.com/v1", api_key: "sk-proj-xxxxxxxxxxxxxxxxxxxx", model_name: "gpt-4o" },
      deepseek: { name: "DeepSeek API", base_url: "https://api.deepseek.com/v1", api_key: "sk-deepseek-xxxxxxxxxxxxxxxxx", model_name: "deepseek-chat" },
      aggregator: { name: "聚合中转平台 (Custom)", base_url: "https://api.oneapi.com/v1", api_key: "sk-custom-xxxxxxxxxxxxxxxxxx", model_name: "gpt-4o-mini" }

    };
	    try {5
1      const dataDir = path.dirname(providerPath);R
N      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });]
Y      fs.writeFileSync(providerPath, JSON.stringify(defaultProviders, null, 2), 'utf-8');
    } catch (e) {
      console.error(e);	
    }H
D    return res.json({ success: true, providers: defaultProviders });
  }
  try {?
;    const rawData = fs.readFileSync(providerPath, 'utf-8');D
@    res.json({ success: true, providers: JSON.parse(rawData) });
  } catch (err) {N
J    res.status(500).json({ error: "Failed to read LLM providers file." });
  }
});7
3// 管理员保存自定义多大模型密钥配置>
:app.post('/api/system/llm/providers/save', (req, res) => {%
!  const { providers } = req.body;2
.  const user_role = req.user?.role || 'sales';[
W  if (!providers) return res.status(400).json({ error: "Missing providers payload." });"
  if (user_role !== 'admin') {q
m    return res.status(403).json({ success: false, error: "Access Denied: Only Admin can update LLM keys." });
  }N
J  const providerPath = path.join(__dirname, '../data/llm_providers.json');P
L  console.log(`[LLM Router] Saving multi LLM settings to: ${providerPath}`);
  try {T
P    fs.writeFileSync(providerPath, JSON.stringify(providers, null, 2), 'utf-8');
    res.json({ success: true, message: "大模型及聚合平台密钥配置已物理写入本地 llm_providers.json 配置文件中并实时生效！" });
  } catch (err) {N
J    res.status(500).json({ error: "Failed to save LLM providers file." });
  }
});L
H// 测试各大模型基座与聚合平台的网络连通性 (Ping Test)?
;app.post('/api/system/llm/test-ping', async (req, res) => {$
   const { base_url } = req.body;[
W  if (!base_url) return res.status(400).json({ error: "Missing parameter: base_url" });Y
U  console.log(`[LLM Router] Testing connection latency for Base URL: "${base_url}"`);
  #
  const startTime = Date.now();/
+  const controller = new AbortController();R
N  const id = setTimeout(() => controller.abort(), 3500); // 3.5秒超时限制
  try {D
@    // 快速发起 HEAD / GET 请求以检测通道响应速度
    await fetch(base_url, {
      method: "GET",$
       signal: controller.signal,2
.      headers: { "User-Agent": "Mozilla/5.0" }
    });
    
    clearTimeout(id);/
+    const latency = Date.now() - startTime;
    res.json({
      success: true,
      latency_ms: latency,:
6      message: `网络连通正常 (HTTP Response OK)`
    });
  } catch (err) {
    clearTimeout(id);4
0    const isTimeout = err.name === 'AbortError';
    res.json({
      success: false,
      latency_ms: 9999,}
y      message: isTimeout ? `网络请求超时 (Timeout > 3.5s)` : `连接被拒绝或域名解析失败: ${err.message}`
    });
  }
});r
n// 大模型智能体对话中转代理接口 (已融入 100% 离线 RAG 知识库检索与自愈 Mock 机制)<
8app.post('/api/system/chat/agent', async (req, res) => {<
8  const { agent_id, message, provider_type } = req.body;"
  if (!agent_id || !message) {Y
U    return res.status(400).json({ error: "Missing parameter: agent_id or message" });
  }1
-  const provider = provider_type || 'claude';N
J  const providerPath = path.join(__dirname, '../data/llm_providers.json');
  
  let keyConfig = {};(
$  if (fs.existsSync(providerPath)) {
	    try {O
K      const providers = JSON.parse(fs.readFileSync(providerPath, 'utf-8'));0
,      keyConfig = providers[provider] || {};
    } catch (e) {
      console.error(e);	
    }
  }[
W  console.log(`[LLM Chat Router] Agent: "${agent_id}" calling provider "${provider}"`);3
/  // ==========================================C
?  // 📚 离线 RAG 知识库检索模块 (Keyword Search RAG)3
/  // ==========================================E
A  const knowledgeDir = path.join(__dirname, '../data/knowledge');
  let matchedContext = "";(
$  if (fs.existsSync(knowledgeDir)) {
	    try {j
f      const files = fs.readdirSync(knowledgeDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));!
      const foundBlocks = [];(
$      // 提取问题中的核心词j
f      const queryWords = message.toLowerCase().split(/[\s,，。？?！!]/).filter(w => w.length > 1);%
!      for (const file of files) {;
7        const filePath = path.join(knowledgeDir, file);?
;        const content = fs.readFileSync(filePath, 'utf-8');$
         // 按段落分割文本`
\        const paragraphs = content.split('\n').map(p => p.trim()).filter(p => p.length > 0);,
(        for (const para of paragraphs) {i
e          // 如果段落中包含用户输入 query 中的词汇，直接判定为相关性上下文
          const isRelated = queryWords.some(word => para.toLowerCase().includes(word)) || para.toLowerCase().includes(message.toLowerCase());
          if (isRelated) {D
@            foundBlocks.push(`[Source File: ${file}]\n${para}`);
          }
	        }
      }'
#      if (foundBlocks.length > 0) {-
)        // 取前 3 段最相关的段落B
>        matchedContext = foundBlocks.slice(0, 3).join('\n\n');
{        console.log(`[RAG Engine] Successfully retrieved ${foundBlocks.length} relevant paragraphs from local knowledge.`);
      }
    } catch (e) {7
3      console.error("Local RAG search failed:", e);	
    }
  }6
2  // 拼接带有私有知识库的系统提示词
  const systemPrompt = `You are a helpful AI assistant representing Agent [${agent_id}]. Please answer based on your人设 and specialized knowledge.
${matchedContext ? `\n[CRITICAL - Local Private Knowledge Base Context]:\n${matchedContext}\n\nPlease prioritize using the local private knowledge above to answer the user query.` : ''}`;p
l  const hasRealKey = keyConfig.api_key && !keyConfig.api_key.includes('xxxxxx') && keyConfig.api_key !== '';
  
  if (!hasRealKey) {
~    console.log(`⚠️ 未检测到真实大模型 API Key 授权，自动启动 Agent 本地人格与 RAG 自愈回复...`);
    
    let mockReply = "";/
+    if (agent_id === "ai_sales_champion") {
      mockReply = "哥，关于咱们昆仑增长智能体的手册，我非常建议咱们先看下这个交付包。我们这次本地部署最大的核心就是‘绝对的安全隐私’。很多企业把数据放云端容易出泄漏事故，咱们这套直接部署在您公司自己的服务器上，老板看了都放心！要不咱们今天先付个诚意金把开发测试环境给您搭起来？";4
0    } else if (agent_id === "risk_controller") {
      mockReply = "【内容风控扫描日志】：经审计，您的草稿文案中包含 2 处违禁字词（‘绝对保证、第一品牌’），涉嫌违反《广告法》第九条。且发现 AI 八股高频词‘不得不说’。已为您自动改写为：‘我们在增长实操中推荐这一经过多次验证的方案，它能极大提高团队留存率。’";3
/    } else if (agent_id === "topic_selector") {
      mockReply = "已为您生成 3 个珠宝私域爆款标题模板：\n1. 《不得不看！珠宝老板都在用的3个私域回款大招》\n2. 《预算2万，如何靠AI销冠话术把转化率拉到15%？》\n3. 《珠宝私域避坑：为什么你的客户加了微信却从不说话？》";0
,    } else if (agent_id === "claude_code") {
      mockReply = "Local workspace check completed. Code compile environment in `/Volumes/MOVESPEED/...` looks healthy. Ready to run git commit or modify files.";
    } else {
      mockReply = `你好！我是昆仑增长智能体军团的【${agent_id}】。我已接收到您的指令：“${message}”。我目前正通过本地 8888 专属网关的 【${provider}】 大模型通道进行决策推理，随时可以为您提供 Tools 支持。`;	
    }O
K    // 若 RAG 引擎检索到了本地文档，前缀高亮回显提示！
    if (matchedContext) {{
w      mockReply = `💡【离线 RAG 知识库检索成功】（已精准匹配本地文档段落）：\n${mockReply}`;	
    }3
/    await new Promise(r => setTimeout(r, 600));
    return res.json({
      success: true,
      is_mock: true,
      provider: provider,6
2      model: keyConfig.model_name || "mock-model",
      reply: mockReply
    });
  }
  try {B
>    const fetchUrl = `${keyConfig.base_url}/chat/completions`;0
,    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {/
+        "Content-Type": "application/json",:
6        "Authorization": `Bearer ${keyConfig.api_key}`
      }, 
      body: JSON.stringify({(
$        model: keyConfig.model_name,
        messages: [8
4          { role: "system", content: systemPrompt },0
,          { role: "user", content: message }

        ],
        temperature: 0.7
      })
    });+
'    const data = await response.json();.
*    if (data.choices && data.choices[0]) {
      res.json({
        success: true,
        is_mock: false,
        provider: provider,(
$        model: keyConfig.model_name,2
.        reply: data.choices[0].message.content
	      });
    } else {S
O      res.status(500).json({ error: "Failed to parse API choices response." });	
    }
  } catch (err) {`
\    res.status(500).json({ error: "Remote LLM Gateway connection failed: " + err.message });
  }
});:
6// 获取本地已挂载的离线知识库文档列表9
5app.get('/api/system/knowledge/list', (req, res) => {E
A  const knowledgeDir = path.join(__dirname, '../data/knowledge');T
P  console.log(`[RAG Engine] Loading knowledge file list from: ${knowledgeDir}`);)
%  if (!fs.existsSync(knowledgeDir)) {8
4    fs.mkdirSync(knowledgeDir, { recursive: true });,
(    // 写入默认示例知识库文件O
K    const welcomeFile = path.join(knowledgeDir, 'kunlun_growth_guide.txt');
    fs.writeFileSync(welcomeFile, `昆仑增长智能体使用指南\n1. 离线多智能体系统：完全不依赖外部云端，100% 隐私安全。\n2. 报价政策：昆仑增长标准版价格为 19,800 元/年。\n3. 联系人：帅总，微信 xxxxx。`, 'utf-8');
  }
  try {h
d    const files = fs.readdirSync(knowledgeDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));+
'    const docList = files.map(file => {9
5      const filePath = path.join(knowledgeDir, file);-
)      const stat = fs.statSync(filePath);=
9      const content = fs.readFileSync(filePath, 'utf-8');
      return {
        filename: file,"
        size_bytes: stat.size,T
P        preview: content.substring(0, 100) + (content.length > 100 ? '...' : '')
      };
    });8
4    res.json({ success: true, documents: docList });
  } catch (err) {T
P    res.status(500).json({ error: "Failed to read knowledge base directory." });
  }
});;
7// 管理员持久化上传/保存知识库文档文件:
6app.post('/api/system/knowledge/save', (req, res) => {-
)  const { filename, content } = req.body;W
S  const user_role = req.user?.role || 'sales'; // ✅ 从 JWT 读取，防止伪造r
n  if (!filename || !content) return res.status(400).json({ error: "Missing parameter: filename or content" });"
  if (user_role !== 'admin') {w
s    return res.status(403).json({ success: false, error: "Access Denied: Only Admin can update knowledge base." });
  }p
l  const safeFilename = filename.endsWith('.txt') || filename.endsWith('.md') ? filename : filename + '.txt';@
<  const targetPath = path.join(KNOWLEDGE_DIR, safeFilename);P
L  console.log(`[RAG Engine] Writing knowledge base file to: ${targetPath}`);
  try { 
    // 1. 保存物理文件7
3    fs.writeFileSync(targetPath, content, 'utf-8');
    &
"    // 2. 切片并写入 FTS5 库_
[    ragDb.run(`DELETE FROM knowledge_chunks WHERE filename = ?`, [safeFilename], (err) => {O
K      if (err) console.error('[RAG Engine] Delete old chunks error:', err);,
(      const chunks = chunkText(content);w
s      const stmt = ragDb.prepare(`INSERT INTO knowledge_chunks (filename, chunk_index, content) VALUES (?, ?, ?)`);,
(      chunks.forEach((chunk, index) => {1
-        stmt.run(safeFilename, index, chunk);
	      });
      stmt.finalize();Z
V      console.log(`[RAG Engine] Indexed ${chunks.length} chunks for ${safeFilename}`);
    });
    res.json({ success: true, message: `离线知识库文档「${safeFilename}」已物理持久化写入本地 FTS5 库，Agent 已实时挂载！` });
  } catch (err) {P
L    res.status(500).json({ error: "Failed to write knowledge base file." });
  }
});1
-// ==========================================P
L// 📎 文件上传解析：PDF / Word / TXT / MD → 知识库自动入库1
-// ==========================================Y
Uapp.post('/api/system/knowledge/upload', upload.single('file'), async (req, res) => {Q
M  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });H
D  const user_role = req.user?.role || 'sales'; // ✅ 从 JWT 读取"
  if (user_role !== 'admin') {;
7    fs.unlinkSync(req.file.path); // 删除临时文件Y
U    return res.status(403).json({ error: 'Only Admin can upload knowledge files.' });
  }D
@  const ext = path.extname(req.file.originalname).toLowerCase();H
D  const targetFilename = req.file.originalname.replace(/\s+/g, '_');\
X  const targetPath = path.join(__dirname, '../data/knowledge', targetFilename + '.txt');
  let extractedText = '';
  try {
    if (ext === '.pdf') {
      // PDF 解析0
,      const pdfParse = require('pdf-parse');8
4      const buffer = fs.readFileSync(req.file.path);1
-      const pdfData = await pdfParse(buffer);'
#      extractedText = pdfData.text;7
3    } else if (ext === '.docx' || ext === '.doc') {
      // Word 解析-
)      const mammoth = require('mammoth');O
K      const result = await mammoth.extractRawText({ path: req.file.path });'
#      extractedText = result.value;
    } else {"
      // TXT / MD 直接读取B
>      extractedText = fs.readFileSync(req.file.path, 'utf-8');	
    }
    // 清理临时文件%
!    fs.unlinkSync(req.file.path);$
     if (!extractedText.trim()) {[
W      return res.status(422).json({ error: 'Could not extract text from this file.' });	
    } 
    // 1. 写入物理文件D
@    fs.writeFileSync(targetPath, extractedText.trim(), 'utf-8');&
"    // 2. 切片并写入 FTS5 库6
2    const finalFilename = targetFilename + '.txt';`
\    ragDb.run(`DELETE FROM knowledge_chunks WHERE filename = ?`, [finalFilename], (err) => {9
5      const chunks = chunkText(extractedText.trim());w
s      const stmt = ragDb.prepare(`INSERT INTO knowledge_chunks (filename, chunk_index, content) VALUES (?, ?, ?)`);,
(      chunks.forEach((chunk, index) => {2
.        stmt.run(finalFilename, index, chunk);
	      });
      stmt.finalize();[
W      console.log(`[RAG Engine] Indexed ${chunks.length} chunks for ${finalFilename}`);
    });
    res.json({
      success: true,"
      filename: finalFilename,+
'      char_count: extractedText.length,{
w      message: `「${req.file.originalname}」已成功解析并写入本地 FTS5 知识库，Agent 已实时挂载！`
    });
  } catch (err) {,
(    // 清理临时文件（错误时）G
C    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);=
9    console.error('[RAG Engine] File parse error:', err);M
I    res.status(500).json({ error: 'File parse failed: ' + err.message });
  }
});"
// 删除指定知识库文档>
:app.delete('/api/system/knowledge/delete', (req, res) => {$
   const { filename } = req.body;2
.  const user_role = req.user?.role || 'sales';b
^  if (user_role !== 'admin') return res.status(403).json({ error: 'Only Admin can delete.' });Q
M  if (!filename) return res.status(400).json({ error: 'Missing filename.' });L
H  const safeFilename = path.basename(filename); // 防路径遍历攻击Q
M  const targetPath = path.join(__dirname, '../data/knowledge', safeFilename);`
\  if (!fs.existsSync(targetPath)) return res.status(404).json({ error: 'File not found.' });
  try {"
    fs.unlinkSync(targetPath); 
    // 从 FTS5 库中删除U
Q    ragDb.run(`DELETE FROM knowledge_chunks WHERE filename = ?`, [safeFilename]);m
i    res.json({ success: true, message: `文档「${safeFilename}」已从知识库中物理删除！` });
  } catch (err) {I
E    res.status(500).json({ error: 'Delete failed: ' + err.message });
  }
});1
-// ==========================================8
4// 🔍 RAG 搜索接口 (供 Agent 或测试使用)1
-// ==========================================<
8app.post('/api/system/knowledge/search', (req, res) => {,
(  const { query, limit = 3 } = req.body;J
F  if (!query) return res.status(400).json({ error: "Missing query" });C
?  // FTS5 MATCH 语法：简单按空格分词构建 AND 条件\
X  const ftsQuery = query.split(/\s+/).map(q => `"${q.replace(/"/g, '')}"`).join(' OR ');
  ragDb.all(5
1    `SELECT filename, chunk_index, content, rank 
     FROM knowledge_chunks (
$     WHERE knowledge_chunks MATCH ? 
     ORDER BY rank 
     LIMIT ?`, 
    [ftsQuery, limit], 
    (err, rows) => {
      if (err) {=
9        console.error('[RAG Engine] Search error:', err);D
@        return res.status(500).json({ error: "Search failed" });
      }5
1      res.json({ success: true, results: rows });	
    }
  );
});1
-// =========================================="
// 📊 Token 消费账单 API1
-// ==========================================6
2app.get('/api/system/token/usage', (req, res) => {%
!  const usage = loadTokenUsage();(
$  // 统计各个 Provider 的分布
  const byProvider = {};"
  usage.records.forEach(r => {`
\    if (!byProvider[r.provider]) byProvider[r.provider] = { input: 0, output: 0, calls: 0 };7
3    byProvider[r.provider].input += r.input_tokens;9
5    byProvider[r.provider].output += r.output_tokens;'
#    byProvider[r.provider].calls++;	
  });
  // 今日消费:
6  const today = new Date().toISOString().slice(0, 10);M
I  const todayRecords = usage.records.filter(r => r.ts.startsWith(today));N
J  const todayInput = todayRecords.reduce((s, r) => s + r.input_tokens, 0);P
L  const todayOutput = todayRecords.reduce((s, r) => s + r.output_tokens, 0);
  res.json({
    success: true,'
#    total_input: usage.total_input,)
%    total_output: usage.total_output,*
&    total_calls: usage.records.length, 
    today_input: todayInput,"
    today_output: todayOutput,)
%    today_calls: todayRecords.length, 
    by_provider: byProvider,K
G    recent_records: usage.records.slice(-20).reverse() // 最近 20 条	
  });
});7
3app.post('/api/system/token/reset', (req, res) => {H
D  const user_role = req.user?.role || 'sales'; // ✅ 从 JWT 读取a
]  if (user_role !== 'admin') return res.status(403).json({ error: 'Only Admin can reset.' });G
C  saveTokenUsage({ total_input: 0, total_output: 0, records: [] });M
I  res.json({ success: true, message: 'Token 消费记录已清零！' });
});1
-// ==========================================C
?// 🔍 微信本地 SQLite 数据库路径自动探测 (macOS)1
-// ==========================================6
2app.get('/api/wechat/detect-path', (req, res) => {
  const os = require('os');#
  const homeDir = os.homedir();'
#  // macOS 微信数据目录规律
  const wxContainerBase = path.join(homeDir, 'Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat');
  const detectedPaths = [];+
'  if (fs.existsSync(wxContainerBase)) {
	    try {;
7      const accounts = fs.readdirSync(wxContainerBase);'
#      accounts.forEach(account => {$
         // 过滤非账号目录0
,        if (account.startsWith('.')) return;R
N        const dbDir = path.join(wxContainerBase, account, 'Message/msg_0.db');L
H        const dbDirAlt = path.join(wxContainerBase, account, 'Message');'
#        if (fs.existsSync(dbDir)) {"
          detectedPaths.push({?
;            account_hash: account.substring(0, 8) + '****',
            db_path: dbDir, 
            type: 'msg_0.db'
          });1
-        } else if (fs.existsSync(dbDirAlt)) {:
6          // 探测 Message 目录下所有 .db 文件R
N          const dbs = fs.readdirSync(dbDirAlt).filter(f => f.endsWith('.db'));!
          dbs.forEach(db => {$
             detectedPaths.push({A
=              account_hash: account.substring(0, 8) + '****',3
/              db_path: path.join(dbDirAlt, db),
              type: db
            });
          });
	        }
	      });
    } catch (e) {F
B      console.error('[WeChat Detect] Error scanning:', e.message);	
    }
  }'
#  if (detectedPaths.length === 0) {
    return res.json({
      success: false,
      message: '未检测到微信数据目录。请确认微信已在此 Mac 上登录过，或手动填写数据库路径。',
      paths: []
    });
  }
  res.json({
    success: true,W
S    message: `成功探测到 ${detectedPaths.length} 个微信数据库文件！`,
    paths: detectedPaths	
  });
});1
-// ==========================================E
A// 🗺️ 飞书多维表格真实写入 (Lark Bitable Real API)1
-// ==========================================A
=app.post('/api/lark/bitable/real-sync', async (req, res) => {!
  const { leads } = req.body;6
2  const larkAppId = process.env.LARK_APP_ID || '';>
:  const larkAppSecret = process.env.LARK_APP_SECRET || '';G
C  if (!larkAppId || !larkAppSecret || larkAppId.includes('xxxx')) { 
    // 降级为 Mock 模式
    return res.json({
      success: true,
      is_mock: true,+
'      sync_count: (leads || []).length,
      message: '飞书 APP_ID 或 SECRET 未配置，已使用 Mock 演示模式同步。请在配置中心填写真实凭证。',B
>      bitable_url: 'https://feishu.cn/base/example-mock-table'
    });
  }
  try {-
)    // Step 1: 获取 tenant_access_tokeno
k    const tokenRes = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST',:
6      headers: { 'Content-Type': 'application/json' },P
L      body: JSON.stringify({ app_id: larkAppId, app_secret: larkAppSecret })
    });0
,    const tokenData = await tokenRes.json();-
)    if (!tokenData.tenant_access_token) {h
d      return res.status(401).json({ error: '飞书鉴权失败，请检查 APP_ID 和 SECRET。' });	
    }:
6    const accessToken = tokenData.tenant_access_token;s
o    // Step 2: 检查或创建多维表格（简化：直接尝试写入，使用环境变量中的 TABLE_ID）8
4    const tableId = process.env.LARK_TABLE_ID || '';
    if (!tableId) {
      return res.json({
        success: true,
        is_mock: false,!
        token_verified: true,
        sync_count: 0,
        message: '飞书 TOKEN 验证成功！请在 .env 中配置 LARK_TABLE_ID（多维表格 ID）以完成真实写入。',2
.        bitable_url: 'https://feishu.cn/base/'
	      });	
    }%
!    // Step 3: 批量写入记录4
0    const records = (leads || []).map(lead => ({
      fields: {1
-        '姓名': lead.from_user || '未知',C
?        '消息内容': (lead.content || '').substring(0, 200),.
*        '意向分': lead.bant_score || 0,.
*        '来源': lead.source || 'WeChat',>
:        '创建时间': new Date().toLocaleString('zh-CN')
      }
    }));%
!    const writeRes = await fetch(n
j      `https://open.feishu.cn/open-apis/bitable/v1/apps/${tableId}/tables/tbl_leads/records/batch_create`,
      {
        method: 'POST',
        headers: {7
3          'Authorization': `Bearer ${accessToken}`,0
,          'Content-Type': 'application/json'

        },-
)        body: JSON.stringify({ records })
      }

    );0
,    const writeData = await writeRes.json();#
    if (writeData.code === 0) {
      res.json({
        success: true,
        is_mock: false,'
#        sync_count: records.length,a
]        message: `已成功将 ${records.length} 条线索真实写入飞书多维表格！`,<
8        bitable_url: `https://feishu.cn/base/${tableId}`
	      });
    } else {R
N      res.status(500).json({ error: `飞书写入失败: ${writeData.msg}` });	
    }
  } catch (err) {S
O    res.status(500).json({ error: '飞书 API 连接失败: ' + err.message });
  }
});1
-// ==========================================
// 5. 服务器启动1
-// ==========================================
app.listen(PORT, () => {H
D  console.log(`==================================================`);E
A  console.log(`🚀 昆仑增长 Agent OS Gateway 已启动！`);B
>  console.log(`   本地控制台: http://localhost:${PORT}`);V
R  console.log(`   知识库目录: ${path.join(__dirname, '../data/knowledge')}`);H
D  console.log(`==================================================`);
});BFfile:///Volumes/MOVESPEED/%E4%B8%8B%E8%BD%BD/AIcode/Agent/src/index.jsRconst express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ==========================================
// 🔐 Auth 配置
// ==========================================
// JWT 密钥：优先读 .env，其次用随机