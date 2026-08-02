// 课程 A：AI 跨境电商爆破营 - 卖家智能工作站脚本

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
});

function initTabs() {
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
}

// 1. AI 选品卖点与竞品热词生成
function analyzeProductPainpoints() {
  const productName = document.getElementById('productName').value || '智能降噪运动耳机';
  const category = document.getElementById('productCategory').value || '3C 数码 / 户外运动';

  const output = document.getElementById('selectionOutput');
  output.style.display = 'block';
  output.innerText = `🔍 [AI 竞品数据分析完成] 针对品类：${category} - ${productName}\n\n` +
    `💡 核心爆款卖点 (High-Converting Selling Points):\n` +
    `1. Active Noise Cancellation (45dB 深度降噪，适合地铁/健身房)\n` +
    `2. IPX8 Waterproof Rating (超强防水防汗，支持水下冲洗)\n` +
    `3. 48-Hour Ultra-Long Battery Life (配合充电舱使用 2 周不充电)\n\n` +
    `⚠️ 买家核心差评避坑点 (Pain Points to Highlight Solution):\n` +
    `- 痛点 1：佩戴容易掉落 ➔ 解决方案：附带 3 种尺寸记忆海绵耳塞与防掉挂钩\n` +
    `- 痛点 2：蓝牙连接延迟 ➔ 解决方案：采用最新 2026 蓝牙 5.4 低延迟极速芯片\n\n` +
    `🔑 Amazon A9 搜索高权重关键词表:\n` +
    `[Noise Cancelling Earbuds] | [Wireless Sports Headphones] | [Waterproof Bluetooth Earbuds] | [Long Battery Life]`;
  
  showToast('✅ 已为您生成竞品热词与痛点拆解报告！');
}

// 2. 多语言 Listing 极速生成 (Amazon A9)
function generateMultilingualListing() {
  const title = document.getElementById('listingTitleInput').value || 'Wireless Noise Cancelling Earbuds';
  const lang = document.getElementById('listingLangSelect').value || 'en';

  const output = document.getElementById('listingOutput');
  output.style.display = 'block';

  let content = '';
  if (lang === 'en') {
    content = `📌 [TITLE / 标题]\n${title} - Bluetooth 5.4 Sport Headphones with 45dB Active Noise Cancellation, 48H Playtime, IPX8 Waterproof, Ergonomic Fit Earbuds for Gym & Travel\n\n` +
      `📝 [BULLET POINTS / 5点描述]\n` +
      `• 【ADVANCED 45dB NOISE CANCELLATION】: Block out 98% of background noise in subways & gyms with 2026 upgraded ANC technology.\n` +
      `• 【UP TO 48 HOURS PLAYTIME】: Enjoy 8 hours of non-stop music on a single charge and up to 48 hours with the compact LED charging case.\n` +
      `• 【IPX8 WATERPROOF & SWEATPROOF】: Nano-coating protects the earbuds from heavy sweat, rain, or accidental splashes during intense workouts.\n` +
      `• 【SECURE ERGONOMIC FIT】: Comes with 3 sizes of ultra-soft silicone ear tips ensuring zero pressure and maximum stability.\n` +
      `• 【ONE-STEP AUTO PAIRING & TOUCH CONTROL】: Instantly connects to your device upon opening the case; touch controls for calls & volume.\n\n` +
      `🌟 [A+ BRAND STORY / A+ 详情页文案]\n` +
      `Designed for athletes & commuters. Experience crystal-clear audio with zero compromises. Guaranteed 1-year replacement warranty.`;
  } else if (lang === 'de') {
    content = `📌 [TITLE / 德国亚马逊标题]\n${title} - Kabellose Bluetooth 5.4 Sport Kopfhörer mit 45dB ANC Geräuschunterdrückung, 48h Wiedergabe, Wasserdicht IPX8\n\n` +
      `📝 [BULLET POINTS / 德语 5 点描述]\n` +
      `• 【45dB AKTIVE GERÄUSCHUNTERDRÜCKUNG】: Reines Klangerlebnis im Fitnessstudio und Büro.\n` +
      `• 【48 STUNDEN WIEDERGABEZEIT】: 8h pro Ladung, 48h mit der kompakten Ladebox.\n` +
      `• 【IPX8 WASSERDICHT】: Perfekt geschützt vor Schweiß und Regen bei jedem Workout.`;
  } else {
    content = `📌 [TITLE / 多语言 Listing 生成成功]\n已为您生成针对 ${lang.toUpperCase()} 市场的 Amazon A9 最佳优化搜索标题与 Bullet Points！`;
  }

  output.innerText = content;
  showToast(`🎉 成功生成 ${lang.toUpperCase()} 市场爆款 Listing！`);
}

// 3. TikTok 爆款短视频脚本生成
function generateTikTokScript() {
  const product = document.getElementById('tiktokProduct').value || 'Portable Mini Blender';
  const output = document.getElementById('tiktokOutput');
  output.style.display = 'block';

  output.innerText = `🎬 [TikTok 爆款 30秒带货口播脚本] - ${product}\n\n` +
    `⏱️ 00:00 - 00:03 (HOOK / 黄金前 3 秒特写):\n` +
    `镜头：主播手持冰块和新鲜草莓倒入紧凑型榨汁杯，画面配特大红字：'STOP Buying $8 Smoothies!'\n` +
    `台词："Stop wasting money at juice bars! Look at what this $19 gadget can do in 10 seconds!"\n\n` +
    `⏱️ 00:04 - 00:15 (DEMO / 产品强劲效果展示):\n` +
    `镜头：双击按钮，6 刃刀片秒杀冰块，榨出细腻丝滑草莓奶昔，主播现场畅饮表现惊喜表情。\n` +
    `台词："6 stainless steel blades blend ice & frozen fruit in literally 10 seconds. Plus, it's USB-C rechargeable!"\n\n` +
    `⏱️ 00:16 - 00:30 (CTA / 催单收尾):\n` +
    `镜头：特写屏幕下方黄色购物车指示图标，搭配闪烁优惠券字眼。\n` +
    `台词："TikTok Shop flash sale is live today. Click the yellow cart below to get 40% OFF before stock runs out!"`;

  showToast('🎬 TikTok 短视频黄金 Hook 脚本生成完成！');
}

// 4. 智能客服尺码引导换码 (降低 30% 退货率)
function handleSizeExchangeSimulation() {
  const reason = document.getElementById('customerReason').value || '尺码偏小穿不上，申请退货';
  const output = document.getElementById('customerOutput');
  output.style.display = 'block';

  output.innerText = `💬 [智能客服高情商退换货拦截与换码闭环]\n` +
    `系统已检测到买家退货诉求：【${reason}】\n\n` +
    `🤖 [已自动生成微信 / 亚马逊 Buyer-Seller Message 回复话术]:\n` +
    `"Dear Customer,\n\n` +
    `Thank you so much for reaching out! We are truly sorry to hear that the size you received didn't fit as comfortably as expected.\n\n` +
    `To save you the hassle of returning the item and paying return shipping costs, we would love to offer you two instant solutions:\n` +
    `1. 🎁 【FREE REPLACEMENT】: We will ship you a LARGER SIZE for FREE immediately. You don't need to return the current item!\n` +
    `2. 💳 【50% partial refund + keep the item】: If you'd like to gift it to a friend, we will refund 50% immediately.\n\n` +
    `Please reply with your preferred size/option, and we will handle everything within 2 hours!\n\n` +
    `Warm regards,\nCustomer Support Manager"`;

  showToast('🛡️ 已触发换码引导，成功帮卖家挽回单笔退货损失！');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 20px';
  toast.style.background = 'rgba(56, 189, 248, 0.9)';
  toast.style.color = '#000';
  toast.style.fontWeight = '700';
  toast.style.borderRadius = '10px';
  toast.style.zIndex = '9999';
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
