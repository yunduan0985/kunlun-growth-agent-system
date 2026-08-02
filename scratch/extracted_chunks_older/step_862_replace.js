// 在计算主包大小之前，引入并执行静态大文件无损体积压缩，确保打包空间余量
try {
  const compressor = require("./compress_static_data");
  compressor.runCompression();
} catch (e) {
  console.warn("⚠️ 自动执行静态数据物理压缩失败:", e);
}

const mainSize = mainPackageSize();
const sizeLimit = 2 * 1024 * 1024; // 2MB
if (mainSize > sizeLimit) {