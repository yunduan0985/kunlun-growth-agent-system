  <view class="home-content">
    <!-- 离线飘红条提示 -->
    <view class="offline-banner" wx:if="{{isOfflineMode}}" bindtap="retryConnect" hover-class="shortcut-hover">
      <text class="offline-icon">⚠️</text>
      <text class="offline-text">当前处于离线模式，显示的为历史缓存，获取最新请联网重试</text>
      <text class="offline-action">点击重试</text>
    </view>

    <!-- 首页今日推荐/时效性通知横幅 -->