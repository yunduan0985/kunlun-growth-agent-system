function rowSourceLabel(row) {
  if (!row) return "待核验";
  if (row.src === 1 || row.src === 2) return "公开数据";
  if (row.src === 3) return "家长资料";
  return "待核验";
}

function sourceTone(label) {
  if (label === "公开数据") return "green";
  if (label === "家长资料") return "blue";
  return "gray";
}