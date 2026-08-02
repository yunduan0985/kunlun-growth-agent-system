import json

path = "scratch/extracted_edits_current/step_1233_payload.json"
with open(path, 'rb') as f:
    data = f.read()

# Since it's binary, let's look for printable strings in it or try to decode it
text = data.decode('utf-8', errors='ignore')
print(f"File length: {len(data)}")

# Let's search for JSON markers
start_json = text.find('{"')
if start_json != -1:
    print(f"Found JSON start at {start_json}")
    # Print the first 1000 characters of the JSON
    print(text[start_json:start_json+2000])
else:
    print("No JSON start found, printing first 2000 chars of decoded text:")
    print(text[:2000])
