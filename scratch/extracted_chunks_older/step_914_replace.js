function rankingRows(mode, district, stage) {
  const wanted = normalizeFilterDistrict(district);
  if (mode === "schools") {
    return data.schools
      .filter((school) => !wanted || normalizeDistrict(school.district).includes(wanted))
      .slice()
      .sort((a, b) => {
        const aSelf = a.selfAdmission2026 ? a.selfAdmission2026.totalPlan || 0 : 0;
        const bSelf = b.selfAdmission2026 ? b.selfAdmission2026.totalPlan || 0 : 0;
        const aQuota = a.quotaDistrict2026 ? a.quotaDistrict2026.planCount || 0 : 0;
        const bQuota = b.quotaDistrict2026 ? b.quotaDistrict2026.planCount || 0 : 0;
        return (b.minScore2025 || 0) - (a.minScore2025 || 0)
          || bQuota - aQuota
          || bSelf - aSelf
          || String(a.code).localeCompare(String(b.code));
      })
      .slice(0, 400);
  }
  if (mode === "quotaSchoolPlan") return groupQuotaToSchoolPlan2026(district).slice(0, 700);
  if (mode === "quotaSchool") return groupQuotaToSchool(district).slice(0, 700);
  if (mode === "exit") {
    return data.schools
      .filter((school) => school.exit2025)
      .filter((school) => !wanted || normalizeDistrict(school.district).includes(wanted))
      .slice()
      .sort((a, b) => exitPower(b) - exitPower(a))
      .slice(0, 200);
  }
  if (mode === "self") {
    return data.selfAdmissionRows
      .filter((row) => row.totalPlan)
      .filter((row) => !wanted || normalizeDistrict(row.district).includes(wanted))
      .slice()
      .sort((a, b) => b.totalPlan - a.totalPlan)
      .slice(0, 150);
  }
  if (mode === "quotaDistrictPlan") {
    return data.quotaToDistrictRows
      .filter((row) => !wanted || normalizeDistrict(row.planArea || row.schoolDistrict).includes(wanted))
      .slice()
      .sort((a, b) => b.planCount - a.planCount);
  }
  if (mode === "quotaDistrict") {
    if (data.quotaToDistrictScoreRows && data.quotaToDistrictScoreRows.length) {
      return data.quotaToDistrictScoreRows
          .filter((row) => !wanted || normalizeDistrict(row.sourceDistrictLabel || row.admissionDistrict).includes(wanted))
          .slice()
          .sort((a, b) => b.minScore - a.minScore)
          .map((row) => ({ ...row, ...quotaScoreInfo(row.minScore) }))
          .slice(0, 1000);
    }
    return data.quotaToDistrictRows
      .filter((row) => !wanted || normalizeDistrict(row.planArea || row.schoolDistrict).includes(wanted))
      .slice()
      .sort((a, b) => b.planCount - a.planCount);
  }
  if (mode === "vocational") {
    return vocationalData;
  }
  if (mode === "international") {
    return data.schools
      .filter((school) => school.code && String(school.code).startsWith("999"))
      .slice()
      .sort((a, b) => {
        return String(a.code).localeCompare(String(b.code));
      });
  }
  if (mode === "guide") {
    const currentStage = stage || "junior_high";
    const integrationWarningCard = {
      title: "外省市户籍中考积分预警",
      text: "非沪籍学生在沪中考报考高中，家长须持居住证且积分达120分。幼小初阶段家长应尽早规划社保及积分，防范初三报名时因积分不足无法报考。"
    };

    if (currentStage === "kindergarten") {
      return [
        integrationWarningCard,
        {
          title: "幼升小升学关键节点时间线",
          text: "1. 4月中：各区公布招生方案和对口范围。\n2. 5月上旬：幼升小登记及民办网报。\n3. 5月中旬：公办首批验证，民办摇号录取。\n4. 5月下旬：民办调剂，公办次批验证。\n5. 8月中旬：陆续发送小学录取通知书。"
        },
        {
          title: "幼升小信息登记所需证明材料",
          text: "1. 本市户籍：户口簿、出生证、接种证；选择居住地入学需居住登记表及房产证。\n2. 外省市户籍：户口簿、出生证、接种证、居住证（凭证）及家长社保证明。"
        },
        {
          title: "公民同招与统筹“同类排序靠后”规则",
          text: "1. 执行公民同招，公办和民办小学只能二选一报名。\n2. 报名民办未中退回公办时，按同类排序靠后原则统筹。\n3. 对口热门小学的家庭报名民办未中退回极易面临调剂风险，建议直接报公办求稳。"
        }
      ];
    } else if (currentStage === "primary_to_junior") {
      return [
        integrationWarningCard,
        {
          title: "小升初升学关键节点时间线",
          text: "1. 4月中旬：各区公布小升初政策及对口范围。\n2. 4月下旬：五年级核对并确认电子学籍及入学信息。\n3. 5月中旬：民办初中报名与摇号录取。\n4. 5月下旬：民办初中调剂，开展公办分配。\n5. 8月中旬：发送初中录取通知书。"
        },
        {
          title: "小升初入学对口形式（户籍与学籍）",
          text: "1. 户籍对口：按学生户籍对口公办初中（如黄浦）。\n2. 学籍对口：就读小学直升或对口初中（如徐汇、杨浦）。\n3. 跨区回户籍地：回户籍或居住地升学需4月下旬前办妥申请。"
        },
        {
          title: "三公学校与特色初中备考参考",
          text: "1. 三公学校（上外附中、上实、浦外）全市招生，不占对口及民办名额。\n2. 被三公正式录取的学生，不再参加公办分配和民办摇号。\n3. 特色初中主要面向本区特长招生，录取较早，需关注官方简章。"
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
      const defaultRows = rows.length ? rows : [
        { title: "先定路径，再填学校", text: "自招、到区、到校、1至15不是一张表里的同类选项。先判断孩子能走哪条路，再排学校。" },
        { title: "不要只看进口线", text: "同分段学校必须同时看出口、通勤、名额容量和孩子性格。高进低出或通勤过重，都要谨慎。" },
        { title: "保底不是随便填", text: "保底学校要有真实录取空间，且不能和前面学校分数过近。志愿表最怕前面全冲，后面不稳。" }
      ];
      return [integrationWarningCard, ...defaultRows];
    }
  }