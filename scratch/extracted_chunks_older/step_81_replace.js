  goEstimate() {
    if (this.navigating) return;
    this.navigating = true;
    setTimeout(() => { this.navigating = false; }, 1000);
    wx.navigateTo({ url: "/pages/estimate/estimate" });
  },

  goQuickEntry(event) {
    const { type } = event.currentTarget.dataset;
    if (type === "sanguo") {
      this.setData({ showSanguoModal: true });
      return;
    }
    if (this.navigating) return;
    this.navigating = true;
    setTimeout(() => { this.navigating = false; }, 1000);

    if (type === "junior" || type === "district") {
      wx.navigateTo({ url: "/packages/school-district/pages/index/index" });
    } else if (type === "high") {
      wx.navigateTo({ url: "/pages/rankings/rankings?mode=schools" });
    } else if (type === "schools") {
      wx.navigateTo({ url: "/pages/rankings/rankings?mode=unified" });
    } else if (type === "estimate") {
      wx.navigateTo({ url: "/pages/estimate/estimate" });
    } else if (type === "policy") {
      wx.navigateTo({ url: `/pages/policy/policy?stage=${this.data.currentStage}` });
    } else if (type === "flashcard") {
      wx.navigateTo({ url: "/packages/flashcard/pages/index/index" });
    } else if (type === "college") {
      wx.navigateTo({ url: "/packages/college/pages/index/index" });
    }
  },