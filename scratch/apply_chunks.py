import json

# Load base file
base_path = "scratch/cleaned_index_1473_truncated.js"
with open(base_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Load chunks
chunks_path = "scratch/clean_json_edits/step_1569_payload.json"
with open(chunks_path, 'r', encoding='utf-8') as f:
    chunks_data = json.load(f)
    
chunks = chunks_data['ReplacementChunks']

print(f"Loaded base file size: {len(code)}")
print(f"Applying {len(chunks)} chunks...")

# Apply Chunk 0
c0 = chunks[0]
target0 = c0['TargetContent'].replace('\r\n', '\n')
rep0 = c0['ReplacementContent'].replace('\r\n', '\n')
if target0 in code:
    code = code.replace(target0, rep0)
    print("✅ Chunk 0 applied successfully!")
else:
    print("❌ Chunk 0 failed!")

# Apply Chunk 1 directly by defining target block explicitly to tolerate whitespace
target1 = """  // 1. 生成物理 .env 文件正文
  const envContent = `# 昆仑增长多智能体系统本地配置文件 (通过控制台热更新)
PORT=8888
CLAUDE_API_KEY=${config.CLAUDE_API_KEY || ''}
TIANYANCHA_TOKEN=${config.TIANYANCHA_TOKEN || ''}
WECHAT_DB_PATH=${config.WECHAT_DB_PATH || ''}
LARK_APP_ID=${config.LARK_APP_ID || ''}
LARK_APP_SECRET=${config.LARK_APP_SECRET || ''}
LARK_CLI_PATH=${config.LARK_CLI_PATH || 'lark'}
OPENCLAW_API_URL=${config.OPENCLAW_API_URL || 'http://localhost:18000'}
OPENCLAW_TOKEN=${config.OPENCLAW_TOKEN || ''}
WHATSAPP_API_URL=${config.WHATSAPP_API_URL || 'http://localhost:19000'}
TWITTER_API_TOKEN=${config.TWITTER_API_TOKEN || ''}
`;
  try {
    // 2. 物理写入本地文件
    fs.writeFileSync(envPath, envContent, 'utf-8');
    
    // 3. 热更新内存环境变量，使下次 API 连通直接生效，无需重启进程
    process.env.CLAUDE_API_KEY = config.CLAUDE_API_KEY;
    process.env.TIANYANCHA_TOKEN = config.TIANYANCHA_TOKEN;
    process.env.WECHAT_DB_PATH = config.WECHAT_DB_PATH;
    process.env.LARK_APP_ID = config.LARK_APP_ID;
    process.env.LARK_APP_SECRET = config.LARK_APP_SECRET;
    process.env.LARK_CLI_PATH = config.LARK_CLI_PATH;
    process.env.OPENCLAW_API_URL = config.OPENCLAW_API_URL;
    process.env.OPENCLAW_TOKEN = config.OPENCLAW_TOKEN;
    process.env.WHATSAPP_API_URL = config.WHATSAPP_API_URL;
    process.env.TWITTER_API_TOKEN = config.TWITTER_API_TOKEN;
    console.log(`✅ [Config Service] Successfully hot-saved new environmental settings.`);
    res.json({
      success: true,
      message: "本地环境变量配置已成功物理保存并热更新生效。"
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to write .env file: " + err.message });
  }
});"""

rep1 = """  // 1. 生成物理 .env 文件正文
  const envContent = `# 昆仑增长多智能体系统本地配置文件 (通过控制台热更新)
PORT=8888
CLAUDE_API_KEY=${config.CLAUDE_API_KEY || ''}
TIANYANCHA_TOKEN=${config.TIANYANCHA_TOKEN || ''}
WECHAT_DB_PATH=${config.WECHAT_DB_PATH || ''}
LARK_APP_ID=${config.LARK_APP_ID || ''}
LARK_APP_SECRET=${config.LARK_APP_SECRET || ''}
LARK_CLI_PATH=${config.LARK_CLI_PATH || 'lark'}
OPENCLAW_API_URL=${config.OPENCLAW_API_URL || 'http://localhost:18000'}
OPENCLAW_TOKEN=${config.OPENCLAW_TOKEN || ''}
WHATSAPP_API_URL=${config.WHATSAPP_API_URL || 'http://localhost:19000'}
TWITTER_API_TOKEN=${config.TWITTER_API_TOKEN || ''}
COZE_API_KEY=${config.COZE_API_KEY || ''}
COZE_BOT_ID=${config.COZE_BOT_ID || ''}
WORKBUDDY_WEBHOOK=${config.WORKBUDDY_WEBHOOK || ''}
`;

  try {
    // 2. 物理写入本地文件
    fs.writeFileSync(envPath, envContent, 'utf-8');
    
    // 3. 热更新内存环境变量，使下次 API 连通直接生效，无需重启进程
    process.env.CLAUDE_API_KEY = config.CLAUDE_API_KEY;
    process.env.TIANYANCHA_TOKEN = config.TIANYANCHA_TOKEN;
    process.env.WECHAT_DB_PATH = config.WECHAT_DB_PATH;
    process.env.LARK_APP_ID = config.LARK_APP_ID;
    process.env.LARK_APP_SECRET = config.LARK_APP_SECRET;
    process.env.LARK_CLI_PATH = config.LARK_CLI_PATH;
    process.env.OPENCLAW_API_URL = config.OPENCLAW_API_URL;
    process.env.OPENCLAW_TOKEN = config.OPENCLAW_TOKEN;
    process.env.WHATSAPP_API_URL = config.WHATSAPP_API_URL;
    process.env.TWITTER_API_TOKEN = config.TWITTER_API_TOKEN;
    process.env.COZE_API_KEY = config.COZE_API_KEY;
    process.env.COZE_BOT_ID = config.COZE_BOT_ID;
    process.env.WORKBUDDY_WEBHOOK = config.WORKBUDDY_WEBHOOK;

    console.log(`✅ [Config Service] Successfully hot-saved new environmental settings.`);
    res.json({
      success: true,
      message: "本地环境变量配置已成功物理保存并热更新生效。"
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to write .env file: " + err.message });
  }
});"""

if target1 in code:
    code = code.replace(target1, rep1)
    print("✅ Chunk 1 applied successfully!")
else:
    # Let's try to match with normalized whitespaces/newlines
    target1_norm = target1.replace('\r\n', '\n').strip()
    code_norm = code.replace('\r\n', '\n')
    if target1_norm in code_norm:
        code_norm = code_norm.replace(target1_norm, rep1)
        code = code_norm
        print("✅ Chunk 1 applied successfully via normalization!")
    else:
        print("❌ Chunk 1 failed!")

# Apply Chunk 2
c2 = chunks[2]
target2 = c2['TargetContent'].replace('\r\n', '\n')
rep2 = c2['ReplacementContent'].replace('\r\n', '\n')
if target2 in code:
    code = code.replace(target2, rep2)
    print("✅ Chunk 2 applied successfully!")
else:
    # Normalized search for chunk 2
    target2_norm = target2.strip()
    code_norm = code.replace('\r\n', '\n')
    if target2_norm in code_norm:
        code_norm = code_norm.replace(target2_norm, rep2)
        code = code_norm
        print("✅ Chunk 2 applied successfully via normalization!")
    else:
        print("❌ Chunk 2 failed!")

# Save the final recovered file
out_path = "scratch/recovered_index_final.js"
with open(out_path, 'w', encoding='utf-8') as out:
    out.write(code)
print(f"Saved final recovered index.js to {out_path} (size={len(code)})")
