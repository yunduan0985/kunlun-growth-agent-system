// 昆仑增长：生财大帖同款【全链路公域引流 ➔ 私域 4 天体验营 ➔ 19,800 高客单转化】SOP 自动化引擎

const fs = require('fs');
const path = require('path');

// 1. 定义 4 天体验营每日标准 SOP 内容与转化埋点
const CAMP_SOP_DAYS = [
  {
    day: 1,
    title: '破冰与认知颠覆：为什么 90% 的 AI 落地都在白白浪费钱？',
    publicHook: '【公域引流】发布《拆解森马 1 亿 AI 落地案：94 个数字员工如何干完 545 人的活》干货文档',
    privateWelcome: '🎉 欢迎加入【4天 AI 场景降本增效体验营】！我是你的班主任小助手。请回复你的：【行业 + 核心业务痛点】，领取首份干货包。',
    dailyTask: '打卡任务：列出你目前业务中最消耗工时的 3 个重复性环节。',
    conversion埋点: '展示【教培/电商/企服】三大行业 AI 闭环前后效率对比表，植入 19800 场景共创营概念。'
  },
  {
    day: 2,
    title: '实操落地：36 Agent 军团如何 10 秒干完你 1 天的活？',
    publicHook: '【朋友圈/社群】发布《AI 朋友圈去味 SOP + 自动提分错题本工具体验》',
    privateWelcome: '今日体验重点：带你现场使用【教师 AI 错题本】与【36 Agent 提示词库】！',
    dailyTask: '实操打卡：使用系统一键生成一份你业务专属的 AI 互动教案或朋友圈文案，并截屏打卡。',
    conversion埋点: '公布首批试用学员的数据变现案例，展示学员“3天搞定5万学费”真实聊天截图。'
  },
  {
    day: 3,
    title: '场景诊断：怎么找出你行业里价值 10 万的 AI 独家场景？',
    publicHook: '【直播预告】《11年教育老兵：9小时如何用 AI 开发亚军教务系统？》',
    privateWelcome: '今天我们将由资深全栈架构师一对一帮你诊断【独家业务场景】！',
    dailyTask: '诊断打卡：提交《行业场景共创评估表》，测评你的场景商业化指数（0-100分）。',
    conversion埋点: '发布《场景共创合伙人 5:5 分润计划》白皮书，锁定高意向学员。'
  },
  {
    day: 4,
    title: '终极转化：19,800 场景共创营发售与 5:5 利润分成',
    publicHook: '【临门一脚】《本期仅限 5 名合伙人：你出场景，我出技术，收益平分！》',
    privateWelcome: '今晚 20:00 闭营发售直播！前 3 名报名学员加送价值 10,000 元的定制 API 部署服务。',
    dailyTask: '毕业打卡：选择加入【19,800 共创营】或申请【1对1 企训私教】。',
    conversion埋点: '限时倒计时催单 + 早鸟特惠 + 5:5 分润协议签署入口。'
  }
];

// 2. 自动化用户标签与意向评分逻辑 (0-100分)
function evaluateLeadScore(userData) {
  let score = 50; // 基础分
  if (userData.hasScene) score += 20;     // 有明确业务场景 (+20)
  if (userData.hasBudget) score += 15;    // 有支付能力/预算 (+15)
  if (userData.completedTask) score += 15;// 体验营全程打卡 (+15)
  
  let userTag = '普通意向';
  if (score >= 85) userTag = '👑 核心共创合伙人意向 (19,800)';
  else if (score >= 70) userTag = '🔥 高意向企训客户';
  
  return { score, userTag };
}

// 3. 输出全套体验营 SOP 与话术模板文件
function generateSopArtifacts() {
  const outputDir = path.join(__dirname, '..', 'data', 'lead_generation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const sopFile = path.join(outputDir, '4天体验营全流程变现SOP手册.json');
  fs.writeFileSync(sopFile, JSON.stringify(CAMP_SOP_DAYS, null, 2), 'utf-8');

  console.log('✅ 【生财大帖同款获客 SOP 引擎】已启动！');
  console.log(`📄 已成功导出 4 天体验营全流程手册至: ${sopFile}`);
}

generateSopArtifacts();
