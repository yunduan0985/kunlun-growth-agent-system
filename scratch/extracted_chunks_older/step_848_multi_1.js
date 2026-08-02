    const district = this.data.district || "全上海";
    const allRows = admission.rankingRows(safeMode, district, this.data.stage);
    
    let rows = allRows;
    if (district === "全上海" && (safeMode === "quotaSchool" || safeMode === "quotaSchoolPlan")) {
      rows = allRows.slice(0, 40);
    }

    if (safeMode === "vocational" && this.data.activeVocationalCategory && this.data.activeVocationalCategory !== "全部") {
      rows = allRows.filter(r => r.category === this.data.activeVocationalCategory);
    }
    
    const showFilter = !["control", "vocational", "international"].includes(safeMode);
    const yearOptions = this.yearOptions(safeMode);
    
    const hideSearchModes = ["control", "guide"];
    const showSearch = !hideSearchModes.includes(safeMode);
    
    let searchPlaceholder = "🔍 输入高中名称搜索分数线/计划...";
    if (safeMode === "quotaSchool") {
      searchPlaceholder = "🔍 默认仅展示样本，输入您的初中名检索全市 600+ 所学校名额...";
    } else if (safeMode === "quotaSchoolPlan") {
      searchPlaceholder = "🔍 默认仅展示样本，输入您的初中名检索全市 260+ 所学校计划...";
    } else if (safeMode === "vocational") {
      searchPlaceholder = "🔍 输入中职校/联办高校/专业名称搜索...";
    } else if (safeMode === "international") {
      searchPlaceholder = "🔍 输入学校名称/课程/特色搜索...";
    }

    let title = modes[safeMode];
    if (safeMode === "guide") {
      const stage = this.data.stage || "junior_high";
      if (stage === "kindergarten") title = "幼升小攻略指南";
      else if (stage === "primary_to_junior") title = "小升初时间线";
    }

    this.setData({
      loading: true,
      mode: safeMode,
      title,
      rows: [],
      allRows,
      keyword: "",
      showFilter,
      showSearch,
      searchPlaceholder,
      yearOptions,
      yearIndex: 0,
      year: yearOptions[0] || this.yearLabel(safeMode),
      querySub: this.querySub(safeMode),
      scoreScaleNote: this.scoreScaleNote(safeMode),
      activeGroup: activeGroup.key,
      visibleModes: modeOptions.filter((item) => activeGroup.modes.includes(item.mode))
    });