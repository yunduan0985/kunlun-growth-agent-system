  tapRecommend(event) {
    const { action } = event.currentTarget.dataset;
    if (action === "control") {
      this.navigateTo("/pages/rankings/rankings?mode=control");
    } else if (action === "schools") {
      this.navigateTo("/pages/rankings/rankings?mode=schools");
    } else if (action === "estimate") {
      this.navigateTo("/pages/estimate/estimate");
    } else if (action === "policy") {
      this.navigateTo(`/pages/policy/policy?stage=${this.data.currentStage}`);
    } else if (action === "schoolDistrict") {
      this.navigateTo("/packages/school-district/pages/index/index");
    } else if (action === "college") {
      this.navigateTo("/packages/college/pages/index/index");
    }
  },