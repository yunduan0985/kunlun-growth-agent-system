  completeWelcome() {
    const selected = this.data.stageOptions[this.data.stageIndex] || this.data.stageOptions[3];
    const stage = selected.value;
    wx.setStorageSync("userStage", stage);
    wx.setStorageSync("homeDistrict", this.data.welcomeDistrict);
    wx.setStorageSync("onboardingCompleted", true);

    if (stage === "junior_high") {
      const profile = wx.getStorageSync("userProfile") || {};
      profile.grade = "初三";
      profile.district = this.data.welcomeDistrict;
      profile.juniorSchool = this.data.welcomeJuniorSchool || "";
      profile.schoolRank = this.data.welcomeSchoolRank || "";
      wx.setStorageSync("userProfile", profile);
    } else {
      const profile = wx.getStorageSync("userProfile") || {};
      if (stage === "kindergarten") profile.grade = "幼儿园/幼升小";
      else if (stage === "primary_to_junior") profile.grade = "五年级";
      else if (stage === "junior_middle") profile.grade = "初二";
      else if (stage === "high_school") profile.grade = "高一";
      profile.district = this.data.welcomeDistrict;
      wx.setStorageSync("userProfile", profile);
    }

    this.updateDisplayCards(stage);
    
    let juniorHighProgress = null;
    if (stage === "junior_high") {
      juniorHighProgress = this.evaluateJuniorHighProgress();
    }

    this.setData({ 
      showWelcome: false,
      userProfile: wx.getStorageSync("userProfile") || null,
      juniorHighProgress
    });
    
    wx.showToast({ title: `档案已保存`, icon: "success" });
  },