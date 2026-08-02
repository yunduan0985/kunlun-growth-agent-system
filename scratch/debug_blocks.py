import os

candidate_dir = "scratch"

for file in os.listdir(candidate_dir):
    if not file.startswith('clean_index_candidate_'):
        continue
    file_path = os.path.join(candidate_dir, file)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        blocks = content.split('\n=====================\n')
        for idx, block in enumerate(blocks):
            if 'app.listen' in block:
                print(f"👉 File: {file} | Block {idx} | size={len(block)}")
                # Print first 200 chars of this block
                print("   Snippet:", repr(block[:200]))
    except Exception as e:
        print("Err:", e)
