  const result2 = admission.generateRecommendation({
    score: 630,
    juniorSchool: "上海市民办立达中学",
    district: "黄浦区",
    schoolRank: 11, // 立达中学有计划数为 12 的学校，排名 11 属于边缘（因为安全限是 12*0.8=10）
    privateHigh: false,
    crossDistrictHigh: false,
    targetSchools: [],
    homeLocation: null,
    homeAddress: ""
  });

  const hasPlan = result2.quotaSchoolPlan2026.length > 0;
  assert(hasPlan, "应该能获取到立达中学的名额计划");
  if (hasPlan) {
    const item = result2.quotaSchoolPlan2026.find(p => p.planCount === 12);
    if (item) {
      console.log(`名额数为 ${item.planCount}，校排为 11 时，提示: "${item.suggestion}"`);
      assert(item.suggestion.includes("被高分同学挤占") || item.suggestion.includes("挤占") || item.suggestion.includes("激烈"), "强势初中且处于名额边缘时应触发挤占/激烈提示");
    } else {
      console.log("未找到计划数为 12 的学校，打印第一个计划:");
      console.log(`名额数: ${result2.quotaSchoolPlan2026[0].planCount}, 提示: "${result2.quotaSchoolPlan2026[0].suggestion}"`);
    }
  }