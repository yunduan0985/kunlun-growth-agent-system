import os

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

print(f"Scanning binary file of size {len(data)} using Protobuf struct parser...")

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

while pos < len(data):
    # Scan for field 2 varint key tag: 0x10
    if data[pos] == 0x10:
        try:
            line_num, next_pos = read_varint(data, pos + 1)
            # Check if the next tag is 0x1a (field 3 string tag key)
            if next_pos < len(data) and data[next_pos] == 0x1a:
                length, str_pos = read_varint(data, next_pos + 1)
                if str_pos + length <= len(data):
                    str_bytes = data[str_pos:str_pos+length]
                    try:
                        line_text = str_bytes.decode('utf-8')
                        # Check that line number is reasonable (e.g. 1 to 5000)
                        if 1 <= line_num <= 5000:
                            # We always keep the latest one (largest file offset)
                            if line_num not in line_map or pos > line_map[line_num][0]:
                                line_map[line_num] = (pos, line_text)
                    except UnicodeDecodeError:
                        pass
        except Exception:
            pass
    pos += 1

print(f"Reconstructed {len(line_map)} unique lines.")

if line_map:
    # Sort and write out
    out_path = "scratch/reconstructed_index_1135_clean_proto.js"
    with open(out_path, 'w', encoding='utf-8') as out:
        for num in sorted(line_map.keys()):
            out.write(line_map[num][1] + '\n')
    print(f"Saved to {out_path}")
else:
    print("❌ No lines found matching structure.")
