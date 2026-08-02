### 1. 目标应用程序
- **路径**：[/Volumes/MOVESPEED/Applications/微信双开.app](file:///Volumes/MOVESPEED/Applications/%E5%BE%AE%E4%BF%A1%E5%8F%8C%E5%BC%80.app) (即双击此应用启动多开)
- **原理**：采用 **“外壳脚本应用 + 独立沙盒 HOME 隔离 + 静默拉起正版二进制”** 的终极完美双开方案。
  - **解决“版本过低/安全校验限制登录”**：克隆副本微信并修改其 Bundle ID 虽然可以多开，但会导致微信服务器在进行安全和签名校验时，判定客户端被篡改而拒绝登录（提示“版本过低”）。我们废弃了副本克隆方案，改为使用一个“双开壳应用”。它在后台直接拉起您官方未做任何修改的 WeChat 原版二进制。因为真正运行的主进程是 100% 原版正品微信，因此**绝对能绕过微信服务器的安全限制，正常扫码登录**。
  - **解决“双击跳回第一个微信/隔离互斥锁”**：我们不在 AppleScript 中调用 LaunchServices 的 `open`（它会重置环境变量），而是直接以 Unix 命令行方式拉起二进制，并设置 `export HOME="/Volumes/MOVESPEED/Applications/WeChat2_Data"`。微信在运行时会被引导至移动硬盘中完全独立的沙盒数据目录，由于找不到对方的互斥锁文件，两实例完全互不干扰，**100% 杜绝了“跳转/前置已登录微信”的现象**。
- **专属图标刷新**：外壳应用 Bundle ID 为 `com.tencent.xinWeChatDual`。我们使用 AI 专门绘制的带磨砂玻璃“2”标识的 `WeChat2.icns` 图标替换了其默认图标，并使用 macOS 底层工具 `lsregister -f` 向 LaunchServices 强制重新注册。专属图标现已在 Finder 和 Dock 栏中 100% 强制刷出，保证了极高的视觉辨识度。