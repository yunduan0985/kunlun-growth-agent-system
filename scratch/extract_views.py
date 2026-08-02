import sqlite3
import json
import os

db_path = "/Users/dasean/.gemini/antigravity/conversations/7a3eb2cb-a8a5-41a0-8539-02f35b41f1bd.db"
out_dir = "scratch/extracted_views"
os.makedirs(out_dir, exist_ok=True)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT idx, step_payload, metadata FROM steps;")
rows = cursor.fetchall()
print(f"Loaded {len(rows)} rows to scan for view_file.")

for idx, payload, meta in rows:
    payload_str = payload.decode('utf-8', errors='ignore') if isinstance(payload, bytes) else str(payload)
    meta_str = meta.decode('utf-8', errors='ignore') if isinstance(meta, bytes) else str(meta)
    
    # We want to check for tool calls or results that viewed index.js
    if 'view_file' in payload_str and 'index.js' in payload_str:
        # Find where it is
        print(f"👉 Step {idx} has view_file index.js in payload (size={len(payload_str)})")
        out_path = os.path.join(out_dir, f"step_{idx}_view_payload.txt")
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(payload_str)
            
    if 'view_file' in meta_str and 'index.js' in meta_str:
        print(f"👉 Step {idx} has view_file index.js in meta (size={len(meta_str)})")
        out_path = os.path.join(out_dir, f"step_{idx}_view_meta.txt")
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(meta_str)

conn.close()
