  line-height: 1.4;
}

/* 估分进度与区间提示 */
.completion-bar-wrap {
  margin-top: 24rpx;
  padding: 16rpx 20rpx;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.08);
  border: 1rpx solid rgba(242, 217, 149, 0.15);
}

.completion-text-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.completion-rate-text {
  color: rgba(255, 250, 240, 0.88);
  font-size: 21rpx;
  font-weight: 800;
}

.complete-badge {
  font-size: 20rpx;
  color: var(--kk-gold);
  font-weight: 900;
}

.completion-progress-track {
  width: 100%;
  height: 6rpx;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 99rpx;
  overflow: hidden;
}

.completion-progress-bar {
  height: 100%;
  background: var(--kk-gold);
  border-radius: 99rpx;
  transition: width 0.3s ease;
}

.trust-range-tips {
  margin-top: 18rpx;
  padding: 18rpx;
  border-radius: 12rpx;
  background: rgba(242, 217, 149, 0.12);
  border: 1rpx solid rgba(242, 217, 149, 0.22);
  color: var(--kk-gold);
  font-size: 21rpx;
  line-height: 1.45;
  text-align: left;
}