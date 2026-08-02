import os

chunk_dir = "scratch/extracted_chunks_older"
print("🔍 Checking older chunks content...")

keywords = ['req, res', 'app.post', 'app.get', 'jwt', 'bcrypt', 'sqlite', 'Lark', 'anti-ai', 'WeChatMsg']

for file in os.listdir(chunk_dir):
    file_path = os.path.join(chunk_dir, file)
    if os.path.isfile(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = [kw for kw in keywords if kw in content]
                if matches:
                    print(f"👉 {file} (len={len(content)}): matches {matches}")
        except Exception:
            pass
