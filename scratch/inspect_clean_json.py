import json

path = "scratch/clean_json_edits/step_1455_payload.json"
with open(path, 'r', encoding='utf-8') as f:
    obj = json.load(f)

print("Keys:", list(obj.keys()))
if 'ReplacementChunks' in obj:
    print(f"Chunks count: {len(obj['ReplacementChunks'])}")
    for idx, c in enumerate(obj['ReplacementChunks']):
        print(f"Chunk {idx}: size={len(c['ReplacementContent'])}")
elif 'ReplacementContent' in obj:
    print(f"ReplacementContent size: {len(obj['ReplacementContent'])}")
