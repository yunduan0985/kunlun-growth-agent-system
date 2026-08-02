path = "scratch/extracted_js_step_1473_payload.js"
with open(path, 'rb') as f:
    lines = f.readlines()

# Print lines around 1441
for idx in range(1435, 1448):
    if idx < len(lines):
        print(f"Line {idx+1}: {repr(lines[idx])}")
