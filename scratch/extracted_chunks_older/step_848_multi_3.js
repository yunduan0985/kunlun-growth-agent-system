    if (mode === "guide") {
      const stage = this.data.stage || "junior_high";
      if (stage === "kindergarten") return "幼升小攻略：提供时间线、材料与同招验证要点。";
      if (stage === "primary_to_junior") return "小升初时间线：提供升学节点、对口与特色招生核对指南。";
      return district === "全上海"
        ? `已接入16区志愿填报策略，当前显示 ${count} 区。`
        : `${district} 志愿填报策略：先看路径和梯度，再回到推荐页生成具体志愿方案。`;
    }