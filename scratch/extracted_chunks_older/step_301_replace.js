.commute-empty-hint {
  font-size: 22rpx;
  color: #9b8470;
  text-align: center;
}

/* 决策操作区及热区规范样式 */
.cta-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  margin-top: 18rpx;
}

.cta-btn {
  width: 100% !important;
  height: 88rpx !important;
  min-height: 88rpx !important;
  line-height: 88rpx !important;
  border-radius: 12rpx !important;
  font-size: 26rpx !important;
  font-weight: bold !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
}

.cta-btn.primary {
  background: var(--kk-plum);
  color: #fff;
}

.cta-btn.primary.saved-active {
  background: var(--kk-gold);
  color: var(--kk-purple-950);
  box-shadow: 0 6rpx 18rpx rgba(214, 179, 106, 0.35);
}

.cta-btn.secondary {
  background: #f1edf8;
  color: var(--kk-purple-700);
}

.cta-title {
  font-size: 30rpx;
  color: var(--kk-purple-800);
  font-weight: bold;
  text-align: left;
  margin-bottom: 8rpx;
}

.cta-desc {
  font-size: 23rpx;
  color: var(--kk-muted);
  text-align: left;
  line-height: 1.5;
  margin-bottom: 12rpx;
}

.detail-subtitle {
  padding: 24rpx 28rpx 10rpx;
  color: var(--kk-purple-950);
  font-size: 28rpx;
  font-weight: bold;
  text-align: left;
}