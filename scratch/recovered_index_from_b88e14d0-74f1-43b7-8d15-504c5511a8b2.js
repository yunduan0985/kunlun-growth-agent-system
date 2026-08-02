const schoolsData = require("../../data/schools.js");

function calculateShuttleRisk(privateSchool, publicSchool, residenceYears) {
  // 1. 计算民办摇中概率
  let lotteryChance = "高";
  let lotteryPercent = 95;
  let lotteryNote = "近年来该校招生数多于或等于报名人数，基本无需摇号，报名可直接录取。";
  
  if (privateSchool.tier === "一梯队" || privateSchool.name.includes("盛大") || privateSchool.name.includes("逸夫") || privateSchool.name.includes("爱菊")) {
    lotteryChance = "低";
    lotteryPercent = 25;
    lotteryNote = "该校常年属于爆表超额摇号的顶流民办，热度极高，摇中概率在15%-30%之间，需拼运气。";
  } else if (privateSchool.tier === "二梯队") {
    lotteryChance = "中";
    lotteryPercent = 55;
    lotteryNote = "该校属于热门民办，通常会有超额摇号情况，摇中概率在45%-65%之间。";
  }
  
  // 2. 计算公办未摇中退回后的统筹调剂风险
  let adjustRisk = "低";
  let adjustPercent = 10;
  let adjustNote = "您的对口公办生源相对宽松，即使您报名民办未中退回，在同类靠后的情况下被接收的概率依旧极大，安全垫极厚。";
  
  if (publicSchool.tier === "一梯队" || publicSchool.name.includes("明珠") || publicSchool.name.includes("闸北实验") || publicSchool.name.includes("建襄") || publicSchool.name.includes("高安路第一")) {
    adjustRisk = "极高";
    adjustPercent = 90;
    if (residenceYears >= 3) {
      adjustNote = `该对口小学是全市顶尖一梯队，常年爆满。虽然您的落户年限满 ${residenceYears} 年，但由于您报名民办未中退回时，排序属于“同类靠后”，极大概率会被落户更久以及未参加民办摇号的首批公办家庭挤出安全线，面临被统筹调剂至周边普通小学的命运。`;
    } else {
      adjustNote = `该对口小学是全市顶尖一梯队，学位极度紧张。您落户仅 ${residenceYears} 年（本就不满安全落户3年的门槛），且因民办未中退回排序垫底，几乎百分百会被统筹调剂到周边其他学位有空缺的普通公办。`;
    }
  } else if (publicSchool.tier === "二梯队") {
    adjustRisk = "中等";
    adjustPercent = 50;
    if (residenceYears >= 2) {
      adjustNote = `该校是优质二梯队公办。虽然您落户已满 ${residenceYears} 年，但因民办退回同类排序靠后，在生源大年仍然面临约 50% 的调剂可能。如果今年生源充裕，您可能会被挤入统筹名单。`;
    } else {
      adjustNote = `该校是优质二梯队公办。您落户时长仅 ${residenceYears} 年，本就属于踩线边缘，且叠加民办未中退回排序垫底，有 70% 左右的几率被统筹调剂。`;
    }
  }
  
  // 3. 给出抉择评级和决策建议
  let advice = "";
  let overallRating = "求稳"; 
  if (publicSchool.tier === "一梯队" || (publicSchool.tier === "二梯队" && residenceYears < 2)) {
    overallRating = "求稳";
    advice = "⚠️ 强烈警惕：您的对口公办小学学额非常宝贵且抢手，若因摇号民办失败导致退回，大概率直接滑档被调剂至薄弱小学。强烈建议您放弃民办摇号，稳妥直接选择对口公办入学。";
  } else {
    overallRating = "冲刺";
    advice = "✅ 建议博弈：您的对口公办小学学位相对充裕，或您落户时间非常扎实。即使民办小学摇号不中，退回对口公办的安全系数仍然处于中高水平。可以在第一志愿放心冲刺喜爱的民办小学。";
  }
  
  return {
    lotteryChance,
    lotteryPercent,
    lotteryNote,
    adjustRisk,
    adjustPercent,
    adjustNote,
    overallRating,
    advice
  };
}

Page({
  data: {
    statusBarHeight: 20,
    totalHeaderHeight: 56,
    districtOptions: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
    districtIndex: 1, // 默认徐汇
    privateSchools: [],
    publicSchools: [],
    privateNames: [],
    publicNames: [],
    
    selectedPrivateIndex: -1,
    selectedPublicIndex: -1,
    residenceYears: 2,
    
    showResult: false,
    result: null
  },

  onLoad() {
    // 适配胶囊高度
    const sys = wx.getSystemInfoSync();
    const menu = wx.getMenuButtonBoundingClientRect();
    const totalHeaderHeight = menu.bottom + 8;
    this.setData({
      statusBarHeight: sys.statusBarHeight,
      totalHeaderHeight
    });

    const defaultDistrict = this.data.districtOptions[this.data.districtIndex];
    this.filterSchoolsByDistrict(defaultDistrict);
  },

  filterSchoolsByDistrict(district) {
    const allPrimary = schoolsData.filter(s => s.track === "primary" && s.district === district);
    const privateSchools = allPrimary.filter(s => s.level === "民办");
    const publicSchools = allPrimary.filter(s => s.level === "公办");
    
    const privateNames = privateSchools.map(s => `${s.name} (${s.tier || '普通'})`);
    const publicNames = publicSchools.map(s => `${s.name} (${s.tier || '普通'})`);
    
    this.setData({
      privateSchools,
      publicSchools,
      privateNames,
      publicNames
    });
  },

  onDistrictChange(e) {
    const idx = Number(e.detail.value);
    const district = this.data.districtOptions[idx];
    this.filterSchoolsByDistrict(district);
    this.setData({
      districtIndex: idx,
      selectedPrivateIndex: -1,
      selectedPublicIndex: -1,
      showResult: false,
      result: null
    });
  },

  onPrivateChange(e) {
    this.setData({
      selectedPrivateIndex: Number(e.detail.value),
      showResult: false
    });
  },

  onPublicChange(e) {
    this.setData({
      selectedPublicIndex: Number(e.detail.value),
      showResult: false
    });
  },

  onYearsInput(e) {
    let val = parseFloat(e.detail.value) || 0;
    if (val < 0) val = 0;
    if (val > 10) val = 10;
    this.setData({ residenceYears: val });
  },

  startCalculate() {
    const { selectedPrivateIndex, selectedPublicIndex, privateSchools, publicSchools, residenceYears } = this.data;
    
    if (selectedPrivateIndex === -1) {
      wx.showToast({ title: "请选择目标民办小学", icon: "none" });
      return;
    }
    if (selectedPublicIndex === -1) {
      wx.showToast({ title: "请选择对口公办小学", icon: "none" });
      return;
    }
    
    const privateSchool = privateSchools[selectedPrivateIndex];
    const publicSchool = publicSchools[selectedPublicIndex];
    
    const result = calculateShuttleRisk(privateSchool, publicSchool, residenceYears);
    
    this.setData({
      showResult: true,
      result: {
        ...result,
        privateName: privateSchool.name,
        publicName: publicSchool.name
      }
    });
  },

  goBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.switchTab({ url: "/pages/home/home" });
    }
  }
});