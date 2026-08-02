  const quotaSchoolPlan2026 = data.quotaToSchoolPlanRows2026
    .filter((row) => isSameJunior(row.juniorSchool, juniorSchool))
    .map((row) => {
      const planCount = Number(row.planCount || 0);
      const c_j = getJuniorCompetitionFactor(juniorSchool);
      let suggestion = "";
      if (!rankNum || isNaN(rankNum)) {
        suggestion = `今年本校分配到 ${planCount} 个名额。建议补充填写校内排名，以便结合名额数和往年线做进一步判断。`;
      } else {
        const safeLimit = Math.max(1, Math.round(planCount * c_j));
        if (rankNum <= safeLimit) {
          suggestion = `你的校排名 (${rankNum}) 在该高中分配安全名额数 (${planCount}个) 范围内，获取名额难度相对较低，但不能据此直接判断录取。`;
        } else if (rankNum <= planCount) {
          if (c_j < 1.0) {
            suggestion = `你的校排 (${rankNum}) 处于名额 (${planCount}个) 边缘。本校名额竞争极其激烈，您的校排可能面临被高分同学挤占的风险，请谨慎填报。`;
          } else {
            suggestion = `你的校排名 (${rankNum}) 接近分配名额数 (${planCount}个)，名额存在顺延可能，需结合本校学生对该高中的志愿选择判断。`;
          }
        } else if (rankNum <= planCount * 2) {
          if (c_j < 1.0) {
            suggestion = `你的校排 (${rankNum}) 已超出名额 (${planCount}个)。本校名额抢夺激烈且高分扎堆，顺延概率低，存在被校内高分挤占的风险。`;
          } else {
            suggestion = `你的校排名 (${rankNum}) 稍微超出分配名额数 (${planCount}个)。若排在前面的同学选择裸考或自招，则有名额顺延的机会。`;
          }
        } else if (rankNum <= planCount * 3) {
          suggestion = `你的校排名 (${rankNum}) 明显靠后于分配名额数 (${planCount}个)。名额顺延难度较大，可能面临被高分同学挤占的风险，建议谨慎作为主力选择。`;
        } else {
          suggestion = `你的校排名 (${rankNum}) 远大于名额计划数 (${planCount}个)。顺延难度极高，存在被高分挤占风险，建议更换其他学校。`;
        }
      }