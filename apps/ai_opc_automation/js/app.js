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

function generateN8nWorkflow() {
  const rssUrl = document.getElementById('opcRssUrl').value || 'https://news.ycombinator.com/rss';
  const output = document.getElementById('n8nOutput');
  output.style.display = 'block';

  output.innerText = `🤖 [n8n / Coze 全网内容自动化分发 JSON 工作流模板]\n\n` +
    `节点链路配置:\n` +
    `1. [Trigger]: RSS / Webhook 监听源 -> ${rssUrl}\n` +
    `2. [AI Node]: DeepSeek API 自动清洗、提炼核心爆点与去除广告\n` +
    `3. [Formatter]: 自动生成【小红书九宫格文案】+【微信公众号图文】+【X 推文】\n` +
    `4. [Publish]: 一键同步推送至各大平台 Webhook\n\n` +
    `代码模版:\n` +
    `{\n` +
    `  "nodes": [{ "name": "AI Content Clean", "type": "n8n-nodes-base.openAi", "parameters": { "model": "deepseek-chat" } }]\n` +
    `}`;

  showToast('🤖 已成功生成 n8n 全网无人值守内容分发流水线！');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed'; toast.style.bottom = '20px'; toast.style.right = '20px';
  toast.style.padding = '12px 20px'; toast.style.background = 'rgba(245, 158, 11, 0.9)';
  toast.style.color = '#fff'; toast.style.fontWeight = '700'; toast.style.borderRadius = '10px';
  toast.innerText = msg; document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
