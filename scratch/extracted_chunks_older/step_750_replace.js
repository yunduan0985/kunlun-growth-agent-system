  =========================================
  测试完成。成功: 7 个，失败: 0 个。
  =========================================
  ```

### 6.4 解决动态路线规划引发的请求挂起 timeout 问题
- **问题根因**：在部分受限网络环境或未配置小程序 request 合法域名白名单的开发环境下，调用腾讯地图 WebService 接口时容易长时间挂起。微信底层的 WAServiceMainContext 会在请求被挂起超限后抛出全局 `Error: timeout`。
- **优化方案**：在 [pages/school/school.js](file:///Users/dasean/Library/usersProject/AIK12/miniprogram/pages/school/school.js) 中，为驾车路线（`/driving/`）和公交路线（`/transit/`）的 `wx.request` 请求均加上了显式超时限制 `timeout: 4000` (4秒)。
- **效果**：发生网络请求超时或连接限制时，能快速触发 fail 钩子，由详情页内部的 `catch` 捕获并静默降级为球面静态估算，彻底避免了底层引擎无限期等待抛出未捕获超时红字的问题，极大地提高了弱网及无域名白名单下的容错效率。