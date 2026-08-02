import json

path = "scratch/extracted_views/step_1971_view_payload.txt"
with open(path, 'rb') as f:
    data = f.read()

text = data.decode('utf-8', errors='ignore')
start_json = text.find('{"')
if start_json != -1:
    end_json = text.rfind('}')
    if end_json != -1:
        json_str = text[start_json:end_json+1]
        try:
            obj = json.loads(json_str)
            print("✅ Successfully parsed JSON from step 1971 view payload!")
            print("Keys:", list(obj.keys()))
            # Save it
            with open("scratch/step_1971_decoded.json", "w", encoding="utf-8") as out:
                json.dump(obj, out, indent=2, ensure_ascii=False)
            print("Saved to scratch/step_1971_decoded.json")
        except Exception as e:
            # Sliced check
            success = False
            for i in range(len(json_str), 0, -1):
                if json_str[i-1] == '}':
                    try:
                        obj = json.loads(json_str[:i])
                        print("✅ Sliced parse success!")
                        with open("scratch/step_1971_decoded.json", "w", encoding="utf-8") as out:
                            json.dump(obj, out, indent=2, ensure_ascii=False)
                        print("Saved sliced to scratch/step_1971_decoded.json")
                        success = True
                        break
                    except Exception:
                        pass
            if not success:
                print("❌ Sliced parse failed:", e)
else:
    print("No JSON start found.")
