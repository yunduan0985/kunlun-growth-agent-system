import os
import re

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

print(f"Scanning binary file of size {len(data)}...")

# We scan for printable UTF-8 strings of length >= 10 by finding length-delimited fields
# and try to match the pattern: "line_number: code_line"
def read_varint(data, pos):
    val = 0
    shift = 0
    while pos < len(data):
        b = data[pos]
        val |= (b & 0x7f) << shift
        pos += 1
        if not (b & 0x80):
            break
        shift += 7
    return val, pos

pos = 0
line_map = {}

# Regex to match: optional spaces, digits, colon, space, then code content
line_pattern = re.compile(r'^\s*(\d+):\s*(.*)$')

while pos < len(data):
    b = data[pos]
    if (b & 0x07) == 2:
        try:
            length, next_pos = read_varint(data, pos + 1)
            if length >= 10 and next_pos + length <= len(data):
                str_bytes = data[next_pos:next_pos+length]
                text = str_bytes.decode('utf-8', errors='ignore')
                
                # Check if it matches our pattern
                m = line_pattern.match(text)
                if m:
                    num = int(m.group(1))
                    code_line = m.group(2)
                    
                    # We always keep the one at the largest byte offset (latest step)
                    if num not in line_map or pos > line_map[num][0]:
                        line_map[num] = (pos, code_line)
                        
                pos = next_pos + length - 1
        except Exception:
            pass
    pos += 1

print(f"Extracted {len(line_map)} unique lines from the logs.")

# Sort by line number and write out
out_path = "scratch/reconstructed_index_1135_clean.js"
with open(out_path, 'w', encoding='utf-8') as out:
    for num in sorted(line_map.keys()):
        out.write(line_map[num][1] + '\n')

print(f"Saved clean reconstructed JS to {out_path}")
