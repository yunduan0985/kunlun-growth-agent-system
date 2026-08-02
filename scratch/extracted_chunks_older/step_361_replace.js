  closeSchoolSearch() {
    this.setData({
      showSchoolSearch: false
    });
  },

  retryConnect() {
    wx.showLoading({ title: "正在重试连接...", mask: true });
    const app = getApp();
    app.syncEducationData().then(() => {
      wx.hideLoading();
      const isOfflineMode = app.globalData.isOfflineMode;
      this.setData({ isOfflineMode });
      if (isOfflineMode) {
        wx.showToast({ title: "依然处于离线状态", icon: "none" });
      } else {
        wx.showToast({ title: "已恢复在线，数据已更新", icon: "success" });
        this.onShow();
      }
    }).catch((err) => {
      console.error(err);
      wx.hideLoading();
      wx.showToast({ title: "网络重试失败", icon: "none" });
    });
  }
});