import json

log_path = "/Users/dasean/.gemini/antigravity/brain/2fd39c36-f2f1-4a9c-b0fe-7e41d7e46122/.system_generated/logs/transcript_full.jsonl"

print("🔍 Scanning older transcript for write_to_file index.js...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            tool_calls = step.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                if name == 'write_to_file' and 'index.js' in str(args.get('TargetFile')):
                    print(f"🌟 Found write_to_file Target={args.get('TargetFile')} at Step {step.get('step_index')}")
                    # Write to a recovery file
                    with open("scratch/recovered_index_baseline.js", "w", encoding="utf-8") as out:
                        out.write(args['CodeContent'])
                    print("   Successfully saved baseline code to scratch/recovered_index_baseline.js!")
        except Exception as e:
            pass
