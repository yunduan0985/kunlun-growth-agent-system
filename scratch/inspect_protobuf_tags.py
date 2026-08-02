import os

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

# Let's count potential wire keys
# A wire key is at a position where we can parse a varint length, and then have a printable UTF-8 string of that length.
# Let's write a script to find which tag yields the most valid UTF-8 strings of length >= 10!
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

tag_counts = {}

for tag in [0x0a, 0x12, 0x1a, 0x22, 0x2a, 0x32, 0x3a, 0x42, 0x4a, 0x52, 0x5a]:
    pos = 0
    count = 0
    while pos < len(data):
        if data[pos] == tag:
            try:
                length, next_pos = read_varint(data, pos + 1)
                if length > 10 and next_pos + length <= len(data):
                    str_bytes = data[next_pos:next_pos+length]
                    str_bytes.decode('utf-8')
                    count += 1
                    pos = next_pos + length - 1
            except Exception:
                pass
        pos += 1
    tag_counts[tag] = count

print("Tag frequencies yielding valid UTF-8 strings:")
for tag, count in tag_counts.items():
    print(f"Tag 0x{tag:02x}: {count}")
