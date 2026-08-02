import json

path = "scratch/step_1971_decoded.json"
with open(path, 'r', encoding='utf-8') as f:
    obj = json.load(f)

print("Decoded Keys:", list(obj.keys()))
# Check if it has a 'content' or 'result' field
for k, v in obj.items():
    if isinstance(v, str):
        print(f"Key: {k} (str len={len(v)})")
    elif isinstance(v, dict):
        print(f"Key: {k} (dict keys={list(v.keys())})")
        for kk, vv in v.items():
            if isinstance(vv, str):
                print(f"   {kk} (str len={len(vv)})")
            elif isinstance(vv, list):
                print(f"   {kk} (list len={len(vv)})")
    elif isinstance(v, list):
        print(f"Key: {k} (list len={len(v)})")
