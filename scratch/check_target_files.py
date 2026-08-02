import json

log_path = "/Users/dasean/.gemini/antigravity/brain/339f5518-9980-4e89-a848-d3d6b7f639c9/.system_generated/logs/transcript_full.jsonl"
targets = set()

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            tool_calls = step.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                if 'replace_file_content' in name or 'multi_replace_file_content' in name:
                    targets.add(args.get('TargetFile'))
        except Exception:
            pass

print("🔍 Unique target files in 339f5518-9980-4e89-a848-d3d6b7f639c9:")
for target in targets:
    print(target)
