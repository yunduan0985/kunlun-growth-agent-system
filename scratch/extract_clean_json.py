import os
import json

edits_dir = "scratch/extracted_edits_current"
out_dir = "scratch/clean_json_edits"
os.makedirs(out_dir, exist_ok=True)

print("🔍 Extracting clean JSON from binary database payloads...")
for file in os.listdir(edits_dir):
    if not file.endswith('.json'):
        continue
    file_path = os.path.join(edits_dir, file)
    try:
        with open(file_path, 'rb') as f:
            data = f.read()
            
        text = data.decode('utf-8', errors='ignore')
        start_json = text.find('{"')
        if start_json != -1:
            # Let's extract from start_json to the end of the JSON object
            # We can find the last '}'
            end_json = text.rfind('}')
            if end_json != -1:
                json_str = text[start_json:end_json+1]
                # Validate JSON
                try:
                    obj = json.loads(json_str)
                    out_path = os.path.join(out_dir, file)
                    with open(out_path, 'w', encoding='utf-8') as out:
                        json.dump(obj, out, indent=2, ensure_ascii=False)
                    print(f"✅ Extracted valid JSON from {file} -> {out_path}")
                except json.JSONDecodeError as jde:
                    # Let's try to slice progressively if it failed due to trailing binary garbage
                    success = False
                    for i in range(len(json_str), 0, -1):
                        if json_str[i-1] == '}':
                            try:
                                obj = json.loads(json_str[:i])
                                out_path = os.path.join(out_dir, file)
                                with open(out_path, 'w', encoding='utf-8') as out:
                                    json.dump(obj, out, indent=2, ensure_ascii=False)
                                print(f"✅ Extracted valid sliced JSON from {file} -> {out_path}")
                                success = True
                                break
                            except json.JSONDecodeError:
                                pass
                    if not success:
                        print(f"❌ Failed to parse JSON from {file}: {jde}")
    except Exception as e:
        print(f"Err {file}: {e}")
