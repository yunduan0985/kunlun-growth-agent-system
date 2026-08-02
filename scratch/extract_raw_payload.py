import os

edits_dir = "scratch/extracted_edits_current"

# We want to scan the binary payloads for the longest contiguous string containing 'const express' and 'app.listen'
for file in os.listdir(edits_dir):
    if not file.endswith('.json'):
        continue
    file_path = os.path.join(edits_dir, file)
    try:
        with open(file_path, 'rb') as f:
            data = f.read()
            
        # Find start index of const express
        start_idx = data.find(b"const express")
        if start_idx != -1:
            # Let's find the end. Usually the file ends with app.listen(...) and some console logs
            # We can find 'app.listen' and search for the closing brackets of the listen call
            listen_idx = data.find(b"app.listen", start_idx)
            if listen_idx != -1:
                # Let's search for the end of the file. It should end with '});' or something similar.
                # Let's extract from start_idx to listen_idx + 1000 and see
                js_slice = data[start_idx:listen_idx + 1000]
                
                # Check how much of it is printable UTF-8 (including Chinese)
                # UTF-8 characters are either ASCII (0-127) or multi-byte (with high bits set)
                # We can try to decode it. If it decodes successfully, we can find where it starts failing.
                decoded = ""
                try:
                    decoded = js_slice.decode('utf-8')
                except UnicodeDecodeError as ude:
                    # Decode up to the error index
                    decoded = js_slice[:ude.start].decode('utf-8', errors='ignore')
                
                if len(decoded) > 10000:
                    print(f"🌟 Found contiguous JS block in {file} (decoded size={len(decoded)})")
                    out_path = f"scratch/extracted_js_{file.replace('.json', '')}.js"
                    with open(out_path, 'w', encoding='utf-8') as out:
                        out.write(decoded)
                    print(f"   Saved to {out_path}")
    except Exception as e:
        print("Err:", e)
