  <view wx:if="{{showWelcome}}" class="onboarding-overlay" catchtouchmove="noop">
    <view class="onboarding-sheet">
      <view class="onboarding-kicker">从你的阶段开始</view>
      <view class="onboarding-title">这次主要想解决什么？</view>
      <view class="onboarding-sub">选择后首页会优先展示对应工具；后续可随时在右上角切换。</view>
      <view class="onboarding-stage-grid">
        <view wx:for="{{stageOptions}}" wx:key="value" class="onboarding-stage {{stageIndex === index ? 'active' : ''}}" data-stage="{{item.value}}" bindtap="selectWelcomeStage">
          <text>{{item.shortLabel}}</text>
          <view>{{item.label}}</view>
        </view>
      </view>
      
      <!-- 公共选择区 -->
      <picker mode="selector" range="{{['浦东新区','黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','闵行区','宝山区','嘉定区','金山区','松江区','青浦区','奉贤区','崇明区']}}" bindchange="pickWelcomeDistrict">
        <view class="onboarding-district">中考/升学所在区：{{welcomeDistrict}} <text>›</text></view>
      </picker>

      <!-- 中考（初三）视角下额外显示的档案配置项 -->
      <block wx:if="{{stageOptions[stageIndex].value === 'junior_high'}}">
        <view class="onboarding-district" bindtap="openSchoolSearch">
          就读初中：<text class="{{welcomeJuniorSchool ? 'val-highlight' : 'placeholder-highlight'}}">{{welcomeJuniorSchool || '点击选择就读初中（名额分配必填）'}}</text> <text>›</text>
        </view>
        <view class="onboarding-input-row-wrap">
          <text class="input-row-label">预估校内排名 (名额分配参考)：</text>
          <input class="onboarding-rank-input" type="number" placeholder="输入预估名次或百分比 (如 50)" value="{{welcomeSchoolRank}}" bindinput="inputSchoolRank" placeholder-style="color:#a8a29e;" />
        </view>
      </block>

      <button class="onboarding-primary" bindtap="completeWelcome">保存并进入导航</button>
      <button class="onboarding-skip" bindtap="skipWelcome">暂不设置，直接浏览</button>
    </view>
  </view>