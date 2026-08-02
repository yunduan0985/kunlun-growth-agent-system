  if (mode === "guide") {
    const currentStage = stage || "junior_high";
    if (currentStage === "kindergarten") {
      return [
        {
          title: "幼升小升学关键节点时间线",
          text: "1. 4月中旬：各区公布义务教育招生实施方案和对口范围。\n2. 5月上旬：开展幼升小信息登记和民办小学网上报名。\n3. 5月中旬：公办小学第一批验证；民办小学电脑随机录取（摇号）。\n4. 5月下旬：民办小学调剂志愿录取，公办小学第二批验证。\n5. 8月中旬：开始陆续发送公办/民办小学录取通知书。"
        },
        {
          title: "幼升小信息登记所需证明材料",
          text: "1. 本市户籍：户口簿、出生医学证明、预防接种证；如选择居住地入学需提供居住地登记申请表、房产证。\n2. 外省市户籍：户口簿、出生医学证明、预防接种证、孩子及家长的上海市居住证或居住登记凭证，以及家长在本市缴纳社保的证明。"
        },
        {
          title: "公民同招与统筹“同类排序靠后”规则",
          text: "1. 上海市执行“公民同招”政策，公办与民办小学只能选择一类进行首批报名。\n2. 报名民办小学且未被电脑随机摇中的考生，在第二批公办小学验证时，按照“同类排序靠后”原则进行入学统筹。\n3. 如果您对口的公办小学非常热门（一梯队/爆表），一旦报名民办未中退回，由于排序被置于同类最后，极概率会被统筹到周边的普通小学。对口热门小学的家庭建议求稳，直接报公办。"
        }
      ];
    } else if (currentStage === "primary_to_junior") {
      return [
        {
          title: "小升初升学关键节点时间线",
          text: "1. 4月中旬：各区公布小升初招生政策、入学安排及公办对口范围。\n2. 4月下旬：小学五年级学生家长核对并确认电子学籍信息、入学关键信息。\n3. 5月中旬：民办初中进行网上报名与摇号录取。\n4. 5月下旬：民办初中调剂志愿录取，开展公办初中分配工作。\n5. 8月中旬：陆续发送初中录取通知书。"
        },
        {
          title: "小升初入学对口形式（户籍与学籍）",
          text: "1. 户籍对口：按学生户籍所在地对口划分公办初中（如黄浦区等）。\n2. 学籍对口：按学生就读小学直接对口升入对应的公办初中（如徐汇区、杨浦区等九年一贯制或直升对口）。\n3. 跨区回户籍地：若学生五年级在A区就读，欲回户籍或居住地B区升初中，需在4月下旬前办理跨区回户籍申请。"
        },
        {
          title: "三公学校与特色初中备考参考",
          text: "1. “三公”学校（上外附中、上海实验学校、浦东外国语学校）在全市范围内招生，不占用到口和民办报名额度。\n2. 凡被三公学校正式录取的学生，不再参与后续的公办分配和民办初中摇号。\n3. 特色初中主要面向本区进行特定外语或体育艺术类特长招生，报名与录取时间较早，家长需密切关注官方发布的特长招生简章。"
        }
      ];
    } else {
      const strategies = strategyData.STRATEGY_DB || {};
      const districtNames = wanted
        ? Object.keys(strategies).filter((districtName) => {
          const actual = normalizeDistrict(districtName);
          return actual.includes(wanted) || wanted.includes(actual);
        })
        : shanghaiDistricts;
      const rows = districtNames
        .filter((districtName) => strategies[districtName])
        .map((districtName) => {
          const strategy = strategies[districtName];
          return {
            title: strategy.title || `${districtName} 志愿填报攻略`,
            text: [
              ...(strategy.tactics || []).map((item, index) => `${index + 1}. ${item}`),
              strategy.leakSchools && strategy.leakSchools.length ? `可重点核对的外区/洼地校：${strategy.leakSchools.join("、")}` : ""
            ].filter(Boolean).join("\n")
          };
        });
      return rows.length ? rows : [
        { title: "先定路径，再填学校", text: "自招、到区、到校、1至15不是一张表里的同类选项。先判断孩子能走哪条路，再排学校。" },
        { title: "不要只看进口线", text: "同分段学校必须同时看出口、通勤、名额容量和孩子性格。高进低出或通勤过重，都要谨慎。" },
        { title: "保底不是随便填", text: "保底学校要有真实录取空间，且不能和前面学校分数过近。志愿表最怕前面全冲，后面不稳。" }
      ];
    }
  }