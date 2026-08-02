  recalculate() {
    if (this.data.estimateMode === "total") {
      const minScore = this.data.minEstimateScore ? Math.min(750, Number(this.data.minEstimateScore)) : 0;
      const maxScore = this.data.maxEstimateScore ? Math.min(750, Number(this.data.maxEstimateScore)) : 0;
      
      const completed = minScore > 0 && maxScore > 0;
      const completionText = completed ? "已输入总分区间" : "请输入总分区间";
      const trustRangeText = completed
        ? "⚠️ 提示：直接估总分易受主观偏差影响，推荐使用【按科精细估分】以获得更准确的误差浮动区间。"
        : "";

      this.setData({
        rawTotal: minScore,
        correctedTotal: maxScore,
        completionRate: completed ? 100 : 0,
        completionText,
        trustRangeText,
        correctionText: minScore && maxScore
          ? `直接填写总分段: ${minScore} ~ ${maxScore} 分`
          : "请输入预估最低总分和最高总分"
      });
      return;
    }

    const values = {};
    let filledCount = 0;
    this.data.subjects.forEach((item) => {
      values[item.key] = clamp(item.value, 0, item.max);
      if (item.value !== "" && Number(item.value) > 0) {
        filledCount += 1;
      }
    });

    const rawTotal = Object.keys(values).reduce((sum, key) => sum + values[key], 0);
    const correctedTotal = Math.min(750, Number(rawTotal.toFixed(1)));
    
    const completionRate = Math.round((filledCount / 7) * 100);
    const completionText = `估分完整度: ${filledCount}/7 科 (${completionRate}%)`;
    
    let trustRangeText = "";
    if (filledCount === 7) {
      const lowVal = Math.max(350, Math.round(correctedTotal - 8));
      const highVal = Math.min(750, Math.round(correctedTotal + 5));
      trustRangeText = `💡 可信区间提示：结合往年阅卷偏差，您的真实得分大约在 [${lowVal}, ${highVal}] 分。报告中将自动平铺低估、中位、高估三个情景的诊断对比。`;
    } else {
      trustRangeText = `💡 提示：您当前已填 ${filledCount} 科，请填满 7 科以启用阅卷偏差可信区间与多情景模拟分析。`;
    }

    this.setData({
      rawTotal: Number(rawTotal.toFixed(1)),
      correctedTotal,
      completionRate,
      completionText,
      trustRangeText,
      correctionText: "按填写分数直接合计，不自动加分"
    });
  },

  submit() {
    let score = 0;
    let minScore = 0;
    let maxScore = 0;
    
    if (this.data.estimateMode === "total") {
      minScore = this.data.minEstimateScore ? Number(this.data.minEstimateScore) : 0;
      maxScore = this.data.maxEstimateScore ? Number(this.data.maxEstimateScore) : 0;
      
      if (!minScore && !maxScore) {
        wx.showToast({ title: "请输入预估总分", icon: "none" });
        return;
      }
      if (!minScore) minScore = maxScore;
      if (!maxScore) maxScore = minScore;
      
      if (minScore < 350 || maxScore > 750) {
        wx.showToast({ title: "分数需在 350-750 之间", icon: "none" });
        return;
      }
      
      if (minScore > maxScore) {
        wx.showToast({ title: "最低分不能高于最高分", icon: "none" });
        return;
      }
      
      score = Math.round((minScore + maxScore) / 2);
    } else {
      score = Number(this.data.correctedTotal);
      
      // 计算已填写的科目数量
      let filledCount = 0;
      this.data.subjects.forEach((item) => {
        if (item.value !== "" && Number(item.value) > 0) {
          filledCount += 1;
        }
      });

      if (!score || score < 350 || score > 750) {
        wx.showToast({ title: "请先估分，分数需在 350-750 之间", icon: "none" });
        return;
      }

      // 如果 7 科全部估完，自动设置可信区间以提供报告三情景模拟
      if (filledCount === 7) {
        minScore = Math.max(350, Math.round(score - 8));
        maxScore = Math.min(750, Math.round(score + 5));
      } else {
        minScore = score;
        maxScore = score;
      }
    }