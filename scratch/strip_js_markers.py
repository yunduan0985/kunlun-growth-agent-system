import os

path = "scratch/extracted_js_step_1473_payload.js"
with open(path, 'rb') as f:
    lines = f.readlines()

clean_lines = []

for i, line in enumerate(lines):
    l_strip = line.rstrip(b'\r\n')
    
    # Search for \x10 starting from index 1 to ignore the prefix byte at index 0!
    idx = l_strip.find(b'\x10', 1)
    if idx != -1:
        if i == 0:
            clean_content = l_strip[0:idx]
        else:
            clean_content = l_strip[1:idx]
        clean_lines.append(clean_content)
    elif l_strip == b'':
        clean_lines.append(b'')
    else:
        if i == 0:
            clean_content = l_strip
        else:
            clean_content = l_strip[1:] if len(l_strip) > 0 else b''
        clean_lines.append(clean_content)

# Save the cleaned lines
out_path = "scratch/cleaned_index_1473.js"
with open(out_path, 'wb') as out:
    for line in clean_lines:
        out.write(line + b'\n')

print(f"Total lines processed: {len(lines)}")
print(f"Saved cleaned index.js to {out_path}")
