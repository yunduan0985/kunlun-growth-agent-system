import os

decoded_dir = "scratch/decoded_text"
print("🔍 Searching recovered text files for index.js edits...")

for file in os.listdir(decoded_dir):
    file_path = os.path.join(decoded_dir, file)
    if os.path.isfile(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'src/index.js' in content or 'app.post(\'/api/' in content or 'app.get(\'/api/' in content:
                    print(f"🌟 Found match in {file} (len={len(content)})")
                    # Save a copy with a descriptive name
                    out_path = f"scratch/recovered_code_{file}"
                    with open(out_path, 'w', encoding='utf-8') as out:
                        out.write(content)
                    print(f"   Saved to {out_path}")
        except Exception as e:
            pass
