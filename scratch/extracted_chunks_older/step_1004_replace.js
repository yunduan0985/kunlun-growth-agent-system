// 并入上海升学落户知识库的科普文章
policyStageArticles.kindergarten.push(
  article({
    id: "kb_school_district_kg", stage: "kindergarten", category: "planning", categoryLabel: "路径选择", source: "compulsory", weight: 28,
    title: knowledgeBase.schoolDistrict.title,
    desc: knowledgeBase.schoolDistrict.summary,
    insight: "同套房产五年内仅限一户对口，且报名民办摇号未中会降低公办排序。",
    content: knowledgeBase.schoolDistrict.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_points_kg", stage: "kindergarten", category: "planning", categoryLabel: "路径选择", source: "compulsory", weight: 22,
    title: knowledgeBase.residencePermitPoints.title,
    desc: knowledgeBase.residencePermitPoints.summary,
    insight: "积分 120 分是非沪籍子女在沪中考报考高中的绝对硬红线，必须提早两到三年规划。",
    content: knowledgeBase.residencePermitPoints.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_timeline_kg", stage: "kindergarten", category: "admission", categoryLabel: "入学安排", source: "compulsory", weight: 29,
    title: "上海幼升小大事件按月时间线规划",
    desc: "从幼儿园大班入学到当年 8 月份录取通知书发放的全流程月度待办核对清单。",
    insight: "提早半年核对居住证、社保及房产信息，切忌遗漏 4 月份的登记与 5 月份的报名。",
    content: (knowledgeBase.gradeTimelines.sections.find(s => s.title.includes("幼儿园大班")) || {}).content || ""
  })
);

policyStageArticles.primary_to_junior.push(
  article({
    id: "kb_school_district_psj", stage: "primary_to_junior", category: "admission", categoryLabel: "入学安排", source: "compulsory", weight: 27,
    title: knowledgeBase.schoolDistrict.title,
    desc: knowledgeBase.schoolDistrict.summary,
    insight: "初中对口分配（如学籍或户籍对口）同样适用五年一户，且报民办未中退回公办同类排序靠后。",
    content: knowledgeBase.schoolDistrict.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_points_psj", stage: "primary_to_junior", category: "admission", categoryLabel: "入学安排", source: "compulsory", weight: 24,
    title: knowledgeBase.residencePermitPoints.title,
    desc: knowledgeBase.residencePermitPoints.summary,
    insight: "小升初后即进入中考积分规划倒计时，社保不匹配、学历套读等雷区会直接导致积分无效。",
    content: knowledgeBase.residencePermitPoints.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_three_public", stage: "primary_to_junior", category: "special", categoryLabel: "特色招生", source: "compulsory", weight: 28,
    title: knowledgeBase.threePublicPrep.title,
    desc: knowledgeBase.threePublicPrep.summary,
    insight: "三公学校全市招收且不占用任何公办/民办名额，是新五年级暑期必须开始准备的零风险赛道。",
    content: knowledgeBase.threePublicPrep.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_timeline_psj", stage: "primary_to_junior", category: "admission", categoryLabel: "入学安排", source: "compulsory", weight: 29,
    title: "上海小升初大事件按月时间线规划",
    desc: "五年级第一学期期末至第二学期 8 月份录取通知书发放的全程关键节点与区级申请指南。",
    insight: "重点关注 4 月份的电子学籍信息核对以及跨区回户籍升学申请的截止时间。",
    content: (knowledgeBase.gradeTimelines.sections.find(s => s.title.includes("五年级")) || {}).content || ""
  })
);

policyStageArticles.junior_middle.push(
  article({
    id: "kb_points_jm", stage: "junior_middle", category: "planning", categoryLabel: "高中规划", source: "middleRegistration", weight: 28,
    title: knowledgeBase.residencePermitPoints.title,
    desc: knowledgeBase.residencePermitPoints.summary,
    insight: "初二阶段是准备 120 积分的最晚安全期，需保证个税与社保匹配并防范学历核验大坑。",
    content: knowledgeBase.residencePermitPoints.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_hukou_jm", stage: "junior_middle", category: "planning", categoryLabel: "高中规划", source: "middleRegistration", weight: 22,
    title: knowledgeBase.hukouPolicies.title,
    desc: knowledgeBase.hukouPolicies.summary,
    insight: "通过居转户（中级职称/双倍社保）或高新技术人才引进等方式尽早落户，彻底消除积分不确定性。",
    content: knowledgeBase.hukouPolicies.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_timeline_jm", stage: "junior_middle", category: "planning", categoryLabel: "高中规划", source: "middleRegistration", weight: 29,
    title: "上海初中与中考大事件按月时间线规划",
    desc: "初一至初三中考考后录取的全流程月历规划，涵盖历史/道法中考学平考节点。",
    insight: "初二的地理、生物及历史学平考成绩直接计入中考分，须从暑期开始进入备考节奏。",
    content: `${(knowledgeBase.gradeTimelines.sections.find(s => s.title.includes("初一至初二")) || {}).content || ""}\n\n${(knowledgeBase.gradeTimelines.sections.find(s => s.title.includes("初三")) || {}).content || ""}`
  })
);

policyStageArticles.junior_high.push(
  article({
    id: "kb_points_jh", stage: "junior_high", category: "all", categoryLabel: "全部", source: "middleRegistration", weight: 32,
    title: knowledgeBase.residencePermitPoints.title,
    desc: knowledgeBase.residencePermitPoints.summary,
    insight: "中考报名通常在初三上学期 11-12 月启动，积分 120 分必须在此前获批方能核验通过。",
    content: knowledgeBase.residencePermitPoints.sections.map(s => `【${s.title}】\n${s.content}`).join("\n\n")
  }),
  article({
    id: "kb_timeline_jh", stage: "junior_high", category: "all", categoryLabel: "全部", source: "middleApplication", weight: 29,
    title: "上海初三备考与中考录取大事件时间线",
    desc: "梳理初三上学期体育选项至下学期 7 月录取线公布的完整日程与重要战役节点。",
    insight: "高度重视 3 月的一模考试及 5 月的自主招生报名，填报志愿应严格遵循梯度原则。",
    content: (knowledgeBase.gradeTimelines.sections.find(s => s.title.includes("初三阶段")) || {}).content || ""
  })
);

policyStageArticles.high_school.push(
  article({
    id: "kb_timeline_hs", stage: "high_school", category: "subjects", categoryLabel: "选科要求", source: "collegeAdmission", weight: 29,
    title: "上海新高考选科与升学大事件时间线规划",
    desc: "高一至高三秋季高考录取全流程月度大事记，涵盖学平考与春考、综评面试日程。",
    insight: "高一第一学期末的选科决定大学报考范围；高二需冲刺合格考，高三全力应对 1 月春考和 6 月秋考。",
    content: (knowledgeBase.gradeTimelines.sections.find(s => s.title.includes("高中阶段")) || {}).content || ""
  })
);

Object.keys(policyStageArticles).forEach((stage) => Object.freeze(policyStageArticles[stage]));

module.exports = Object.freeze(policyStageArticles);