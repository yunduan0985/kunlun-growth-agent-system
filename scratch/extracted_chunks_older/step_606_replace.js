### 5.2 手动校验
1.  在微信开发者工具中，打开控制台，多次狂点“开始志愿测算”，核实不会重复打开两次 estimate 页面。
2.  切换至幼升小、高中等视角，检查首页本周提醒显示的内容是否对应各自学段。
3.  填写一份中考估分（例如 635 分），确认生成的报告顶端并排显示了 627分、635分、640分 三种估分档位下志愿数量的对比。
4.  进入学校详情页，确认原来的 tab 页被平铺的六个版块完全取代。
5.  点击“生成海报”，确认海报中的初中信息已被成功遮蔽。

---

# 下一步迭代计划

## 1. 主包瘦身与大静态数据文件压缩

### 问题
- 小程序主包体积为 `2048KB`，主要由于 `data/admissionData.js`（945KB）等大型静态招生数据占用了巨大物理空间。

### 解决方案
- 编写 [scripts/compress_static_data.js](file:///Users/dasean/Library/usersProject/AIK12/miniprogram/scripts/compress_static_data.js) 自动化脚本：
  1. 读取主包中的四个大型静态数据文件：`admissionData.js`、`quotaToSchoolPlan2026.js`、`schoolProfiles.js` 和 `schoolSupplement.js`。
  2. 采用去除多余空格、换行、无用分号等语法级物理体积精简。
  3. 通过运行时 `JSON.parse` 混淆或者数组映射优化，大幅降低其物理文件的大小，为小程序主包腾出 **100KB - 300KB** 的安全冗余空间。
  4. 将该压缩脚本整合进 `audit_navigation.js` 发布门禁中，确保每次打包发布前自动对静态数据进行物理压缩。

---

## 2. 高级通勤测算：接入腾讯地图 API 进行动态路线规划

### 问题
- 目前学校详情页 [school.js](file:///Users/dasean/Library/usersProject/AIK12/miniprogram/pages/school/school.js) 的通勤成本测算仅仅使用静态经纬度估算距离，未能包含早高峰堵车、公交地铁实际换乘步行时间，与真实通勤相差较大。

### 解决方案
1. **微信位置授权结合**：
   - 检查并引导用户位置授权（`scope.userLocation`）。
2. **腾讯地图 WebService API 接入与防抖**：
   - 在详情页初始化时，若已获得授权，发起防抖网络请求，使用腾讯地图 `direction/driving` 或 `direction/transit` 接口规划自考点/住址至目标学校的路线。
3. **平滑降级（Self-healing Fallback）**：
   - 如果用户拒绝授权、网络请求失败或配额超限，系统自动且静默降级为现有的“根据两点间球面距离进行静态预估”的估算方法，确保 100% 稳定性。

---

## 3. 中考名额分配到校“校内竞争系数”预测算法升级

### 问题
- 传统的录取测算仅仅基于历史录取分数线和全区排名，没有考虑到初中校内竞争对手的强弱对名额到校的影响。

### 解决方案
1. **竞争激烈度因子设计**：
   - 在 [admission.js](file:///Users/dasean/Library/usersProject/AIK12/miniprogram/utils/admission.js) 中优化算法：
     - 若家长录入了“校内排名” \(R\) 和“初中名称”：
     - 根据该初中在往届中考的平均水平（强校或弱校）估算其校内竞争激烈度因子 \(C_j\)。
     - 将原本的“静态录取差额预测”升级为名额分配到校“校内概率修正模型”：名额安全排名阈值 \(N_{safe} = N_{quota} \times C_j\)。
2. **算法返回文案调整**：
   - 重新计算该志愿的“冲稳保”等级，如果校内排名明显落后于本校分得的该高中的名额计划，即使全区排名达到录取线，也将在诊断中提示“到校志愿竞争激烈，存在被校内高分挤占风险”。

---

## 4. 计划修改的文件

### [scripts]
#### [NEW] [compress_static_data.js](file:///Users/dasean/Library/usersProject/AIK12/miniprogram/scripts/compress_static_data.js)

### [utils]
#### [MODIFY] [admission.js](file:///Users/dasean/Library/usersProject/AIK12/miniprogram/utils/admission.js)

### [pages/school]
#### [MODIFY] [school.js](file:///Users/dasean/Library/usersProject/AIK12/miniprogram/pages/school/school.js)

---

## 5. 验证计划

### 自动化验证
- 运行压缩脚本后，再次执行 `node scripts/audit_navigation.js`，验证主包大小是否明显降到 2000KB 以下。

### 手动验证
- 进入任一高中详情页，开启位置授权，确认能获取到真实的早高峰行车和地铁换乘预估时间。
- 输入初三估分和高强度校内排名，检查生成的志愿报告中“名额分配到校”志愿的安全度警告是否正确触发。