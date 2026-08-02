  goShortcut(event) {
    const { mode, page } = event.currentTarget.dataset;
    if (mode === "self" && (this.data.currentStage === "kindergarten" || this.data.currentStage === "primary_to_junior")) {
      this.setData({ showSanguoModal: true });
      return;
    }
    if (page === "resources") {
      this.navigateTo("/pages/resources/resources");
      return;
    }
    if (page === "policy") {
      this.navigateTo(`/pages/policy/policy?stage=${this.data.currentStage}`);
      return;
    }
    if (page === "flashcard") {
      this.navigateTo("/packages/flashcard/pages/index/index");
      return;
    }
    if (page === "schoolDistrict") {
      this.navigateTo("/packages/school-district/pages/index/index");
      return;
    }
    if (page === "college") {
      this.navigateTo("/packages/college/pages/index/index");
      return;
    }
    if (page === "shuttleCalculator") {
      this.navigateTo("/packages/school-district/pages/shuttle-calculator/index");
      return;
    }
    this.goRankings(event);
  },

  closeSanguoModal() {
    this.setData({ showSanguoModal: false });
  },

  goRankings(event) {
    const { mode, page } = event.currentTarget.dataset;
    if (page === "schoolDistrict") {
      this.navigateTo("/packages/school-district/pages/index/index");
      return;
    }
    if (page === "college") {
      this.navigateTo("/packages/college/pages/index/index");
      return;
    }
    if (mode === "guide") {
      this.navigateTo("/pages/rankings/rankings?mode=guide");
      return;
    }
    this.navigateTo(`/pages/rankings/rankings?mode=${mode || "unified"}`);
  },