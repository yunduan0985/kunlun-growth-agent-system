document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      document.getElementById(target).classList.add('active');
    });
  });
});

function analyzeBiddingDocument() {
  const requirement = document.getElementById('bidRequirement').value || '项目预算 500 万，要求 ISO9001 质量认证，软件著作权不少于 5 项，注册资本不低于 1000 万';
  const output = document.getElementById('bidOutput');
  output.style.display = 'block';

  output.innerText = `📄 [AI 标书快速解析、资质匹配与废标风控清查]\n\n` +
    `针对招标文件要求:\n${requirement}\n\n` +
    `🔍 [AI 资质匹配与风险诊断结果]:\n` +
    `1. ✅ 【ISO9001 质量认证】: 公司资质库匹配成功（有效期至 2027年）；\n` +
    `2. ✅ 【软件著作权】: 已自动从智库中调取 8 项软件著作权证书（超过 5 项要求）；\n` +
    `3. ⚠️ 【注册资本风险】: 公司注册资本 2000 万，完全符合要求；\n` +
    `4. 🚨 【废标项清查提醒】: 必须提供近 3 个月纳税证明原件扫描件，未提供将一票否决！\n\n` +
    `📑 已自动生成《响应方案初稿框架 Markdown》！`;

  showToast('📄 标书废标项与资质清查完成！');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed'; toast.style.bottom = '20px'; toast.style.right = '20px';
  toast.style.padding = '12px 20px'; toast.style.background = 'rgba(16, 185, 129, 0.9)';
  toast.style.color = '#fff'; toast.style.fontWeight = '700'; toast.style.borderRadius = '10px';
  toast.innerText = msg; document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
