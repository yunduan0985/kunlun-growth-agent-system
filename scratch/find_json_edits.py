import os
import json

json_dir = "scratch/clean_json_edits"
print("🔍 Scanning clean JSON edits for index.js modifications...")

for file in sorted(os.listdir(json_dir), key=lambda x: int(x.split('_')[1])):
    file_path = os.path.join(json_dir, file)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            obj = json.load(f)
            
        target = obj.get('TargetFile', '')
        if 'index.js' in target:
            step = file.split('_')[1]
            desc = obj.get('Description', 'No description')
            instr = obj.get('Instruction', 'No instruction')
            
            # Print edit overview
            print(f"🌟 Step {step} target={target}")
            print(f"   Desc: {desc}")
            print(f"   Inst: {instr}")
            
            # Check if it has ReplacementContent
            if 'ReplacementContent' in obj:
                print(f"   Has ReplacementContent (len={len(obj['ReplacementContent'])})")
            if 'ReplacementChunks' in obj:
                print(f"   Has ReplacementChunks (count={len(obj['ReplacementChunks'])})")
    except Exception as e:
        pass
