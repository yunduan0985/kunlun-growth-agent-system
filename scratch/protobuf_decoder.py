import os

def decode_protobuf(data):
    """
    Decodes protobuf length-delimited messages recursively.
    We look for fields:
    - Field 2 (wire type 0, varint): line number
    - Field 3 (wire type 2, length-delimited): content
    """
    pos = 0
    limit = len(data)
    results = []
    
    def read_varint(p):
        val = 0
        shift = 0
        while p < limit:
            b = data[p]
            val |= (b & 0x7f) << shift
            p += 1
            if not (b & 0x80):
                break
            shift += 7
        return val, p

    # Temporary state for the current submessage
    curr_line = None
    curr_content = None

    while pos < limit:
        try:
            key, pos = read_varint(pos)
            wire_type = key & 0x07
            field_num = key >> 3
            
            if wire_type == 0:
                val, pos = read_varint(pos)
                if field_num == 2:
                    curr_line = val
            elif wire_type == 2:
                length, pos = read_varint(pos)
                val_bytes = data[pos:pos+length]
                pos += length
                
                if field_num == 3:
                    try:
                        curr_content = val_bytes.decode('utf-8')
                    except UnicodeDecodeError:
                        pass
                else:
                    # It might be a submessage! Let's decode it recursively.
                    sub_results = decode_protobuf(val_bytes)
                    results.extend(sub_results)
            elif wire_type == 1:
                pos += 8
            elif wire_type == 5:
                pos += 4
            else:
                # Group wire types (deprecated)
                pass
                
            # If we got both line number and content, save it!
            if curr_line is not None and curr_content is not None:
                results.append((curr_line, curr_content))
                curr_line = None
                curr_content = None
        except Exception:
            # If parsing fails, advance pos by 1 to recover
            pos += 1
            
    return results

# Let's run it on step_1473_payload.json
path = "scratch/extracted_edits_current/step_1473_payload.json"
if os.path.exists(path):
    with open(path, 'rb') as f:
        data = f.read()
    
    lines = decode_protobuf(data)
    print(f"Decoded {len(lines)} lines from step_1473_payload.json")
    
    # Sort and remove duplicates
    unique_lines = {}
    for num, content in lines:
        if num not in unique_lines:
            unique_lines[num] = content
            
    print(f"Unique lines: {len(unique_lines)}")
    
    if unique_lines:
        out_path = "scratch/decoded_index_1473_clean.js"
        with open(out_path, 'w', encoding='utf-8') as out:
            for num in sorted(unique_lines.keys()):
                out.write(unique_lines[num] + '\n')
        print(f"Saved clean decoded JS to {out_path}")
