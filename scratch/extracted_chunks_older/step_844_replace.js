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
      this.navigateTo(`/pages/rankings/rankings?mode=guide&stage=${this.data.currentStage}`);
      return;
    }
    this.navigateTo(`/pages/rankings/rankings?mode=${mode || "unified"}&stage=${this.data.currentStage}`);
  },