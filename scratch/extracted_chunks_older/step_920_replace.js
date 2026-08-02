        if (dotIdx > 10 && dotIdx < 80) {
          classText = classText.substring(0, dotIdx + 1);
        } else {
          classText = classText.substring(0, 80) + "...";
        }
      }
    }
    
    let campusText = "";
    if (profileDetail.campus && profileDetail.campus.length > 0) {
      const boardRow = profileDetail.campus.find(r => r.indexOf("住宿") >= 0 || r.indexOf("寄宿") >= 0 || r.indexOf("作息") >= 0);
      campusText = boardRow ? boardRow.trim() : profileDetail.campus[0].trim();
      if (campusText.length > 80) {
        const dotIdx = campusText.indexOf("。");
        if (dotIdx > 10 && dotIdx < 80) {
          campusText = campusText.substring(0, dotIdx + 1);
        } else {
          campusText = campusText.substring(0, 80) + "...";
        }
      }
    }
    
    enriched.classText = classText;
    enriched.campusText = campusText;
    enriched.profileDetail = profileDetail;
  }
  
  return enriched;
}

function exitPower(school) {
  const exit = school.exit2025 || {};
  return (exit.comprehensiveTotal || 0) + (exit.qingbeiTotal || 0) * 6;
}

function normalizeFilterDistrict(district) {
  if (!district || district === "全上海") return "";
  return normalizeDistrict(district);
}

function groupQuotaToSchool(district) {
  const wanted = normalizeFilterDistrict(district);
  const map = {};
  data.quotaToSchoolRows
    .filter((row) => !wanted || normalizeDistrict(row.sourceDistrictLabel || row.admissionDistrict).includes(wanted))
    .forEach((row) => {
    if (!map[row.juniorSchool]) map[row.juniorSchool] = [];
    map[row.juniorSchool].push(row);
  });
  return Object.keys(map)
    .map((juniorSchool) => {
      const rows = map[juniorSchool].sort((a, b) => b.minScore - a.minScore)
        .map((row) => ({ ...row, ...quotaScoreInfo(row.minScore) }));
      return {
        juniorSchool,
        rows,
        total: rows.length,
        floor: Math.min(...rows.map((row) => row.minScore))
      };
    })
    .sort((a, b) => b.rows[0].minScore - a.rows[0].minScore);
}

function groupQuotaToSchoolPlan2026(district) {
  const wanted = normalizeFilterDistrict(district);
  const map = {};
  data.quotaToSchoolPlanRows2026
    .filter((row) => !wanted || normalizeDistrict(row.sourceDistrictLabel || row.admissionDistrict).includes(wanted))
    .forEach((row) => {
      if (!map[row.juniorSchool]) map[row.juniorSchool] = [];
      map[row.juniorSchool].push(row);
    });
  return Object.keys(map)
    .map((juniorSchool) => {
      const rows = map[juniorSchool].sort((a, b) => b.planCount - a.planCount || a.highSchool.localeCompare(b.highSchool));
      return {
        juniorSchool,
        rows,
        total: rows.reduce((sum, row) => sum + Number(row.planCount || 0), 0),
        highSchoolCount: rows.length
      };
    })
    .sort((a, b) => b.total - a.total || a.juniorSchool.localeCompare(b.juniorSchool));
}

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