import os

candidate_dir = "scratch"
print("🔍 Scanning candidate files for complete JS blocks...")

for file in os.listdir(candidate_dir):
    if not file.startswith('clean_index_candidate_'):
        continue
    file_path = os.path.join(candidate_dir, file)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split by the separator we used
        blocks = content.split('\n=====================\n')
        print(f"👉 {file}: has {len(blocks)} blocks")
        
        # Find blocks that contain express and app.listen
        for idx, block in enumerate(blocks):
            if 'const express' in block and 'app.listen' in block:
                is_obfuscated = '_0x' in block or 'controlFlowFlattening' in block
                print(f"   Block {idx}: size={len(block)}, is_obfuscated={is_obfuscated}")
                if not is_obfuscated and len(block) > 30000:
                    # Write to a file
                    out_path = f"scratch/recovered_src_index_{file.replace('.txt','')}_block_{idx}.js"
                    with open(out_path, 'w', encoding='utf-8') as out:
                        out.write(block)
                    print(f"   🌟 Saved valid JS block to {out_path}!")
    except Exception as e:
        print("Err:", e)
