    stageIndex: 3,
    userProfile: null,
    juniorHighProgress: null,
    welcomeJuniorSchool: "",
    welcomeSchoolRank: "",
    showSchoolSearch: false,
    schoolSearchKeyword: "",
    filteredSchools: []
  },

  onShow() {
    let stage = wx.getStorageSync("userStage") || "junior_high";
    const profile = wx.getStorageSync("userProfile") || null;
    if (profile && profile.grade) {
      const g = profile.grade;
      if (g === "幼儿园/幼升小") {
        stage = "kindergarten";
      } else if (g === "一年级" || g === "二年级" || g === "三年级" || g === "四年级" || g === "五年级") {
        stage = "primary_to_junior";
      } else if (g === "初一" || g === "初二" || g === "预备班" || g === "六年级" || g === "七年级" || g === "八年级") {
        stage = "junior_middle";
      } else if (g === "初三" || g === "九年级") {
        stage = "junior_high";
      } else if (g.includes("高")) {
        stage = "high_school";
      }
    }
    wx.setStorageSync("userStage", stage);
    this.updateDisplayCards(stage);

    if (!this.juniorOptions) {
      const admission = require("../../utils/admission");
      this.juniorOptions = admission.juniorOptions();
    }

    let juniorHighProgress = null;
    if (stage === "junior_high") {
      juniorHighProgress = this.evaluateJuniorHighProgress();
    }

    this.setData({
      userProfile: profile,
      juniorHighProgress
    });