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

function generateXiaohongshuTitles() {
  const topic = document.getElementById('mediaTopic').value || '企业 AI 降本增效与数字化转型';
  const output = document.getElementById('titleOutput');
  output.style.display = 'block';

  output.innerText = `📕 [小红书 & 抖音爆款“钩子标题”矩阵 - ${topic}]\n\n` +
    `1. 【痛点反转型】: "劝所有做企业运营的朋友，千万别再盲目买 AI 工具了！(除非你懂这个逻辑)"\n` +
    `2. 【数字对比型】: "从月入 3000 到 3 天搞定 5 万，我只做对了一件事：拿数字员工做闭环！"\n` +
    `3. 【干货避坑型】: "建议保存！拆解森马 1 亿 AI 落地案，94 个数字员工干了 545 人的活"\n` +
    `4. 【强烈情绪型】: "刚才看了一个学员发的朋友圈，我差点没气晕过去！(附修改前后对比)"\n` +
    `5. 【福利钩子型】: "全网寻找 3 个有成熟业务场景的合伙人，你出场景，我出技术，利润 5:5 分！"`;

  showToast('📕 已为您批量输出 5 大爆款钩子标题！');
}

function generateNoAiWechatMoments() {
  const event = document.getElementById('momentsEvent').value || '手把手带学员重构朋友圈与 AI 错题本';
  const output = document.getElementById('momentsOutput');
  output.style.display = 'block';

  output.innerText = `📱 [坏脾气的小可爱同款 - 去 AI 味高转化朋友圈文案]\n\n` +
    `刚才看了一个学员发的朋友圈，我差点没气晕过去。\n\n` +
    `一股浓浓的“在这个快节奏的时代…”AI 味，机械得像个机器人，客户不屏蔽你屏蔽谁？\n\n` +
    `我直接发语音喷他：“AI 是帮你的工具，不是替你说话的机器！真诚大白话，客户才会理你。”\n\n` +
    `下午花了 2 个小时，手把手帮他重新拆了发圈 SOP，顺便搭了一套自动化客服，今晚他直接成交了一单 19,800 的学员。\n\n` +
    `做交付最忌讳扔一堆视频资料就不管了。\n` +
    `30% 内容 + 40% 现场手把手带练 + 30% 保姆级服务，这才是底线。\n\n` +
    `💬 [评论区第 1 条]: 觉得自己的朋友圈文案太生硬的，把我写的发我，我抽空免费帮你改一条。`;

  showToast('📱 已生成完全去 AI 味高转化朋友圈！');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed'; toast.style.bottom = '20px'; toast.style.right = '20px';
  toast.style.padding = '12px 20px'; toast.style.background = 'rgba(249, 115, 22, 0.9)';
  toast.style.color = '#fff'; toast.style.fontWeight = '700'; toast.style.borderRadius = '10px';
  toast.innerText = msg; document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
