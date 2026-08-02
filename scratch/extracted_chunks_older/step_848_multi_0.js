  onLoad(options) {
    const userProfile = wx.getStorageSync("userProfile") || {};
    const stage = options.stage || userProfile.currentStage || "junior_high";
    this.setData({ stage });
    this.setMode(options.mode || "unified");
    if (options.score || options.district) {
      this.handleLinkedFilter(options.score, options.district);
    }
  },