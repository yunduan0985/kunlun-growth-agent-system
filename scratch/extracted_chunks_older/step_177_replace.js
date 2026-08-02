    <!-- 中考决策闭环工作台 -->
    <view wx:if="{{currentStage === 'junior_high' && juniorHighProgress}}" class="workflow-workbench">
      <view class="workflow-header-row">
        <view class="workflow-title-line">
          <text class="workflow-icon">🎯</text>
          <text>中考决策进度工作台</text>
        </view>
        <text class="workflow-subtext">建议按步排查，规避落榜风险</text>
      </view>

      <!-- 步骤条 -->
      <view class="workflow-steps">
        <view wx:for="{{juniorHighProgress.steps}}" wx:key="key" class="workflow-step-item {{item.status}}">
          <view class="step-dot-wrapper">
            <view class="step-dot">
              <text wx:if="{{item.status === 'done'}}" class="step-check-icon">✓</text>
              <text wx:else>{{index + 1}}</text>
            </view>
            <view wx:if="{{index < 4}}" class="step-line"></view>
          </view>
          <view class="step-text-wrap">
            <text class="step-label">{{item.label}}</text>
            <text class="step-desc">{{item.desc}}</text>
          </view>
        </view>
      </view>

      <!-- 主行动卡片 -->
      <view class="workbench-action-card" bindtap="tapWorkflowAction" data-target="{{juniorHighProgress.action.target}}" hover-class="shortcut-hover">
        <view class="action-tag">⚠️ 本周下一步主行动</view>
        <view class="action-card-body">
          <view class="action-title">{{juniorHighProgress.action.title}}</view>
          <view class="action-desc">{{juniorHighProgress.action.desc}}</view>
        </view>
        <view class="action-primary-btn">
          {{juniorHighProgress.action.btnText}} <text class="arrow">→</text>
        </view>
      </view>
    </view>