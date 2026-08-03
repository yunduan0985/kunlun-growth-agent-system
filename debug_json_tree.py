import json

with open("/Volumes/MOVESPEED/下载/AIcode/Agent/feishu_window_vars.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for k, v in data.items():
    print(f"Key: {k}, Type: {type(v)}, Length: {len(str(v))}")
    if isinstance(v, str) and len(v) > 1000:
        try:
            parsed = json.loads(v)
            print(f"  -> Successfully parsed JSON string, top keys: {list(parsed.keys()) if isinstance(parsed, dict) else 'List'}")
        except Exception as e:
            print(f"  -> Failed to parse: {e}")

