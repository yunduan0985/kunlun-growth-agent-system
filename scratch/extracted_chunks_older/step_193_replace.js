.shortcut-hover,
.diagnosis-card:active,
.quick-entry-item:active,
.claim-card button:active,
.home-wechat-btn:active,
.share-btn-item:active {
  transform: scale(0.985);
}

/* 中考决策工作台样式 */
.workflow-workbench {
  margin: 24rpx 0rpx;
  padding: 28rpx;
  border-radius: 20rpx;
  background: #ffffff;
  border: 1rpx solid #e2e8f0;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);
}

.workflow-header-row {
  margin-bottom: 24rpx;
}

.workflow-title-line {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: #1e293b;
  font-size: 28rpx;
  font-weight: 800;
}

.workflow-icon {
  font-size: 32rpx;
}

.workflow-subtext {
  display: block;
  margin-top: 4rpx;
  color: #64748b;
  font-size: 20rpx;
}

/* 步骤条 */
.workflow-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28rpx;
  padding: 0 8rpx;
}

.workflow-step-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.step-dot-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.step-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1rpx solid #cbd5e1;
  color: #64748b;
  font-size: 20rpx;
  font-weight: 800;
  z-index: 2;
}

.workflow-step-item.done .step-dot {
  background: #10b981;
  border-color: #10b981;
  color: #ffffff;
}

.step-check-icon {
  font-weight: 900;
}

.step-line {
  position: absolute;
  left: 50%;
  right: -50%;
  top: 22rpx;
  height: 2rpx;
  background: #e2e8f0;
  z-index: 1;
}

.workflow-step-item.done .step-line {
  background: #10b981;
}

.step-text-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rpx;
}

.step-label {
  color: #334155;
  font-size: 20rpx;
  font-weight: 800;
}

.step-desc {
  margin-top: 4rpx;
  color: #94a3b8;
  font-size: 16rpx;
  text-align: center;
  white-space: nowrap;
  max-width: 120rpx;
  overflow: hidden;
  text-overflow: ellipsis;
}

.workflow-step-item.done .step-label {
  color: #0f766e;
}

/* 主行动卡片 */
.workbench-action-card {
  padding: 24rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1rpx solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.action-tag {
  align-self: flex-start;
  padding: 4rpx 10rpx;
  border-radius: 6rpx;
  background: #fee2e2;
  color: #ef4444;
  font-size: 16rpx;
  font-weight: 800;
}

.action-card-body {
  min-width: 0;
}

.action-title {
  color: #0f172a;
  font-size: 26rpx;
  font-weight: 800;
}

.action-desc {
  margin-top: 6rpx;
  color: #475569;
  font-size: 20rpx;
  line-height: 1.4;
}

.action-primary-btn {
  align-self: flex-end;
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 24rpx;
  border-radius: 30rpx;
  background: #173c55;
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 800;
}

.action-primary-btn .arrow {
  margin-left: 4rpx;
}

/* 欢迎弹窗里的输入高亮 */
.val-highlight {
  color: #0f766e !important;
  font-weight: 800;
}

.placeholder-highlight {
  color: #94a3b8 !important;
  font-weight: normal;
}

.onboarding-input-row-wrap {
  margin-top: 18rpx;
  padding: 0 8rpx;
}

.input-row-label {
  display: block;
  color: #31524e;
  font-size: 23rpx;
  font-weight: 700;
  margin-bottom: 8rpx;
}

.onboarding-rank-input {
  height: 76rpx;
  padding: 0 20rpx;
  border: 1rpx solid #dce6e2;
  border-radius: 12rpx;
  background: #ffffff;
  color: #31524e;
  font-size: 24rpx;
}