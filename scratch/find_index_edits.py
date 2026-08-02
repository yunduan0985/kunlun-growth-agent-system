import os

edits_dir = "scratch/extracted_edits_current"
print("🔍 Searching for steps editing index.js in current database payloads...")

for file in os.listdir(edits_dir):
    file_path = os.path.join(edits_dir, file)
    if os.path.isfile(file_path):
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
                # Check for path patterns or javascript snippets
                if b"index.js" in content or b"index.html" in content:
                    # Let's see what keywords it has
                    found_kw = []
                    if b"index.js" in content: found_kw.append("index.js")
                    if b"index.html" in content: found_kw.append("index.html")
                    if b"wechat" in content.lower(): found_kw.append("wechat")
                    if b"lark" in content.lower(): found_kw.append("lark")
                    if b"obfuscator" in content.lower(): found_kw.append("obfuscator")
                    
                    print(f"👉 {file} (size={len(content)}): found {found_kw}")
                    # Save a copy to examine
                    out_name = f"scratch/inspect_{file}"
                    with open(out_name, 'wb') as out:
                        out.write(content)
        except Exception as e:
            print(f"Error {file}: {e}")
