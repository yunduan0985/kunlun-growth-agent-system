import os

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

# Let's extract all UTF-8 strings by reading length-delimited fields manually
# Protobuf wire format key: (field_number << 3) | wire_type
# Wire type 2 is length-delimited (string, bytes, embedded message)
# So tag is any byte ending in 2 in binary: b & 0x07 == 2
# Let's scan for any tag, then try to read varint length, and extract string if it decodes to valid printable UTF-8.
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
strings = []

while pos < len(data):
    b = data[pos]
    if (b & 0x07) == 2:
        # Potential wire type 2 field
        # field_num = b >> 3
        try:
            length, next_pos = read_varint(data, pos + 1)
            if length >= 10 and next_pos + length <= len(data):
                str_bytes = data[next_pos:next_pos+length]
                # Check printable UTF-8
                try:
                    text = str_bytes.decode('utf-8')
                    # No control chars
                    control_chars = sum(1 for c in text if ord(c) < 32 and c not in '\n\r\t')
                    if control_chars == 0:
                        strings.append((pos, text))
                        pos = next_pos + length - 1
                except UnicodeDecodeError:
                    pass
        except Exception:
            pass
    pos += 1

print(f"Extracted {len(strings)} UTF-8 strings from binary.")
# Sort by position
strings.sort(key=lambda x: x[0])

# Print first 50 extracted strings
for i in range(min(50, len(strings))):
    print(f"{i}: {repr(strings[i][1][:150])}")
