function buildVolunteerDiagnostics(unifiedRows, score, quotaDistrict, quotaSchool, targetSchools, homeLocation) {
  const counts = { "高冲": 0, "冲": 0, "稳": 0, "保": 0, "低保": 0, "待核": 0 };
  unifiedRows.forEach((row) => { counts[volunteerBand(row, score)] += 1; });
  const risks = [];
  if (counts["冲"] + counts["高冲"] >= 6) risks.push({ level: "高", tone: "red", text: "前排冲刺位偏多，后排保底一旦断档，风险会直接传导到录取结果。" });
  if (counts["保"] + counts["低保"] < 4) risks.push({ level: "高", tone: "red", text: "保底位不足，建议至少保留4所真实可落地学校。" });
  
  // 检查名额分配到校的校内竞争风险
  let quotaRiskCount = 0;
  quotaSchool.forEach(qs => {
    if (qs.suggestion && (qs.suggestion.includes("被挤占风险") || qs.suggestion.includes("被校内高分挤占") || qs.suggestion.includes("面临被高分同学挤占") || qs.suggestion.includes("顺延难度大") || qs.suggestion.includes("偏后") || qs.suggestion.includes("竞争极其激烈") || qs.suggestion.includes("处于名额 (") || qs.suggestion.includes("已超出名额 ("))) {
      quotaRiskCount++;
    }
  });
  if (quotaRiskCount > 0) {
    risks.push({ level: "中", tone: "orange", text: `到校志愿中 ${quotaRiskCount} 所目标校的校内排名偏后或竞争激烈，面临被挤占风险，不建议作为主力保底。` });
  }

  if (!quotaSchool.length) risks.push({ level: "中", tone: "orange", text: "未匹配到本初中的到校历史线，校内排名价值没有完全释放。" });
  if (!targetSchools.length) risks.push({ level: "中", tone: "orange", text: "未填写目标校，报告只能做分数段推荐，无法判断目标差距。" });
  if (!homeLocation) risks.push({ level: "中", tone: "orange", text: "未填写家庭位置，暂未把通勤时间纳入志愿排序。" });
  if (!risks.length) risks.push({ level: "可控", tone: "green", text: "当前冲稳保结构基本可用，仍建议核对第1-8志愿和最后4个保底位。" });
  const strongest = risks.some((risk) => risk.tone === "red") ? "高风险"
    : risks.some((risk) => risk.tone === "orange") ? "需核对"
      : "相对稳";