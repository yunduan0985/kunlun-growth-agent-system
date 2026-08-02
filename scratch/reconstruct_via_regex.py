import os
import re

path = "scratch/extracted_edits_current/step_1135_payload.json"
with open(path, 'rb') as f:
    data = f.read()

# Decode data ignoring errors
text = data.decode('utf-8', errors='ignore')

# Match lines of the form line_number: content
# Since there are binary bytes around them, we look for matches of:
# (any tag or start) followed by digits, colon, space, and then the line content up to the end of the line or binary separator
# Regular expression: we want digits, colon, space, then any ASCII/UTF-8 chars
matches = re.findall(r'(\d+):\s*([^\x00-\x1f\x7f-\x9f]+)', text)

print(f"Total raw regex matches: {len(matches)}")

# Map line number (int) -> line content
reconstructed = {}
for num_str, content in matches:
    num = int(num_str)
    # Strip any trailing binary characters or protobuf tag residues
    # Protobuf tag residues usually start with binary chars, but since [^\x00-\x1f...] matches printable characters,
    # it might include some printable ASCII characters that are part of the protobuf tags (like 'P' or 'T').
    # But wait, in protobuf, tags are binary (e.g. 0x1a, 0x10, etc.) which are < 32 (control characters).
    # So they are excluded by [^\x00-\x1f]!
    # So the content should be very clean!
    # Let's clean up common suffix residues
    clean_content = content
    # If the content ends with common protobuf tag patterns, we clean it
    reconstructed[num] = clean_content

print(f"Unique lines matched: {len(reconstructed)}")

# Sort by line number and write out
out_path = "scratch/regex_reconstructed_1135.js"
with open(out_path, 'w', encoding='utf-8') as out:
    for num in sorted(reconstructed.keys()):
        out.write(reconstructed[num] + '\n')

print(f"Saved to {out_path}")
