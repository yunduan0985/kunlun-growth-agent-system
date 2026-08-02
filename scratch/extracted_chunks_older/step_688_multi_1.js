      title: "最后定查看动作",
      text: `${leadIntent}，建议用15分钟把目标校、自招和初高衔接节奏定清楚。`
    }
  ];
}

function getJuniorCompetitionFactor(juniorName) {
  if (!juniorName) return 1.0;
  const strongKeywords = [
    "华二", "华师大", "复旦", "交大", "上中", "上海中学", "上外", "实验学校", "市北", "兰生",
    "立达", "存志", "进才", "建平", "张江", "世外", "西南位育", "西南模范", "新华初", "迅行",
    "民办"
  ];
  const isStrong = strongKeywords.some(keyword => juniorName.includes(keyword));
  return isStrong ? 0.8 : 1.1;
}

function generateRecommendation({ score, juniorSchool, district, schoolRank, privateHigh, crossDistrictHigh, targetSchools, homeLocation, homeAddress }) {