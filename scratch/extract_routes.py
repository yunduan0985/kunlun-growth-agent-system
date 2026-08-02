import os

chunk_dir = "scratch/extracted_chunks_older"
out_dir = "scratch/route_codes"
os.makedirs(out_dir, exist_ok=True)

routes = [
    '/api/auth/license/status',
    '/api/auth/machine-id',
    '/api/auth/check-init',
    '/api/auth/me',
    '/api/auth/license/activate',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/change-password',
    '/api/system/agents/status',
    '/api/system/chat/agent',
    '/api/system/knowledge/upload',
    '/api/system/knowledge/list',
    '/api/system/knowledge/save',
    '/api/system/config/knowledge',
    '/api/system/config',
    '/api/system/token/usage',
    '/api/system/token/reset',
    '/api/system/llm/providers',
    '/api/system/llm/test-ping',
    '/api/system/permissions',
    '/api/wechat/detect-path',
    '/api/wechat/openclaw/messages',
    '/api/wechat/db/query',
    '/api/system/task/status',
    '/api/lark/bitable/sync',
    '/api/lark/bitable/real-sync',
    '/api/lark/wiki/sync',
    '/api/content/risk/anti-ai-scan'
]

print("🔍 Matching routes in older chunks...")
for route in routes:
    safe_name = route.replace('/', '_').strip('_')
    print(f"👉 Route: {route}")
    matches = []
    
    # Check older chunks
    for file in os.listdir(chunk_dir):
        file_path = os.path.join(chunk_dir, file)
        if os.path.isfile(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if route in content:
                        print(f"   Matched in {file} (len={len(content)})")
                        matches.append((file, content))
            except Exception:
                pass
                
    if matches:
        # Save the largest match
        matches.sort(key=lambda x: len(x[1]), reverse=True)
        best_file, best_content = matches[0]
        out_path = os.path.join(out_dir, f"{safe_name}.js")
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(best_content)
        print(f"   Saved best match ({best_file}) to {out_path}")
