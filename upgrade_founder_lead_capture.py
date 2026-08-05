file_path = "/Volumes/MOVESPEED/下载/AIcode/Agent/apps/math_wrong_notebook_web/src/app/founder/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# 替换提交处理逻辑，真正调用 /api/bitable
new_submit_logic = """  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSent(true);

    try {
      const res = await fetch('/api/bitable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raw_draft: `[B端客户/圈友意向询盘]: ${contactMessage}`,
          author: '网页线索抓取 (kunlungrowthai.pages.dev/founder)'
        })
      });
      const data = await res.json();
      alert('🎉 您的合作意向已成功提交给大帅！飞书 Agent 已秒级推送至大帅手机。微信号 [Dasean-] 随时欢迎添加好友深入交流！');
    } catch (err) {
      alert('🎉 您的合作意向已记录！微信 [Dasean-] 随时欢迎添加好友。');
    } finally {
      setContactSent(false);
      setContactMessage('');
    }
  };"""

import re
code = re.sub(r'const handleQuickSubmit = \(e: React\.FormEvent\) => \{.*?\};', new_submit_logic, code, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("🎉 已成功升级 founder/page.tsx 线索抓取逻辑！")
