  onShareTimeline() {
    return {
      title: "校情导航｜上海中考志愿、录取线和学校信息查询",
      query: ""
    };
  },

  evaluateJuniorHighProgress() {
    const profile = wx.getStorageSync("userProfile") || null;
    const report = wx.getStorageSync("lastRecommendation") || null;
    const history = wx.getStorageSync("recommendationHistory") || [];
    const savedSchools = wx.getStorageSync("savedSchoolCodes") || [];

    let steps = [
      { key: "profile", label: "孩子档案", status: "todo", desc: "确认区与初中" },
      { key: "estimate", label: "七科估分", status: "todo", desc: "预估总分区间" },
      { key: "strategy", label: "志愿方案", status: "todo", desc: "查看冲稳保结构" },
      { key: "compare", label: "学校比较", status: "todo", desc: "对比学校距离出口" },
      { key: "save", label: "保存与复盘", status: "todo", desc: "锁定方案以备考" }
    ];

    let action = {
      title: "填写孩子档案",
      desc: "由于名额分配计划与您就读的初中直接绑定，我们需要先知道您的中考区和就读初中。",
      btnText: "立即去建档",
      target: "profile"
    };

    // 1. 检查档案
    let profileCompleted = profile && profile.district && profile.juniorSchool;
    if (profileCompleted) {
      steps[0].status = "done";
      steps[0].desc = `${profile.district} · ${profile.juniorSchool}`;
      
      // 已建档，下一步引导估分
      action = {
        title: "完成七科估分",
        desc: "请使用按科精细估分工具，输入孩子各科预估分数，获取您的中考可信区间与冲稳保定位。",
        btnText: "去估分测算",
        target: "estimate"
      };
    }

    // 2. 检查估分/志愿方案
    let estimateCompleted = report && report.score;
    if (estimateCompleted) {
      steps[1].status = "done";
      steps[1].desc = `${report.score}分 (${report.estimateRange ? report.estimateRange.minScore + '-' + report.estimateRange.maxScore : '总分'})`;
      
      steps[2].status = "done";
      steps[2].desc = report.diagnostics ? `录取体检: ${report.diagnostics.summary}` : "方案已生成";

      // 检查保底志愿是否缺失
      const counts = report.diagnostics && report.diagnostics.counts ? report.diagnostics.counts : [];
      const hasSave = counts.some(c => (c.label === "保" || c.label === "低保") && c.count > 0);
      
      if (!hasSave) {
        action = {
          title: "确认保底志愿",
          desc: "⚠️ 警告：您的方案中缺少明确的“保底”志愿！后排断档有滑档落榜风险，建议补录保底学校。",
          btnText: "去优化志愿",
          target: "report"
        };
      } else if (!profile.schoolRank) {
        action = {
          title: "核对到校资格",
          desc: "💡 提示：名额分配到校名额高度绑定校内排名。建议在档案中补录校内排名，以便精准匹配录取线。",
          btnText: "完善校排",
          target: "profile"
        };
      } else {
        action = {
          title: "对比目标学校",
          desc: "已生成基本方案。您可以进入学校详情进行两两对比，核实出口性价比、通勤距离和寄宿资格。",
          btnText: "对比目标校",
          target: "compare"
        };
      }
    }

    // 3. 检查比较
    let compareCodes = wx.getStorageSync("compareSchoolCodes") || [];
    if (compareCodes.length >= 2) {
      steps[3].status = "done";
      steps[3].desc = `已对比 ${compareCodes.length} 所学校`;
    }

    // 4. 检查保存/复盘
    if (estimateCompleted && report.isLocked) {
      steps[4].status = "done";
      steps[4].desc = "方案已锁定保存";
      
      action = {
        title: "复盘志愿方案",
        desc: "您的参考志愿方案已锁定。建议与班主任老师或专业顾问再次核对，并关注当年官方招生文件的最终发布。",
        btnText: "查看我的方案",
        target: "report"
      };
    }

    return { steps, action };
  },

  tapWorkflowAction(event) {
    const { target } = event.currentTarget.dataset;
    if (target === "profile") {
      const profile = wx.getStorageSync("userProfile") || {};
      const homeDistrict = wx.getStorageSync("homeDistrict") || "浦东新区";
      this.setData({
        showWelcome: true,
        welcomeDistrict: profile.district || homeDistrict,
        welcomeJuniorSchool: profile.juniorSchool || "",
        welcomeSchoolRank: profile.schoolRank || ""
      });
    } else if (target === "estimate") {
      this.navigateTo("/pages/estimate/estimate");
    } else if (target === "report") {
      this.navigateTo("/pages/report/report");
    } else if (target === "compare") {
      this.navigateTo("/pages/compare/compare");
    }
  },

  inputSchoolRank(event) {
    this.setData({
      welcomeSchoolRank: event.detail.value
    });
  },

  openSchoolSearch() {
    this.setData({
      showSchoolSearch: true,
      schoolSearchKeyword: "",
      filteredSchools: this.juniorOptions || []
    });
  },

  inputSchoolSearch(event) {
    const keyword = event.detail.value;
    const filtered = (this.juniorOptions || []).filter(item => item.includes(keyword));
    this.setData({
      schoolSearchKeyword: keyword,
      filteredSchools: filtered
    });
  },

  clearSchoolSearch() {
    this.setData({
      schoolSearchKeyword: "",
      filteredSchools: this.juniorOptions || []
    });
  },

  selectSchool(event) {
    const name = event.currentTarget.dataset.name;
    this.setData({
      welcomeJuniorSchool: name,
      showSchoolSearch: false
    });
  },

  closeSchoolSearch() {
    this.setData({
      showSchoolSearch: false
    });
  }
});