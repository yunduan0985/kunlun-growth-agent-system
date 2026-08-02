import os

scratch_dir = "scratch"
print("🔍 Checking which extracted_js_ files are clean...")

for file in sorted(os.listdir(scratch_dir)):
    if not file.startswith('extracted_js_') or not file.endswith('.js'):
        continue
    file_path = os.path.join(scratch_dir, file)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        is_obfuscated = '_0x' in content or 'controlFlowFlattening' in content
        print(f"👉 {file} (size={len(content)}): is_obfuscated={is_obfuscated}")
        if not is_obfuscated:
            # Let's count how many lines it has
            lines = content.count('\n') + 1
            print(f"   Lines: {lines}")
            # Check if it has the coze chat API
            has_coze = '/api/bridge/coze/chat' in content
            print(f"   Has Coze: {has_coze}")
            # Check if it has workbuddy notify
            has_workbuddy = '/api/bridge/workbuddy/notify' in content
            print(f"   Has Workbuddy: {has_workbuddy}")
    except Exception as e:
        print("Err:", e)
