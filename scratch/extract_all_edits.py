import sqlite3
import json
import os

db_path = "/Users/dasean/.gemini/antigravity/conversations/7a3eb2cb-a8a5-41a0-8539-02f35b41f1bd.db"
out_dir = "scratch/extracted_edits_current"
os.makedirs(out_dir, exist_ok=True)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get all rows
cursor.execute("SELECT idx, step_payload, metadata FROM steps;")
rows = cursor.fetchall()
print(f"Loaded {len(rows)} rows from current DB steps table.")

for idx, payload, meta in rows:
    payload_str = payload.decode('utf-8', errors='ignore') if isinstance(payload, bytes) else str(payload)
    meta_str = meta.decode('utf-8', errors='ignore') if isinstance(meta, bytes) else str(meta)
    
    # Check if this step is a tool call to edit files
    if 'replace_file_content' in payload_str or 'multi_replace_file_content' in payload_str:
        # Save payload to a txt file
        out_path = os.path.join(out_dir, f"step_{idx}_payload.json")
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(payload_str)
        print(f"👉 Saved step {idx} edit payload to {out_path}")
        
    elif 'replace_file_content' in meta_str or 'multi_replace_file_content' in meta_str:
        out_path = os.path.join(out_dir, f"step_{idx}_meta.json")
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(meta_str)
        print(f"👉 Saved step {idx} edit meta to {out_path}")

conn.close()
