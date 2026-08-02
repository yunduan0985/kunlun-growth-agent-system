      let suggestion = "";
      const c_j = getJuniorCompetitionFactor(juniorSchool);
      if (planCount !== null) {
        if (!rankNum || isNaN(rankNum)) {
          suggestion = `2025年到校录取折算线为 ${scoreInfo.academicEquivalent} 分 (${info.badge})。今年分配名额为 ${planCount} 个，建议补充校内排名评估。`;
        } else {
          const safeLimit = Math.max(1, Math.round(planCount * c_j));
          if (rankNum <= safeLimit) {
            suggestion = `2025线折算 ${scoreInfo.academicEquivalent} 分。今年名额 ${planCount} 个，你的校排 ${rankNum} 处于安全线内，具备较强竞争优势。`;
          } else if (rankNum <= planCount) {
            if (c_j < 1.0) {
              suggestion = `2025线折算 ${scoreInfo.academicEquivalent} 分。今年名额 ${planCount} 个，你排第 ${rankNum} 名。本校中考竞争激烈，校排面临被校内高分挤占风险，建议谨慎。`;
            } else {
              suggestion = `2025线折算 ${scoreInfo.academicEquivalent} 分。今年该校名额 ${planCount} 个，你的校排 ${rankNum} 在名额范围内，具备一定竞争位置。`;
            }
          } else if (rankNum <= planCount * 2) {
            if (c_j < 1.0) {
              suggestion = `2025线折算 ${scoreInfo.academicEquivalent} 分。今年名额 ${planCount} 个，你排第 ${rankNum} 名已超出名额。本校名额强夺激烈，面临被挤占风险，顺延难度大。`;
            } else {
              suggestion = `2025线折算 ${scoreInfo.academicEquivalent} 分。今年该校名额 ${planCount} 个，你的校排 ${rankNum} 位于名额数之后，是否获得机会取决于本校志愿选择。`;
            }
          } else {
            suggestion = `2025线折算 ${scoreInfo.academicEquivalent} 分。今年名额 ${planCount} 个，你的校排 ${rankNum} 偏后，存在被高分同学挤占的风险，请谨慎填报。`;
          }
        }
      } else {
        suggestion = `2025年到校录取折算线为 ${scoreInfo.academicEquivalent} 分 (${info.badge})。${rankNum ? `结合你的校排 ${rankNum} 及往年分数线进行参考。` : "建议补充校内排名以获得更有针对性的参考。"}`;
      }