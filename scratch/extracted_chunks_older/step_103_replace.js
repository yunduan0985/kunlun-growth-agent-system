    // 今日推荐时效性内容计算（多学段日期及数据状态驱动）
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    let todayRecommend = null;

    if (stage === "kindergarten") {
      if (month >= 4 && month <= 6) {
        todayRecommend = {
          text: "🔥 2026年幼升小招生与统筹规则已发布，点击查看政策避坑指南（数据状态：官方政策已核验）。",
          action: "policy"
        };
      } else {
        todayRecommend = {
          text: "🔥 2026年幼升小升学时间线与对口范围持续校验中，点击查看公办学区查询（数据状态：16区对口校验中）。",
          action: "schoolDistrict"
        };
      }
    } else if (stage === "primary_to_junior") {
      if (month >= 4 && month <= 6) {
        todayRecommend = {
          text: "🔥 2026年小升初公民同招与入学安排正在进行，点击查看小升初政策避坑（数据状态：最新政策已校验）。",
          action: "policy"
        };
      } else {
        todayRecommend = {
          text: "🔥 2026年小升初招生政策与学区划片信息更新，点击查看对口查询（数据状态：2026数据待核验）。",
          action: "schoolDistrict"
        };
      }
    } else if (stage === "junior_middle") {
      todayRecommend = {
        text: "🔥 初一/初二阶段性规划，点击查看中考录取线提前看（数据状态：往年控制线已发布）。",
        action: "schools"
      };
    } else if (stage === "high_school") {
      todayRecommend = {
        text: "🔥 高中选科指导与大学专业规划库已更新，点击查看选科与强基综评（数据状态：2026选科库已就绪）。",
        action: "college"
      };
    } else {
      // 默认中考阶段 junior_high
      if (month === 6) {
        if (date >= 15 && date <= 25) {
          todayRecommend = {
            text: "🔥 2026年上海中考已于6月21日结束，现已开启估分通道，点击去估分自测（数据状态：估分系统已就绪）。",
            action: "estimate"
          };
        } else {
          todayRecommend = {
            text: "🔥 2026年中考已结束，往年录取分数线与本届招生计划已更新，点击查录取线（数据状态：招生计划已核验）。",
            action: "schools"
          };
        }
      } else {
        todayRecommend = {
          text: "🔥 2026年上海各级学校中考录取分数线预测与各区控制线已更新，点击查看（数据状态：历史控制线已就绪）。",
          action: "control"
        };
      }
    }