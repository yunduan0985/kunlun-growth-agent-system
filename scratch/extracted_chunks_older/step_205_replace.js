  onShow() {
    const rawReport = wx.getStorageSync("lastRecommendation") || null;
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
      highDiagnostics
    }, () => {
      this.applyFiltersAndSorts();
    });
  },