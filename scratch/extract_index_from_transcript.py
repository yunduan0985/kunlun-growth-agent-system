import re
import json

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

text = data.decode('utf-8', errors='ignore')

# The file contains multiple JSON lines mixed with binary protobuf tags.
# Let's find all occurrences of {"step_index":...} by searching for {"step_index"
# and finding the matching closing brace.
pos = 0
steps = []

while True:
    pos = text.find('{"step_index"', pos)
    if pos == -1:
        break
    
    # Try to find a valid JSON object starting at pos
    success = False
    for i in range(pos + 15, len(text)):
        if text[i] == '}':
            # Try parsing
            try:
                candidate = text[pos:i+1]
                obj = json.loads(candidate)
                steps.append(obj)
                pos = i + 1
                success = True
                break
            except Exception:
                pass
    if not success:
        pos += 1

print(f"Extracted {len(steps)} valid JSON steps from transcript.")

# Let's check which steps viewed index.js
for step in steps:
    step_idx = step.get('step_index')
    tool_calls = step.get('tool_calls', [])
    for call in tool_calls:
        name = call.get('name')
        args = call.get('args', {})
        if 'view_file' in name and 'index.js' in str(args.get('AbsolutePath')):
            print(f"🌟 Step {step_idx}: view_file args={args}")
            
    # Also check if it has file content response
    content = step.get('content', '')
    if 'Total Lines:' in content and 'index.js' in content:
        print(f"🌟 Response Step {step_idx}: length={len(content)}")
        # Save response content to a file
        out_path = f"scratch/view_response_step_{step_idx}.txt"
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(content)
        print(f"   Saved response content to {out_path}")
