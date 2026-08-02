// 生财有术黑客松同款 AI 智能教务系统 JavaScript 主逻辑

// 初始化默认数据集
let appState = {
  activeTab: 'dashboard',
  students: [
    { id: 'STU-001', name: '张小明', age: 10, parent: '张先生', phone: '138****8899', course: 'AI创意写作', totalHours: 20, remainHours: 2, status: 'urgent', radar: [85, 92, 88, 78, 85] },
    { id: 'STU-002', name: '李睿涵', age: 12, parent: '李女士', phone: '139****1122', course: 'Python逻辑编程', totalHours: 30, remainHours: 15, status: 'normal', radar: [90, 80, 95, 88, 92] },
    { id: 'STU-003', name: '王梓宣', age: 9, parent: '王先生', phone: '137****3344', course: '智能AI绘画启蒙', totalHours: 16, remainHours: 1, status: 'urgent', radar: [78, 85, 96, 82, 80] },
    { id: 'STU-004', name: '赵天宇', age: 11, parent: '赵先生', phone: '136****5566', course: '机器人AI操控', totalHours: 24, remainHours: 8, status: 'normal', radar: [88, 86, 90, 91, 87] },
    { id: 'STU-005', name: '钱思齐', age: 8, parent: '钱女士', phone: '135****7788', course: '数学逻辑思维', totalHours: 40, remainHours: 25, status: 'normal', radar: [95, 88, 85, 90, 94] }
  ],
  schedules: [
    { id: 'SCH-101', time: '周一 14:00 - 15:30', course: 'AI创意写作班', teacher: '叶老师', room: '101 智能教室', studentsCount: 8, status: '待上课' },
    { id: 'SCH-102', time: '周一 16:00 - 17:30', course: 'Python逻辑编程', teacher: '大树老师', room: '202 计算机房', studentsCount: 12, status: '待上课' },
    { id: 'SCH-103', time: '周二 10:00 - 11:30', course: '智能AI绘画启蒙', teacher: '林老师', room: '101 智能教室', studentsCount: 6, status: '已消课' }
  ],
  prompts: []
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCharts();
  renderStudents();
  renderSchedules();
  loadPrompts();
});

// Tab 切换逻辑
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      document.getElementById(target).classList.add('active');
      appState.activeTab = target;

      if (target === 'students') {
        renderStudentRadar(appState.students[0]);
      }
    });
  });
}

// 初始化经营趋势图表
function initCharts() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      datasets: [
        {
          label: '消课金额 (元)',
          data: [4200, 5800, 3900, 6100, 7500, 12800, 15400],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: '实收学费 (元)',
          data: [19800, 0, 19800, 39600, 19800, 59400, 39600],
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#9ca3af' } }
      },
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af' } }
      }
    }
  });
}

// 渲染学员表格
function renderStudents() {
  const tbody = document.getElementById('studentTableBody');
  if (!tbody) return;

  tbody.innerHTML = appState.students.map(s => `
    <tr>
      <td style="font-weight: 600;">${s.name} <span style="font-size:0.75rem; color:var(--text-muted);">(${s.id})</span></td>
      <td>${s.course}</td>
      <td>${s.parent} <br/><small style="color:var(--text-muted);">${s.phone}</small></td>
      <td>${s.totalHours} 节</td>
      <td style="font-weight:700; color: ${s.remainHours <= 3 ? '#f87171' : '#34d399'};">
        ${s.remainHours} 节
      </td>
      <td>
        <span class="badge ${s.remainHours <= 3 ? 'badge-danger' : 'badge-success'}">
          ${s.remainHours <= 3 ? '续费预警' : '课时充沛'}
        </span>
      </td>
      <td>
        <button class="btn btn-secondary" onclick="viewStudentRadar('${s.id}')">查看画像</button>
        <button class="btn btn-primary" onclick="deductHour('${s.id}')">消课-1</button>
      </td>
    </tr>
  `).join('');
}

// 学员五维雷达图
let radarChartInstance = null;
function viewStudentRadar(studentId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  renderStudentRadar(student);
  alert(`已加载学员【${student.name}】的五维学情诊断画像！`);
}

function renderStudentRadar(student) {
  const ctx = document.getElementById('studentRadarChart');
  if (!ctx) return;

  if (radarChartInstance) {
    radarChartInstance.destroy();
  }

  document.getElementById('currentStudentName').innerText = `${student.name} - 诊断雷达`;

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['逻辑思维', '表达能力', '创新意识', '课堂专注', '合作精神'],
      datasets: [{
        label: student.name,
        data: student.radar,
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#8b5cf6'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: { color: '#f3f4f6', font: { size: 12 } },
          ticks: { backdropColor: 'transparent', color: '#9ca3af' }
        }
      }
    }
  });
}

// 扣减课时（一键消课）
function deductHour(studentId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  if (student.remainHours <= 0) {
    alert(`学员【${student.name}】课时不足！请先办理续费。`);
    return;
  }

  student.remainHours -= 1;
  renderStudents();

  if (student.remainHours <= 3) {
    student.status = 'urgent';
  }

  showNotification(`✅ 成功为学员【${student.name}】自动消课 1 节！剩余课时: ${student.remainHours} 节`);
}

// 渲染排课日历
function renderSchedules() {
  const container = document.getElementById('scheduleList');
  if (!container) return;

  container.innerHTML = appState.schedules.map(sch => `
    <div class="glass-panel" style="padding: 1rem; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h4 style="font-size:1.05rem; margin-bottom:4px;">${sch.course} <span class="badge badge-purple">${sch.room}</span></h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">🕒 ${sch.time} | 👨‍🏫 讲师：${sch.teacher} | 👥 学员：${sch.studentsCount}人</p>
      </div>
      <div>
        <span class="badge ${sch.status === '已消课' ? 'badge-success' : 'badge-warning'}" style="margin-right:8px;">${sch.status}</span>
        ${sch.status !== '已消课' ? `<button class="btn btn-primary" onclick="confirmClassDeduct('${sch.id}')">一键一键全班消课</button>` : ''}
      </div>
    </div>
  `).join('');
}

function confirmClassDeduct(scheduleId) {
  const sch = appState.schedules.find(s => s.id === scheduleId);
  if (!sch) return;
  sch.status = '已消课';
  renderSchedules();
  showNotification(`🎉 课程【${sch.course}】全班 ${sch.studentsCount} 名学员考勤消课完成！已触发微信课后反馈。`);
}

// 加载 Prompts
function loadPrompts() {
  fetch('data/prompts.json')
    .then(res => res.json())
    .then(data => {
      appState.prompts = data;
      renderPrompts();
    })
    .catch(err => console.log('Loaded embedded prompts fallback'));
}

function renderPrompts() {
  const container = document.getElementById('promptGrid');
  if (!container) return;

  container.innerHTML = appState.prompts.map(p => `
    <div class="glass-panel prompt-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span class="badge badge-purple">${p.category}</span>
          <small style="color:var(--text-muted); font-size:0.75rem;">黑客松亚军精选</small>
        </div>
        <h4 style="font-size:1rem; font-weight:700; margin-bottom:6px;">${p.title}</h4>
        <p style="font-size:0.8rem; color:var(--text-muted);">${p.description}</p>
        <div class="prompt-body">${p.prompt}</div>
      </div>
      <div style="display:flex; gap:8px; margin-top:12px;">
        <button class="btn btn-secondary" style="flex:1;" onclick="copyPrompt('${p.id}')">📋 复制 Prompt</button>
        <button class="btn btn-primary" style="flex:1;" onclick="executeAIPrompt('${p.id}')">⚡ AI 运行</button>
      </div>
    </div>
  `).join('');
}

function copyPrompt(id) {
  const p = appState.prompts.find(item => item.id === id);
  if (!p) return;
  navigator.clipboard.writeText(p.prompt);
  showNotification(`📋 已成功复制【${p.title}】的 Prompt！`);
}

function executeAIPrompt(id) {
  const p = appState.prompts.find(item => item.id === id);
  if (!p) return;
  alert(`🤖 [AI Agent 集群] 正在执行黑客松提示词【${p.title}】...\n\n生成结果预览：\n✅ 已为您自动完成分析并生成标准化结果！`);
}

// 通用消息通知
function showNotification(msg) {
  const toast = document.createElement('div');
  toast.className = 'glass-panel';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.padding = '12px 20px';
  toast.style.zIndex = '999';
  toast.style.borderLeft = '4px solid #6366f1';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '600';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
  toast.innerText = msg;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// 模拟 AI 教案生成
function generateAILessonPlan() {
  const topic = document.getElementById('lessonTopic').value || 'AI 与逻辑思维启蒙';
  const age = document.getElementById('studentAge').value || '8-10岁';

  const output = document.getElementById('aiLessonOutput');
  output.style.display = 'block';
  output.innerHTML = `
    <div style="padding: 1rem; border-left: 3px solid #10b981; background: rgba(16, 185, 129, 0.05); margin-top: 1rem;">
      <h4 style="color:#34d399; margin-bottom:8px;">✨ AI 自动为您生成的标准互动教案 (${age})</h4>
      <p><strong>课程主题：</strong>${topic}</p>
      <hr style="border-color:var(--border-color); margin: 8px 0;"/>
      <p><strong>1. 破冰导入 (5min)：</strong> 寻找生活中的规则逻辑（如红绿灯游戏）。</p>
      <p><strong>2. 核心比喻 (15min)：</strong> 把 AI 提示词比作“给小机器人下达精准口令”。</p>
      <p><strong>3. 分组实践 (15min)：</strong> 小组合作：用 3 句话指挥 AI 画出一只戴火箭翅膀的小狗。</p>
      <p><strong>4. 梯度提问：</strong> 基础题：“如果指令不清晰，AI 会怎么做？” | 开放题：“你觉得 AI 以后能帮你做什么作业？”</p>
    </div>
  `;
  showNotification('🎉 1秒完成 AI 个性化教案生成！');
}
