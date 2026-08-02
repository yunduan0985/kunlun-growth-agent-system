import json

log_path = "/Users/dasean/.gemini/antigravity/brain/339f5518-9980-4e89-a848-d3d6b7f639c9/.system_generated/logs/transcript_full.jsonl"

print("🔍 Scanning for index.js in previous conversation logs...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            tool_calls = step.get('tool_calls', [])
            for call in tool_calls:
                name = call.get('name')
                args = call.get('args', {})
                if 'index.js' in str(args):
                    print(f"👉 Step {step.get('step_index')}: {name} args={args}")
            
            # Check system/tool responses
            content = step.get('content', '')
            if 'File Path:' in content and 'index.js' in content:
                print(f"👉 Response Step {step.get('step_index')}: length={len(content)}")
        except Exception as e:
            pass
