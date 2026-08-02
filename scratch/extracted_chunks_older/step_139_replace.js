function sourceLabel(row) {
  if (!row) return "待核验";
  if (row.src === 1 || row.src === 2 || row.dataProvider === "官方PDF" || (row.sourceFile && !/fallback|本地宝/.test(row.sourceFile))) {
    return "公开数据";
  }
  if (row.dataProvider === "家长分享" || row.src === 3 || /fallback|本地宝/.test(row.sourceFile || "")) {
    return "家长资料";
  }
  return "待核验";
}