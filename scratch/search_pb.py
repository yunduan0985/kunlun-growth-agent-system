import os

db_dir = "/Users/dasean/.gemini/antigravity/conversations"
search_str = b"/Volumes/MOVESPEED/\xe4\xb8\x8b\xe8\xbd\xbd/AIcode/Agent/src/index.js"  # URL-encoded or UTF-8

print("🔍 Scanning all files in conversations directory for project path...")
for file in os.listdir(db_dir):
    file_path = os.path.join(db_dir, file)
    if os.path.isfile(file_path):
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
                if search_str in content or b"/Volumes/MOVESPEED/" in content:
                    print(f"🌟 Found match in file: {file} (size={len(content)})")
        except Exception as e:
            print(f"Error reading {file}: {e}")
