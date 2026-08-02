import os
import json

edits_dir = "scratch/extracted_edits_current"

print("🔍 Inspecting target paths of edits in current DB...")
for file in os.listdir(edits_dir):
    file_path = os.path.join(edits_dir, file)
    if os.path.isfile(file_path) and file.endswith('.json'):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                data = json.loads(content)
                print(f"👉 File: {file}")
                # Print type or structure
                if isinstance(data, dict):
                    print("   keys:", list(data.keys()))
                    # Print anything that looks like a file path
                    for k, v in data.items():
                        if isinstance(v, str) and ('/' in v or '\\' in v):
                            print(f"   {k}: {v}")
                        elif isinstance(v, dict):
                            for kk, vv in v.items():
                                if isinstance(vv, str) and ('/' in vv or '\\' in vv):
                                    print(f"   {k}.{kk}: {vv}")
                elif isinstance(data, list):
                    print("   List length:", len(data))
        except Exception as e:
            print(f"Error {file}: {e}")
            break
