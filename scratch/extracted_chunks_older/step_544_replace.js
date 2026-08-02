.onboarding-rank-input {
  height: 76rpx;
  padding: 0 20rpx;
  border: 1rpx solid #dce6e2;
  border-radius: 12rpx;
  background: #ffffff;
  color: #31524e;
  font-size: 24rpx;
}

/* ==========================================================================
   初中学校选择半屏弹窗样式 (极简毛玻璃现代风格)
   ========================================================================== */

/* 弹窗最外层容器，固定在窗口之上，利用 pointer-events 在未展示时穿透 */
.half-screen-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 展示状态下的容器 */
.half-screen-dialog.show {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}

/* 背景黑色半透明遮罩，带有毛玻璃模糊质感 */
.dialog-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.45); /* 柔和深色底 */
  backdrop-filter: blur(10px); /* 现代毛玻璃质感 */
  -webkit-backdrop-filter: blur(10px);
}

/* 弹窗面板主体 */
.search-dialog-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 80vh; /* 最高占屏幕的 80% */
  background: #f8f7f2; /* 契合主色调的温暖米白色 */
  border-radius: 32rpx 32rpx 0 0;
  box-shadow: 0 -10rpx 40rpx rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 36rpx 40rpx calc(env(safe-area-inset-bottom) + 32rpx) 40rpx;
  transform: translateY(100%); /* 默认隐藏在屏幕下方 */
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 展示状态下向上滑入 */
.half-screen-dialog.show .search-dialog-content {
  transform: translateY(0);
}

/* 顶部滑块点缀以示意抽屉下拉 */
.search-dialog-content::before {
  content: "";
  position: absolute;
  top: 16rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 72rpx;
  height: 8rpx;
  border-radius: 4rpx;
  background: #cbd5e1;
}

/* 头部栏 */
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12rpx;
  margin-bottom: 28rpx;
}

.dialog-title {
  color: #173c55; /* 主色调蓝灰色 */
  font-size: 32rpx;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.dialog-close {
  color: #64748b;
  font-size: 36rpx;
  padding: 12rpx;
  line-height: 1;
}

/* 搜索输入包裹器 */
.search-input-box {
  position: relative;
  margin-bottom: 24rpx;
}

/* 搜索栏输入框 */
.search-bar {
  height: 88rpx; /* 保证点击热区不小于 88rpx 规范 */
  background: #ffffff;
  border: 2rpx solid #dce6e2;
  border-radius: 16rpx;
  padding: 0 88rpx 0 28rpx;
  color: #173c55;
  font-size: 26rpx;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

/* 输入框聚焦交互效果 */
.search-bar:focus {
  border-color: #0f766e;
  box-shadow: 0 0 0 4rpx rgba(15, 118, 110, 0.15);
}

/* 清理搜索文字的按钮 */
.search-clear {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 28rpx;
  padding: 16rpx;
  z-index: 10;
}

/* 列表滚动容器 */
.search-list-body {
  flex: 1;
  height: 480rpx; /* 固定推荐的滚动区高度 */
  overflow-y: scroll;
}

/* 学校搜索列表项 */
.search-item-row {
  height: 96rpx; /* 满足 88rpx 最小触控热区规定 */
  line-height: 96rpx;
  border-bottom: 1rpx solid #f1f5f9;
  color: #334155;
  font-size: 26rpx;
  padding: 0 8rpx;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 点击反馈效果 */
.search-item-row:active {
  background-color: #f1f5f9;
  color: #0f766e;
  font-weight: bold;
}

/* 列表空状态 */
.empty.small {
  text-align: center;
  color: #94a3b8;
  font-size: 24rpx;
  padding: 80rpx 0;
}