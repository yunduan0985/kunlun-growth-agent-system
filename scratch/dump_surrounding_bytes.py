import os

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

idx = data.find(b"CLAUDE_API_KEY")
if idx != -1:
    print("Found CLAUDE_API_KEY at", idx)
    # Print 30 bytes before and 30 bytes after as hex and printable characters
    before = data[max(0, idx-30):idx]
    after = data[idx:idx+80]
    after_residue = data[idx+80:idx+110]
    
    print("Before (hex):", before.hex())
    print("Before (str):", repr(before.decode('utf-8', errors='ignore')))
    print("After (hex):", after.hex())
    print("After (str):", repr(after.decode('utf-8', errors='ignore')))
    print("After Residue (hex):", after_residue.hex())
    print("After Residue (str):", repr(after_residue.decode('utf-8', errors='ignore')))
else:
    print("CLAUDE_API_KEY not found.")
