const rawSchoolsData = require("../../data/schools.js").SCHOOL_DISTRICT_DATA || [];
const schoolsData = rawSchoolsData.map(s => {
  const isPrivate = /民办|协和|尚德|惠立|宏文|万科|康德|光华|东鼎|华曜|未来|双语|外籍|逸夫|盛大|爱菊|平和|包玉刚|星河湾|西外|新世纪|金苹果|赫贤|世外|启能|中芯|恒洋|欣竹|进才书院|今日学校|康城学校|更新学校|培佳|克勒|至德|锦秋|上宝|文来|文绮|燎原|博世凯|德英乐|圣华紫竹|德闳|新黄浦|金盟|杭州湾|新复兴|新北郊|明珠中学|震旦|永昌|同洲|兰生|杨波|新和|扬波|田家炳/.test(s.name);
  return {
    ...s,
    level: isPrivate ? "民办" : s.level
  };
});