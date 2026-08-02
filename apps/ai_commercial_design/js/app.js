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

function generateModelPhotoPrompt() {
  const style = document.getElementById('modelStyle').value || 'European Commercial';
  const outfit = document.getElementById('outfitType').value || '法式复古碎花连衣裙';
  
  const output = document.getElementById('modelOutput');
  output.style.display = 'block';

  output.innerText = `🎨 [Midjourney v6.0 商业人像摄影 Prompt 生成]\n\n` +
    `Prompt:\n` +
    `High-end commercial fashion photography, gorgeous female model wearing [${outfit}], ${style} studio aesthetics, editorial magazine lighting, shot on Hasselblad H6D-100c, 85mm lens, f/1.8, soft natural shadows, photorealistic skin texture, ultra-detailed 8k --ar 3:4 --v 6.0 --style raw\n\n` +
    `💡 [ComfyUI 模特换装 Flow 参数建议]:\n` +
    `- ControlNet OpenPose 锁定姿势权重: 0.85\n` +
    `- IP-Adapter 服装发型参考权重: 0.75\n` +
    `- Denoising Strength: 0.55`;

  showToast('✨ 商业模特人像 Prompt 生成成功！');
}

function generate3DPackagingPrompt() {
  const product = document.getElementById('productType').value || '高端抗衰精华液';
  const output = document.getElementById('packagingOutput');
  output.style.display = 'block';

  output.innerText = `📦 [3D 电商爆款主图 & 场景海报 Prompt]\n\n` +
    `Prompt:\n` +
    `Commercial 3D product render of [${product}], glass bottle with frosted texture, floating water droplets, soft morning sunlight, marble pedestal, luxury studio background, Octane render, raytracing, cinematic lighting, 8k --ar 1:1 --v 6.0\n\n` +
    `💡 [点击率提升技巧]:\n` +
    `1. 背景与瓶身成补色关系，突出中间主视觉\n` +
    `2. 加水滴与冰块物理渲染，视觉冲击力提升 40%`;

  showToast('📦 3D 渲染海报 Prompt 生成成功！');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed'; toast.style.bottom = '20px'; toast.style.right = '20px';
  toast.style.padding = '12px 20px'; toast.style.background = 'rgba(236, 72, 153, 0.9)';
  toast.style.color = '#fff'; toast.style.fontWeight = '700'; toast.style.borderRadius = '10px';
  toast.innerText = msg; document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
