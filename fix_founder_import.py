file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/founder/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace("import Link from 'next.js' ? null : null; // Next.js standard", "import Link from 'next/link';")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("🎉 成功修正 founder/page.tsx import!")

