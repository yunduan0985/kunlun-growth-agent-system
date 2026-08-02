  <view class="estimate-hero">
    <view class="hero-title">中考估分 + 志愿精算</view>
    <view class="hero-sub">先把分数估准，再看自招、到区、到校和1至15。不要凭感觉填志愿。</view>
    <view class="score-box">
      <view>
        <text>{{estimateMode === 'total' ? '预估最低' : '修正前'}}</text>
        <strong>{{rawTotal}}</strong>
      </view>
      <view>
        <text>{{estimateMode === 'total' ? '预估最高' : '建议估分'}}</text>
        <strong>{{correctedTotal}}</strong>
      </view>
    </view>
    <view class="correction">{{correctionText}}</view>

    <!-- 估分完整度与区间提示 -->
    <view class="completion-bar-wrap" wx:if="{{completionRate !== undefined}}">
      <view class="completion-text-row">
        <text class="completion-rate-text">{{completionText}}</text>
        <text wx:if="{{completionRate === 100}}" class="complete-badge">✓ 已填满 7 科</text>
      </view>
      <view class="completion-progress-track">
        <view class="completion-progress-bar" style="width: {{completionRate}}%;"></view>
      </view>
    </view>
    <view class="trust-range-tips" wx:if="{{trustRangeText}}">
      {{trustRangeText}}
    </view>
  </view>