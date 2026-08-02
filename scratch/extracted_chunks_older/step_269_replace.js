.vocational-rec-score {
  font-size: 24rpx;
  color: #e11d48;
  font-weight: bold;
}

/* 录取浮动三情景体检样式 */
.tab-diagnostics {
  margin-top: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  width: 100%;
}

.diag-counts {
  display: flex;
  gap: 6rpx;
}

.count-tag {
  font-size: 16rpx;
  padding: 2rpx 8rpx;
  border-radius: 6rpx;
  color: #fff;
  font-weight: bold;
  line-height: 1.2;
}

.count-tag.red {
  background: var(--kk-plum);
}

.count-tag.blue {
  background: var(--kk-purple-600);
}

.count-tag.green {
  background: var(--kk-success);
}

.diag-summary {
  font-size: 18rpx;
  font-weight: 800;
  padding: 2rpx 10rpx;
  border-radius: 6rpx;
  line-height: 1.3;
}

.diag-summary.text-red {
  background: #fceceb;
  color: var(--kk-plum);
}

.diag-summary.text-orange {
  background: #fdf5ea;
  color: #b68e45;
}

.diag-summary.text-green {
  background: #f0fbf0;
  color: var(--kk-success);
}

.selector-tab.active .tab-label {
  color: rgba(255, 253, 248, 0.85);
}

.selector-tab.active .tab-score {
  color: var(--kk-gold);
}

.selector-tab.active .diag-summary.text-red {
  background: rgba(255, 255, 255, 0.18);
  color: #ff9da6;
}

.selector-tab.active .diag-summary.text-orange {
  background: rgba(255, 255, 255, 0.18);
  color: #ffe89e;
}

.selector-tab.active .diag-summary.text-green {
  background: rgba(255, 255, 255, 0.18);
  color: #bef264;
}

/* 待办清单Checkbox交互样式 */
.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  padding: 18rpx 14rpx;
  border-radius: 12rpx;
  transition: all 0.2s ease;
  cursor: pointer;
}

.checklist-item:active {
  background-color: rgba(0, 0, 0, 0.03);
}

.check-box-wrap {
  margin-top: 4rpx;
}

.check-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid #ded8ce;
  border-radius: 8rpx;
  background-color: #fff;
  color: #fff;
  font-size: 24rpx;
  font-weight: 900;
  transition: all 0.2s ease;
}

.check-box.checked {
  background-color: var(--kk-purple-800);
  border-color: var(--kk-purple-800);
}

.checklist-item.completed .check-bold {
  text-decoration: line-through;
  color: var(--kk-muted);
}

.checklist-item.completed .check-text text:last-child {
  color: #a8a29e;
}