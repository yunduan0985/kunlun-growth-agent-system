import os
import json

brain_dir = "/Users/dasean/.gemini/antigravity/brain"

print("🔍 Scanning all transcripts for any view_file of index.js...")
for conv in os.listdir(brain_dir):
    conv_path = os.path.join(brain_dir, conv)
    log_path = os.path.join(conv_path, ".system_generated/logs/transcript_full.jsonl")
    if os.path.isfile(log_path):
        try:
            with open(log_path, 'r', encoding='utf-8') as f:
                for line in f:
                    step = json.loads(line)
                    tool_calls = step.get('tool_calls', [])
                    for call in tool_calls:
                        name = call.get('name')
                        args = call.get('args', {})
                        if name == 'view_file' and 'index.js' in str(args.get('AbsolutePath')):
                            print(f"👉 Conv {conv} Step {step.get('step_index')}: {args.get('StartLine')}-{args.get('EndLine')} Target={args.get('AbsolutePath')}")
        except Exception as e:
            pass
