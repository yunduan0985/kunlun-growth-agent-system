import os

decoded_dir = "scratch/decoded_text"
print("🔍 Searching for unobfuscated index.js versions...")

for file in os.listdir(decoded_dir):
    if not file.startswith('step_') or not file.endswith('_payload.txt'):
        continue
    file_path = os.path.join(decoded_dir, file)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            if 'const express' in content and 'app.listen' in content:
                # Check if it has obfuscation signatures
                is_obfuscated = '_0x' in content or 'controlFlowFlattening' in content
                print(f"👉 {file} (len={len(content)}): has express & listen, is_obfuscated={is_obfuscated}")
                if not is_obfuscated:
                    # Save a copy as a potential clean candidate
                    out_path = f"scratch/clean_index_candidate_{file}"
                    with open(out_path, 'w', encoding='utf-8') as out:
                        out.write(content)
                    print(f"   Saved clean candidate to {out_path}")
    except Exception:
        pass
