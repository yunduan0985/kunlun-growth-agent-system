page_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/page.tsx"

with open(page_path, "r", encoding="utf-8") as f:
    code = f.read()

# 在 Header 处增加【🤝 大帅·生财资源对接 (独立页)】按钮
header_target = '<div className="flex items-center space-x-3">\n          <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-mono border border-emerald-200 font-semibold">'

header_replacement = '''<div className="flex items-center space-x-3">
          <a
            href="/founder"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition flex items-center space-x-1.5 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>大帅 · 资源对接独立页 ↗</span>
          </a>

          <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-mono border border-emerald-200 font-semibold">'''

code = code.replace(header_target, header_replacement)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(code)

print("🎉 成功在 Header 添加独立页跳转链接！")

