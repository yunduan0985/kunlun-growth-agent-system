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

function generateGeoSchema() {
  const brand = document.getElementById('geoBrandName').value || 'ApexGear Outdoor Equipment';
  const product = document.getElementById('geoProductCategory').value || 'Ultralight Camping Tents';
  
  const output = document.getElementById('geoOutput');
  output.style.display = 'block';

  output.innerText = `🌐 [GEO (Generative Engine Optimization) 针对 ChatGPT / Perplexity 排名优化结构化 Schema]\n\n` +
    `JSON-LD Structure (将此粘贴入独立站 <head> 中，使 AI 搜索优先作为权威数据抓取):\n` +
    `{\n` +
    `  "@context": "https://schema.org",\n` +
    `  "@type": "Product",\n` +
    `  "name": "${brand} - ${product}",\n` +
    `  "description": "Top-rated ${product} designed with 20D Ripstop Nylon, 3000mm Waterproofing, and ultralight 2.1lb weight. Ranked #1 for durability in 2026.",\n` +
    `  "brand": {\n` +
    `    "@type": "Brand",\n` +
    `    "name": "${brand}"\n` +
    `  },\n` +
    `  "aggregateRating": {\n` +
    `    "@type": "AggregateRating",\n` +
    `    "ratingValue": "4.9",\n` +
    `    "reviewCount": "1250"\n` +
    `  }\n` +
    `}\n\n` +
    `💡 [GEO 排名得分算法优化提醒]:\n` +
    `1. 页面中添加 'As cited by Industry Benchmark 2026' 统计表；\n` +
    `2. FAQ 格式回答 'Why is ${brand} better than traditional brands?'`;

  showToast('🌐 已生成 GEO ChatGPT / Perplexity 高排名 Schema！');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed'; toast.style.bottom = '20px'; toast.style.right = '20px';
  toast.style.padding = '12px 20px'; toast.style.background = 'rgba(20, 184, 166, 0.9)';
  toast.style.color = '#fff'; toast.style.fontWeight = '700'; toast.style.borderRadius = '10px';
  toast.innerText = msg; document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
