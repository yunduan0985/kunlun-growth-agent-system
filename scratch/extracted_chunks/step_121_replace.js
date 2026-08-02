### 1. 目标应用程序
- **路径**：[/Volumes/MOVESPEED/Applications/WeChat2.app](file:///Volumes/MOVESPEED/Applications/WeChat2.app) (在系统 Finder 中显示为 **微信双开**)
- **原理**：采用 **“官方微信副本克隆 + 修改 Bundle ID + 本地 ad-hoc 深度重签名”** 的最新多开方案。
  - **避开单进程互斥锁**：通过将副本的 Bundle ID 修改为 `com.tencent.xinWeChatDual`，使 macOS 认为这是一个全新的应用程序，彻底绕过了微信 4.0+ 内部的单进程互斥锁检测，**完美解决“双击运行跳转回第一个微信”的问题**。
  - **独立的沙盒数据**：由于 Bundle ID 独立，macOS 自动为第二个微信分配了完全隔离的沙盒存储空间，两个微信的数据库与缓存 100% 独立，从根源上杜绝了多开引发的数据锁死与闪退风险。
  - **本地 ad-hoc 重签名**：修改 Bundle ID 会导致官方签名失效（从而引发打开即闪退）。我们通过 `codesign --force --deep --sign -` 强制对副本进行了深度本地重新签名，**完美解决了“打开即闪退”的签名损坏报错**。
- **专属图标刷新**：将 AI 专门绘制的带磨砂玻璃“2”标识的 `WeChat2.icns` 替换进包内的 `Contents/Resources/AppIcon.icns`。因为系统将其判定为全新 Bundle ID 应用，macOS 会立即丢弃旧缓存，专属双开图标已在 Finder 和 Dock 栏中 100% 显现。