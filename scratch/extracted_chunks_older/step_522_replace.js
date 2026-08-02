  async syncEducationData() {
    const sync = require("./utils/sync");
    const admission = require("./utils/admission");
    try {
      const res = await sync.loadEducationData();
      if (res && res.data) {
        admission.applyCloudData(res.data);
      }
      this.globalData.isOfflineMode = res ? res.offline : true;
    } catch(err) {
      console.error("同步云端数据出错:", err);
      this.globalData.isOfflineMode = true; 
    }
  },