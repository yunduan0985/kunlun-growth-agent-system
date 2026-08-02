  return {
    cards,
    sourceMix: [
      { label: "考试院/学校公开PDF", count: publicRows, tone: "green" },
      { label: "区政府/教育局网页", count: parentRows, tone: "blue" },
      { label: "网页公开源兜底", count: unverifiedRows, tone: "orange" }
    ].filter((item) => item.count)
  };