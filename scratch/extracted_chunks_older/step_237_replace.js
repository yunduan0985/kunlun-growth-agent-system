  onShow() {
    const rawReport = wx.getStorageSync("lastRecommendation") || null;
    const savedTodoList = wx.getStorageSync("reportTodoList") || null;
    const defaultTodoList = [
      { id: 'quota', title: '核实到校名额资格', desc: '根据孩子在校内排位，核查本校分到的具体高中名额是否匹配。', checked: false },
      { id: 'crossDistrict', title: '确认跨区及自招限制', desc: '跨区报考受限，确认孩子是否具备跨区自招或民办填报资格。', checked: false },
      { id: 'plan', title: '对比当年招生计划波动', desc: '目前部分数据基于往年，需核对今年最新招生计划的增减波动。', checked: false },
      { id: 'eval', title: '确认综合素质评价得分', desc: '名额分配包含 50 分综评，需向班主任确认是否有扣分风险。', checked: false },
      { id: 'private', title: '确认民办高中意向与学费', desc: '如有填报民办高中，需确认其学费预算并防范调剂统筹风险。', checked: false }
    ];
    const todoList = savedTodoList ? defaultTodoList.map(defItem => {
      const saved = savedTodoList.find(s => s.id === defItem.id);
      return saved ? { ...defItem, checked: saved.checked } : defItem;
    }) : defaultTodoList;

    const report = rawReport ? {
      quotaSchoolPlan2026: [],
      quotaDistrict: [],
      quotaSchool: [],
      unified: [],
      valueSchools: [],
      commuteRows: [],
      targetSchools: [],
      coverage: [],
      dataTrust: { cards: [], sourceMix: [] },
      ...rawReport
    } : null;

    let availableSchools = [];
    let availableSchoolNames = [];
    let hasScoreRange = false;
    let lowScore = 0;
    let avgScore = 0;
    let highScore = 0;
    let activeScoreSegment = 0;

    let lowDiagnostics = null;
    let avgDiagnostics = null;
    let highDiagnostics = null;

    if (report) {
      const district = report.district;
      const allSchools = admission.data.schools || [];
      availableSchools = allSchools.filter(s => {
        return s.district === district || s.district === "全市" || s.ownership === "委属";
      }).sort((a, b) => (b.minScore2025 || 0) - (a.minScore2025 || 0));
      availableSchoolNames = availableSchools.map(s => `${s.name} (${s.minScore2025 ? s.minScore2025 + '分' : '暂无分数线'})`);

      // 解析估分区间段
      if (report.estimateRange && Number(report.estimateRange.minScore) !== Number(report.estimateRange.maxScore)) {
        hasScoreRange = true;
        lowScore = Number(report.estimateRange.minScore);
        highScore = Number(report.estimateRange.maxScore);
        avgScore = Math.round((lowScore + highScore) / 2);
        activeScoreSegment = Number(report.score);

        // 1. 计算低估分诊断
        try {
          const lowRecommendation = admission.generateRecommendation({
            score: lowScore,
            juniorSchool: report.juniorSchool,
            district: report.district,
            schoolRank: report.schoolRank,
            privateHigh: report.privateHigh || false,
            crossDistrictHigh: report.crossDistrictHigh || false,
            targetSchools: report.targetSchools ? report.targetSchools.map(s => s.name || s.highSchool) : [],
            homeLocation: report.homeLocation,
            homeAddress: report.homeAddress
          });
          lowDiagnostics = lowRecommendation.diagnostics;
        } catch (e) {
          console.error("calculate low score recommendation error:", e);
        }

        // 2. 计算均值诊断
        try {
          const avgRecommendation = admission.generateRecommendation({
            score: avgScore,
            juniorSchool: report.juniorSchool,
            district: report.district,
            schoolRank: report.schoolRank,
            privateHigh: report.privateHigh || false,
            crossDistrictHigh: report.crossDistrictHigh || false,
            targetSchools: report.targetSchools ? report.targetSchools.map(s => s.name || s.highSchool) : [],
            homeLocation: report.homeLocation,
            homeAddress: report.homeAddress
          });
          avgDiagnostics = avgRecommendation.diagnostics;
        } catch (e) {
          console.error("calculate avg score recommendation error:", e);
        }

        // 3. 计算高估分诊断
        try {
          const highRecommendation = admission.generateRecommendation({
            score: highScore,
            juniorSchool: report.juniorSchool,
            district: report.district,
            schoolRank: report.schoolRank,
            privateHigh: report.privateHigh || false,
            crossDistrictHigh: report.crossDistrictHigh || false,
            targetSchools: report.targetSchools ? report.targetSchools.map(s => s.name || s.highSchool) : [],
            homeLocation: report.homeLocation,
            homeAddress: report.homeAddress
          });
          highDiagnostics = highRecommendation.diagnostics;
        } catch (e) {
          console.error("calculate high score recommendation error:", e);
        }
      }
    }

    this.setData({
      report,
      reportSaved: Boolean(report),
      availableSchools,
      availableSchoolNames,
      hasScoreRange,
      lowScore,
      avgScore,
      highScore,
      activeScoreSegment,
      lowDiagnostics,
      avgDiagnostics,
      highDiagnostics,
      todoList
    }, () => {
      this.applyFiltersAndSorts();
    });