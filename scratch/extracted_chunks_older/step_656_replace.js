      <view class="commute-distance-row" style="margin-top: 16rpx;">
        <view class="commute-km">{{commute.distanceKm}}<text class="commute-km-unit">km</text></view>
        <view class="commute-label-badge {{commute.label === '通勤友好' ? 'green' : commute.label === '可接受' ? 'orange' : 'red'}}">{{commute.label}}</view>
        <view class="commute-label-badge blue" wx:if="{{commute.isRealTime}}">⚡ 腾讯地图动态路况</view>
      </view>