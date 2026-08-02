  onLaunch() {
    this.initFlashcardStorage();
    this.checkFlashcardDue();
    this.syncEducationData();
  },

  async syncEducationData() {
    const sync = require("./utils/sync");
    const admission = require("./utils/admission");
    try {
      const res = await sync.loadEducationData();
      admission.applyCloudData(res.data);
      this.globalData.isOfflineMode = res.offline;
    } catch(err) {
      console.error("同步云端数据出错:", err);
      this.globalData.isOfflineMode = true; 
    }
  },