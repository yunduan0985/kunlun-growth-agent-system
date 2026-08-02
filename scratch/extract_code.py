import json

log_path = "/Users/dasean/.gemini/antigravity/brain/7a3eb2cb-a8a5-41a0-8539-02f35b41f1bd/.system_generated/logs/transcript_full.jsonl"

print("🔍 Scanning CURRENT transcript for index.js...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            tool_calls = step.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                if 'index.js' in str(args):
                    print(f"👉 Step {step.get('step_index')}: {name} args={list(args.keys())}")
                    if 'TargetFile' in args:
                        print(f"   Target: {args['TargetFile']}")
        except Exception as e:
            pass
