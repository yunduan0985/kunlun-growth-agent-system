  navigateTo(url) {
    if (this.navigating) return;
    this.navigating = true;
    setTimeout(() => { this.navigating = false; }, 1000);
    wx.navigateTo({ url });
  },

  tapRecommend(event) {
    const { action } = event.currentTarget.dataset;
    if (action === "control") {
      this.navigateTo("/pages/rankings/rankings?mode=control");
    } else if (action === "schools") {
      this.navigateTo("/pages/rankings/rankings?mode=schools");
    }
  },

  goEstimate() {
    this.navigateTo("/pages/estimate/estimate");
  },

  goQuickEntry(event) {
    const { type } = event.currentTarget.dataset;
    if (type === "sanguo") {
      this.setData({ showSanguoModal: true });
      return;
    }

    if (type === "junior" || type === "district") {
      this.navigateTo("/packages/school-district/pages/index/index");
    } else if (type === "high") {
      this.navigateTo("/pages/rankings/rankings?mode=schools");
    } else if (type === "schools") {
      this.navigateTo("/pages/rankings/rankings?mode=unified");
    } else if (type === "estimate") {
      this.navigateTo("/pages/estimate/estimate");
    } else if (type === "policy") {
      this.navigateTo(`/pages/policy/policy?stage=${this.data.currentStage}`);
    } else if (type === "flashcard") {
      this.navigateTo("/packages/flashcard/pages/index/index");
    } else if (type === "college") {
      this.navigateTo("/packages/college/pages/index/index");
    }
  },