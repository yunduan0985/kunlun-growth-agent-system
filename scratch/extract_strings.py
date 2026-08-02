import os
import re

def extract_strings(data):
    # Match any printable ASCII and UTF-8 sequence of length >= 20
    # Printable ASCII: 32 to 126
    # Printable Chinese (UTF-8): \xe4-\xe9 followed by 2 bytes of \x80-\xbf
    # We can use a regex on decoded text or bytes
    text = data.decode('utf-8', errors='ignore')
    # Filter for printable chars and common formatting
    matches = re.findall(r'[\x20-\x7e\n\r\t]{20,}', text)
    return matches

edits_dir = "scratch/extracted_edits_current"
out_dir = "scratch/decoded_text"
os.makedirs(out_dir, exist_ok=True)

print("🔍 Extracting strings from binary payloads...")
for file in os.listdir(edits_dir):
    if file.endswith('.json'):
        file_path = os.path.join(edits_dir, file)
        try:
            with open(file_path, 'rb') as f:
                data = f.read()
            strings = extract_strings(data)
            if strings:
                # Save to a txt file
                out_path = os.path.join(out_dir, file.replace('.json', '.txt'))
                with open(out_path, 'w', encoding='utf-8') as out:
                    out.write("\n=====================\n".join(strings))
                # If it's a very large file, print it
                if len(data) > 100000:
                    print(f"👉 Extracted {len(strings)} strings from large file {file} (size={len(data)}) to {out_path}")
        except Exception as e:
            print(f"Error {file}: {e}")
