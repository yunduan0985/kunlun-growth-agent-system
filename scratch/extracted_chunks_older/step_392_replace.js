function validateQuotaCoverage(rows, statusRows) {
  const structured = new Set(statusRows.filter((row) => row.status === "structured" && Number(row.structuredRows) > 0).map((row) => row.district));
  const covered = new Set(rows.map((row) => row.admissionDistrict || row.sourceDistrictLabel).filter(Boolean));
  const missing = DISTRICTS.filter((district) => !structured.has(district) || !covered.has(district));
  assert(!missing.length, `2026到校计划未完成结构化: ${missing.join("、")}`);
}

function validateUnifiedDistrictCoverage(rows) {
  const covered = new Set(rows.map(row => row.sourceDistrictLabel).filter(Boolean));
  const missing = DISTRICTS.filter(d => !covered.has(d));
  assert(!missing.length, `16区平行志愿未完全覆盖: 缺少 ${missing.join("、")}`);
}

function validateDuplicateSchoolCodes(schools) {
  const seen = new Set();
  const duplicates = [];
  schools.forEach(s => {
    if (s.code) {
      if (seen.has(s.code)) {
        duplicates.push(`${s.name}(${s.code})`);
      }
      seen.add(s.code);
    }
  });
  assert(!duplicates.length, `存在重复学校代码: ${duplicates.join("、")}`);
}

function run() {
  delete require.cache[require.resolve(path.join(MINI_ROOT, "utils/admission.js"))];
  const data = require(path.join(MINI_ROOT, "utils/admission.js")).data;
  validateScoreRows("2025平行志愿", data.unifiedRows, 350, 750);
  validateScoreRows("2025名额到区", data.quotaToDistrictScoreRows, 600, 800);
  validateScoreRows("2025名额到校", data.quotaToSchoolRows, 600, 800);
  validateUnifiedConflicts(data.unifiedRows);
  validateCopy();
  validateQuotaCoverage(data.quotaToSchoolPlanRows2026 || [], data.quotaToSchoolPlanStatus2026 || []);
  validateUnifiedDistrictCoverage(data.unifiedRows);
  validateDuplicateSchoolCodes(data.schools);

  const size = mainPackageSize();
  assert(size <= 2 * 1024 * 1024, `主包${Math.ceil(size / 1024)}KB，超过2048KB限制`);
  console.log(JSON.stringify({ ok: true, mainPackageBytes: size, quotaDistricts: 16 }, null, 2));
}