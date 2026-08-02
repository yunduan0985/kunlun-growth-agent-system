path = "scratch/cleaned_index_1473.js"
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the app.listen line
listen_line_idx = -1
for i, line in enumerate(lines):
    if 'app.listen(' in line:
        listen_line_idx = i
        break

if listen_line_idx != -1:
    print(f"Found app.listen at line {listen_line_idx+1}")
    # Find the next '});' after app.listen
    end_idx = -1
    for j in range(listen_line_idx, len(lines)):
        if '});' in lines[j]:
            end_idx = j
            break
            
    if end_idx != -1:
        truncated_lines = lines[:end_idx+1]
        print(f"Truncating file at line {end_idx+1}. Total lines remaining: {len(truncated_lines)}")
        with open("scratch/cleaned_index_1473_truncated.js", "w", encoding="utf-8") as out:
            out.writelines(truncated_lines)
        print("Saved truncated file to scratch/cleaned_index_1473_truncated.js")
    else:
        print("❌ app.listen closing '});' not found!")
else:
    print("❌ app.listen not found!")
