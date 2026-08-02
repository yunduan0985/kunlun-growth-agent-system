    if (mode === "guide") {
      const stage = this.data.stage || "junior_high";
      if (stage === "kindergarten") return "展示上海市幼升小招生实施时间线、材料清单及同招统筹规则。";
      if (stage === "primary_to_junior") return "展示上海市小升初招生实施时间线、对口形式及特色初中备考建议。";
      return "按区展示中考志愿填报策略。用于家长先判断路径，最终仍需结合孩子分数、校排、到校资格和当年官方计划核对。";
    }
    return "先定路径，再填学校。最终以上海教育考试院及学校官方发布为准。";