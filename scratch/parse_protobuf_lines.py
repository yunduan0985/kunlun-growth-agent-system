import os

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

print(f"File length: {len(data)}")

# Let's parse the protobuf fields
# We scan for 0x1a tag (field number 3, string wire type 2)
# Protobuf wire formats: key = (field_number << 3) | wire_type
# If field_number = 3, wire_type = 2, then key = (3 << 3) | 2 = 24 + 2 = 26 (0x1a)
# If field_number = 1, wire_type = 2, then key = 10 (0x0a)
# Let's write a robust parser that parses varints
def read_varint(data, pos):
    val = 0
    shift = 0
    while True:
        b = data[pos]
        val |= (b & 0x7f) << shift
        pos += 1
        if not (b & 0x80):
            break
        shift += 7
    return val, pos

pos = 0
lines = []

# Scan for 0x1a key tag. When found, we try to parse it as a string field.
while pos < len(data):
    if data[pos] == 0x1a:
        # Field 3 string
        try:
            length, next_pos = read_varint(data, pos + 1)
            if next_pos + length <= len(data):
                str_bytes = data[next_pos:next_pos+length]
                # Check if it looks like a valid JS line (printable ASCII/UTF-8)
                try:
                    line_text = str_bytes.decode('utf-8')
                    # Standard check: lines should not contain too many control characters
                    control_chars = sum(1 for c in line_text if ord(c) < 32 and c not in '\n\r\t')
                    if control_chars == 0 and len(line_text) > 0:
                        lines.append((next_pos, line_text))
                except UnicodeDecodeError:
                    pass
        except Exception:
            pass
    pos += 1

print(f"Extracted {len(lines)} raw lines.")

# Let's sort the extracted lines by their position in the file to preserve order
lines.sort(key=lambda x: x[0])

# Write out the reconstructed code
out_path = "scratch/reconstructed_index_1135.js"
with open(out_path, 'w', encoding='utf-8') as out:
    for _, line in lines:
        # Check if the line has line number prefix from the view_file format
        # e.g., "123: const express = ..."
        # If so, we strip it!
        # The line is in the format "123: const express = ..."
        parts = line.split(':', 1)
        if len(parts) == 2 and parts[0].strip().isdigit():
            # Yes, it has a line number prefix! Strip it.
            clean_line = parts[1]
            if clean_line.startswith(' '):
                clean_line = clean_line[1:]
            out.write(clean_line + '\n')
        else:
            out.write(line + '\n')

print(f"Reconstructed index.js written to {out_path}")
