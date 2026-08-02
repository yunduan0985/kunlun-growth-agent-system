function buildDataTrust(unifiedRows, quotaDistrict, quotaSchool, homeLocation) {
  const publicRows = unifiedRows.filter((row) => rowSourceLabel(row) === "公开数据").length;
  const parentRows = unifiedRows.filter((row) => rowSourceLabel(row) === "家长资料").length;
  const unverifiedRows = unifiedRows.filter((row) => rowSourceLabel(row) === "待核验").length;
  const cards = [
    {
      title: "2025 1至15",
      value: `${districtCount(data.unifiedRows)}区/${data.unifiedRows.length}条`,
      tone: (parentRows || unverifiedRows) ? "orange" : "green",
      text: (parentRows || unverifiedRows) ? "16区数据已接入，部分区使用家长资料或待核验数据兜底" : "已全部接入公开数据官方资料"
    },