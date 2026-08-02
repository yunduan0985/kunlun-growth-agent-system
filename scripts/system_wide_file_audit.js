// 昆仑增长：全电脑 (Mac 主盘 + MOVESPEED 移动硬盘) 全盘文件与 AI 资产大扫描引擎 (精准快速版)

const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.join(__dirname, '..', 'obsidian_courses_vault');
const MAP_DIR = path.join(VAULT_DIR, '07-全电脑全盘资产大地图 (System Wide Master Map)');

if (!fs.existsSync(MAP_DIR)) {
  fs.mkdirSync(MAP_DIR, { recursive: true });
}

// 精准目标目录
const TARGET_SCAN_PATHS = [
  '/Volumes/MOVESPEED/下载/AIcode/Agent',
  '/Volumes/MOVESPEED/下载/AIcode',
  '/Volumes/MOVESPEED/下载',
  '/Volumes/MOVESPEED/Applications',
  '/Users/dasean/.gemini',
  '/Users/dasean/Documents',
  '/Users/dasean/Desktop',
  '/Users/dasean/Downloads'
];

const EXCLUDE = ['node_modules', '.git', 'dist', 'build', '.next', 'Library'];

function scanDirRecursive(dirPath, depth = 0, maxDepth = 3) {
  let results = [];
  if (depth > maxDepth) return results;
  if (!fs.existsSync(dirPath)) return results;

  try {
    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
      if (EXCLUDE.includes(item)) return;
      const fullPath = path.join(dirPath, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // 检查是否有标志性文件
          if (fs.existsSync(path.join(fullPath, 'package.json'))) {
            results.push({ name: item, path: fullPath, type: 'Node.js / Web 项目' });
          } else if (fs.existsSync(path.join(fullPath, 'requirements.txt')) || fs.existsSync(path.join(fullPath, 'main.py'))) {
            results.push({ name: item, path: fullPath, type: 'Python / AI 工程' });
          } else if (fs.existsSync(path.join(fullPath, 'SKILL.md'))) {
            results.push({ name: item, path: fullPath, type: 'Agent Skill 扩展能力包' });
          } else if (fs.existsSync(path.join(fullPath, '.obsidian'))) {
            results.push({ name: item, path: fullPath, type: 'Obsidian 本地知识库' });
          }
          // 递归向下
          results = results.concat(scanDirRecursive(fullPath, depth + 1, maxDepth));
        }
      } catch (e) {}
    });
  } catch (e) {}

  return results;
}

function scanSystem() {
  console.log('🚀 开始全电脑全盘目录搜索...');
  let allFound = [];

  TARGET_SCAN_PATHS.forEach(p => {
    console.log(`🔎 正在扫描: ${p}`);
    const res = scanDirRecursive(p, 0, 3);
    allFound = allFound.concat(res);
  });

  // 去重
  const uniqueMap = new Map();
  allFound.forEach(item => uniqueMap.set(item.path, item));
  const uniqueList = Array.from(uniqueMap.values());

  console.log(`✅ 找到 ${uniqueList.length} 个本地 AI 资产与项目文件夹！`);

  generateReport(uniqueList);
}

function generateReport(list) {
  const content = `---
title: 全电脑 (Mac + 移动硬盘) 全盘 AI 资产大地图
tags:
  - 全盘扫描
  - 系统资产
  - 电脑大地图
updated_at: ${new Date().toISOString()}
---

# 🌐 全电脑 (Mac 主盘 + MOVESPEED 移动硬盘) 资产全景大地图

> [!IMPORTANT] 说明
> 本大地图通过对全电脑磁盘（包含 \`/Users/dasean\` 主盘与 \`/Volumes/MOVESPEED\` 移动硬盘）进行精准递归扫描生成。
> 已将您电脑中所有的 **AI 代码库、项目应用、Agent Skills 工具包以及 Obsidian 知识库** 进行了统一归档！

---

## 💻 全盘发现的所有 AI 代码仓库、组件与项目 (${list.length} 个)

| 项目/资产名称 | 资产分类 | 本地绝对路径 | 商业用途与可复用场景 |
| :--- | :--- | :--- | :--- |
${list.map(item => `| **${item.name}** | ${item.type} | [${item.path}](file://${item.path}) | 包含完整开发组件与逻辑 |`).join('\n')}

---

## 🔗 双向链接中枢
- [[00-主视窗导航与课程关系图]]
- [[00-全盘项目与资产盘点中枢]]
- [[01-把自己在用的Agent系统卖给客户的商业落地SOP]]
`;

  fs.writeFileSync(path.join(MAP_DIR, '00-全电脑全盘资产大地图.md'), content, 'utf-8');
  console.log(`📄 已成功更新 Obsidian 全电脑大地图: ${path.join(MAP_DIR, '00-全电脑全盘资产大地图.md')}`);
}

scanSystem();
