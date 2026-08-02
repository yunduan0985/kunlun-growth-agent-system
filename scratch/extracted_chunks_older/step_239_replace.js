  goQuotaDistrictRankings(event) {
    const { score, district } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/rankings/rankings?mode=quotaDistrict&score=${score || ""}&district=${encodeURIComponent(district || "")}`
    });
  },

  toggleTodo(e) {
    const { id } = e.currentTarget.dataset;
    const todoList = this.data.todoList.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    this.setData({ todoList });
    wx.setStorageSync("reportTodoList", todoList);
  }
});