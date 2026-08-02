function destinationText(destinations) {
  if (!destinations) return "";
  return Object.keys(destinationLabels)
    .filter((key) => destinations[key])
    .map((key) => `${destinationLabels[key]}${destinations[key]}`)
    .join(" / ");
}

function applyCloudData(cloudData) {
  if (!cloudData) return;
  console.log("正在注入云开发招生版本数据...", cloudData.versionInfo);
  if (cloudData.admissionRecords && cloudData.admissionRecords.length > 0) {
    const schools = cloudData.admissionRecords.filter(r => r.type === 'school');
    const unifiedRows = cloudData.admissionRecords.filter(r => r.type === 'unified');
    const quotaSchool = cloudData.admissionRecords.filter(r => r.type === 'quotaSchool');
    const quotaSchoolPlan2026 = cloudData.admissionRecords.filter(r => r.type === 'quotaSchoolPlan');
    const quotaToDistrictRows = cloudData.admissionRecords.filter(r => r.type === 'quotaDistrict');
    const quotaToDistrictScoreRows = cloudData.admissionRecords.filter(r => r.type === 'quotaDistrictScore');
    
    if (schools.length > 0) data.schools = schools;
    if (unifiedRows.length > 0) data.unifiedRows = unifiedRows;
    if (quotaSchool.length > 0) data.quotaToSchoolRows = quotaSchool;
    if (quotaSchoolPlan2026.length > 0) data.quotaToSchoolPlanRows2026 = quotaSchoolPlan2026;
    if (quotaToDistrictRows.length > 0) data.quotaToDistrictRows = quotaToDistrictRows;
    if (quotaToDistrictScoreRows.length > 0) data.quotaToDistrictScoreRows = quotaToDistrictScoreRows;
  }
  if (cloudData.schoolProfiles && cloudData.schoolProfiles.length > 0) {
    schoolProfiles = cloudData.schoolProfiles;
  }
}

module.exports = {
  data,
  scoreText,
  findSchool,
  rankingRows,
  juniorOptions,
  generateRecommendation,
  destinationText,
  gapInfo,
  commuteEstimate,
  quotaScoreInfo,
  buildVolunteerDiagnostics,
  buildNextActions,
  buildDataTrust,
  volunteerBand,
  applyCloudData,
  scoreScales: {
    academicExamMax: ACADEMIC_EXAM_MAX_SCORE,
    quotaCompositeMax: QUOTA_COMPOSITE_MAX_SCORE,
    quotaQualityScore: QUOTA_QUALITY_SCORE
  }
};