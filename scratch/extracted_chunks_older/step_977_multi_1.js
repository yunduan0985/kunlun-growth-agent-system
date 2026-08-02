}

function getKnowledgeItem(key) {
  if (!key) return null;
  return knowledgeBase[key] || null;
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
  quotaScoreInfo,
  buildVolunteerDiagnostics,
  buildNextActions,
  buildDataTrust,
  volunteerBand,
  applyCloudData,
  getKnowledgeItem,
  scoreScales: {
    academicExamMax: ACADEMIC_EXAM_MAX_SCORE,
    quotaCompositeMax: QUOTA_COMPOSITE_MAX_SCORE,
    quotaQualityScore: QUOTA_QUALITY_SCORE
  }
};