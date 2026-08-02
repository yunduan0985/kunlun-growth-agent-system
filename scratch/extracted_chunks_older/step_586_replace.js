  updateDisplayCards(stage) {
    const allCards = this.data.topCards;
    let filtered = [];
    let quickEntries = [];
    if (stage === "kindergarten") {
      const allowedModes = ["schoolDistrict", "shuttleCalculator", "policy", "guide", "self"];
      filtered = allCards.filter(c => {
        const key = c.mode || c.page;
        return allowedModes.includes(key);
      }).map(c => {
        if (c.page === "schoolDistrict") return { ...c, title: "公办学区查询", sub: "五年一户及落户对口" };
        if (c.page === "policy") return { ...c, title: "幼升小政策避坑", sub: "公民同招统筹规则" };
        if (c.mode === "guide") return { ...c, title: "幼升小攻略指南", sub: "升学时间线与材料清单" };
        if (c.mode === "self") return { ...c, title: "三公及名校自招", sub: "上实/上外/浦外备考" };
        return c;
      });
      quickEntries = [
        { type: "district", label: "查幼升小对口" },
        { type: "policy", label: "看入学政策" },
        { type: "sanguo", label: "了解三公招生" }
      ];
    } else if (stage === "primary_to_junior") {
      const allowedModes = ["schoolDistrict", "policy", "guide", "self", "shuttleCalculator"];
      filtered = allCards.filter(c => allowedModes.includes(c.mode || c.page)).map(c => {
        if (c.page === "schoolDistrict") return { ...c, title: "小升初对口查询", sub: "学区、对口与入学安排" };
        if (c.page === "policy") return { ...c, title: "小升初政策避坑", sub: "公民同招与入学规则" };
        if (c.mode === "guide") return { ...c, title: "小升初时间线", sub: "关键节点与材料清单" };
        if (c.mode === "self") return { ...c, title: "三公及特色招生", sub: "先核对当年官方办法" };
        if (c.page === "shuttleCalculator") return { ...c, title: "民办摇号自测", sub: "概率计算与超额统筹" };
        return c;
      });
      quickEntries = [
        { type: "district", label: "查小升初对口" },
        { type: "policy", label: "看招生政策" },
        { type: "sanguo", label: "了解特色招生" }
      ];
    } else if (stage === "junior_middle") {
      const allowedModes = ["schools", "international", "exit", "self", "policy", "flashcard", "control", "vocational"];
      filtered = allCards.filter(c => {
        const key = c.mode || c.page;
        return allowedModes.includes(key);
      }).map(c => {
        if (c.mode === "schools") return { ...c, sub: "中考录取线提前看" };
        if (c.page === "flashcard") return { ...c, title: "初中提分闪卡", sub: "中考高频考点必背" };
        return c;
      });
      quickEntries = [
        { type: "high", label: "找目标高中" },
        { type: "schools", label: "看历年录取线" },
        { type: "flashcard", label: "查中考知识点" }
      ];
    } else if (stage === "high_school") {
      const allowedModes = ["college", "policy", "exit"];
      filtered = allCards.filter(c => {
        const key = c.mode || c.page;
        return allowedModes.includes(key);
      }).map(c => {
        if (c.mode === "exit") return { ...c, title: "往届高考出口", sub: "清北与高校综评去向" };
        if (c.page === "college") return { ...c, title: "高考选科规划", sub: "大学专业与限选要求" };
        return c;
      });
      quickEntries = [
        { type: "college", label: "查大学专业" },
        { type: "college", label: "看选科要求" },
        { type: "policy", label: "看综评与强基" }
      ];
    } else {
      // 默认中考阶段 junior_high
      const allowedModes = ["schools", "control", "self", "quotaSchoolPlan", "guide", "exit", "vocational", "international", "flashcard", "policy"];
      filtered = allCards.filter(c => {
        const key = c.mode || c.page;
        return allowedModes.includes(key);
      }).map(c => {
        if (c.page === "flashcard") return { ...c, title: "中考冲刺闪卡", sub: "考前核心知识点过关" };
        return c;
      });
      quickEntries = [
        { type: "schools", label: "看历年录取线" },
        { type: "high", label: "找目标高中" },
        { type: "estimate", label: "开始志愿测算" }
      ];
    }