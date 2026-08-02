<view class="school page" wx:if="{{school}}" style="padding-top: {{totalHeaderHeight ? totalHeaderHeight + 10 : 64}}px;">
  <view class="mp-topbar dark" style="padding-top: {{statusBarHeight || 20}}px; height: {{totalHeaderHeight || 56}}px;">
    <view class="mp-back" bindtap="goBack">‹</view>
    <view class="mp-title">学校详情</view>
  </view>

  <!-- 头部学校基本信息 -->
  <view class="school-hero">
    <view class="hero-label">学校详情</view>
    <view class="school-name">{{school.name}}</view>
    <view class="tag-line">
      <text>高中</text>
      <text>{{school.district || '上海'}}</text>
      <text>{{school.ownership || '办别待补'}}</text>
      <text>{{school.tier}}</text>
    </view>
  </view>

  <!-- 1. 入口数据 -->
  <view class="panel-card detail-card">
    <view class="card-title">一、入口数据</view>
    <view class="detail-subtitle">近年中考投档分数线趋势 (750分制)</view>
    <view class="list-head history-grid"><text>年份</text><text>录取分数线</text><text>录取口径</text></view>
    <view wx:for="{{historyLines}}" wx:key="year" class="list-row history-grid {{item.tone}}">
      <text>{{item.year}}</text><text>{{item.value}}</text><text>{{item.scope}}</text>
    </view>
    <view class="source-warning">💡 说明：以上为历史官方投档线，2026年分数线待录取结束后公布。</view>
  </view>

  <!-- 2. 招生路径 -->
  <view class="panel-card detail-card">
    <view class="card-title">二、招生路径</view>
    
    <!-- 名额分配到区 -->
    <view class="detail-subtitle">2026年名额分配到区招生计划</view>
    <view class="list-head admission-grid"><text>分配区</text><text>2026计划</text><text>口径</text></view>
    <view wx:for="{{quotaDistrictRows2026}}" wx:key="planArea" class="list-row admission-grid">
      <text>{{item.planArea}}</text><text>{{item.planCount}}名</text><text>2026计划</text>
    </view>
    <view wx:if="{{!quotaDistrictRows2026.length}}" class="empty">暂无名额到区计划数据</view>

    <!-- 名额分配到校 -->
    <block wx:if="{{quotaPlanRows2026.length}}">
      <view class="detail-subtitle" style="margin-top: 24rpx;">2026年名额分配到校招生计划 (当前绑定初中计划)</view>
      <view class="list-head quota-grid"><text>初中学校</text><text>名额</text><text>口径</text></view>
      <view wx:for="{{quotaPlanRows2026}}" wx:key="juniorSchool" class="list-row quota-grid">
        <text>{{item.juniorSchool}}</text><text>{{item.planCount}}人</text><text>计划</text>
      </view>
    </block>

    <!-- 2025名额分配到校录取分数线 (参考) -->
    <block wx:if="{{quotaRows.length}}">
      <view class="detail-subtitle" style="margin-top: 24rpx;">2025年名额分配到校录取分数线 (800分制)</view>
      <view class="score-scale-note important">800分制录取总分 = 学业考试750分 + 综合素质评价50分。折算分数用于和估分直接对比。</view>
      <view class="list-head quota-grid"><text>初中学校</text><text>总分/折算</text><text>同分优待</text></view>
      <view wx:for="{{quotaRows}}" wx:key="juniorSchool" class="list-row quota-grid">
        <text>{{item.juniorSchool}}</text><text>{{item.compactScore}}</text><text>{{item.sameScorePreferential || '-'}}</text>
      </view>
    </block>

    <!-- 自主招生计划 -->
    <block wx:if="{{school.selfAdmission2026}}">
      <view class="detail-subtitle" style="margin-top: 24rpx;">2026年自主招生计划</view>
      <view class="detail-line">自招总额：<text>{{school.selfAdmission2026.totalPlan}}人</text></view>
      <view class="detail-line">体育名额：<text>{{school.selfAdmission2026.sportsPlan || 0}}人</text></view>
      <view class="detail-line">艺术名额：<text>{{school.selfAdmission2026.artsPlan || 0}}人</text></view>
      <button class="pdf-link" data-url="{{pdf2025}}" bindtap="openPdf">查看2025年招生录取方案 (历史参考) >></button>
      <button wx:if="{{pdf2026}}" class="pdf-link secondary" data-url="{{pdf2026}}" bindtap="openPdf">{{isPdf2026Fallback ? '暂无该校独立文件，查看全市自招汇总 >>' : '查看2026年招生录取方案 >>'}}</button>
    </block>

    <!-- 平行志愿 -->
    <view class="detail-subtitle" style="margin-top: 24rpx;">2025年 1至15平行志愿录取线 (750分制)</view>
    <view class="list-head admission-grid"><text>招生分配区</text><text>2025线</text><text>数据源</text></view>
    <view wx:for="{{unifiedLines}}" wx:key="index" class="list-row admission-grid">
      <text>{{item.sourceDistrictLabel}}</text><text>{{item.minScore || '无录取'}}</text><text>{{item.sourceLabel}}</text>
    </view>
    <view wx:if="{{!unifiedLines.length}}" class="empty">暂无平行志愿分数线数据</view>
  </view>

  <!-- 3. 出口信息 -->
  <view class="panel-card detail-card">
    <view class="card-title">三、出口信息</view>
    <view class="source-warning" style="margin-bottom:12rpx;">⚠️ 说明：以下为该高中毕业生通过综合评价批次录取的大学流向，非本届招生出口。</view>
    <view class="list-head gaokao-grid"><text>升学高校 (2025届毕业生)</text><text>综合评价录取数</text></view>
    <block wx:if="{{destinations.length}}">
      <view wx:for="{{destinations}}" wx:key="name" class="list-row gaokao-grid">
        <text>{{index + 1}} {{item.name}}</text><text>{{item.count}}人</text>
      </view>
      <view class="detail-total">综评录取合计：{{school.exit2025.comprehensiveTotal}}人</view>
      <view wx:if="{{school.exit2025.qingbeiTotal}}" class="detail-total" style="color:#c47c00; font-weight:900;">其中清华北大流向：{{school.exit2025.qingbeiTotal}}人</view>
    </block>
    <view wx:else class="empty">2025届综评去向数据暂未对外公布，系统不进行杜撰。</view>
  </view>

  <!-- 4. 住宿通勤 -->
  <view class="panel-card detail-card">
    <view class="card-title">四、住宿与通勤成本</view>
    <view class="detail-line">寄宿配置：<text>{{school.boarding || '暂无官方寄宿数据收录'}}</text></view>
    <block wx:if="{{commute}}">
      <view class="commute-distance-row" style="margin-top: 16rpx;">
        <view class="commute-km">{{commute.distanceKm}}<text class="commute-km-unit">km</text></view>
        <view class="commute-label-badge {{commute.label === '通勤友好' ? 'green' : commute.label === '可接受' ? 'orange' : 'red'}}">{{commute.label}}</view>
      </view>
      <view class="commute-grid">
        <view class="commute-item">
          <text class="commute-icon">🚗</text>
          <text class="commute-val">{{commute.driveMin}} 分钟</text>
          <text class="commute-type">驾车预估</text>
        </view>
        <view class="commute-item">
          <text class="commute-icon">🚇</text>
          <text class="commute-val">{{commute.transitMin}} 分钟</text>
          <text class="commute-type">公交地铁</text>
        </view>
      </view>
    </block>
    <block wx:else>
      <view class="commute-empty">
        <view class="commute-empty-icon">📍</view>
        <view class="commute-empty-text">在志愿报告中添加“家庭位置”后，系统将自动预估通勤成本。</view>
      </view>
    </block>
    <button class="pdf-link secondary" bindtap="openMap">打开地图查看学校位置 >></button>
  </view>

  <!-- 5. 来源说明 -->
  <view class="panel-card detail-card source-card">
    <view class="card-title">五、来源说明与数据口径</view>
    
    <block wx:if="{{hasSupplementProfile}}">
      <view class="profile-block">
        <view class="profile-title">择校画像与参考提醒</view>
        <view wx:if="{{school.eliteInsight}}" class="profile-summary">{{school.eliteInsight}}</view>
        
        <block wx:if="{{school.features && school.features.length}}">
          <view class="profile-title" style="margin-top: 16rpx;">办学特色</view>
          <view wx:for="{{school.features}}" wx:key="*this" class="profile-chip">{{item}}</view>
        </block>
        
        <block wx:if="{{school.pros && school.pros.length}}">
          <view class="profile-title" style="margin-top: 16rpx;">适合报考的考生群体</view>
          <view wx:for="{{school.pros}}" wx:key="*this" class="profile-line">· {{item}}</view>
        </block>
      </view>
    </block>
    
    <view class="source-mix" style="margin-top: 24rpx;">
      <view class="green">
        <text>数据状态</text>
        <strong>官方发布已核验</strong>
      </view>
      <view class="blue">
        <text>年份范围</text>
        <strong>2025/2026</strong>
      </view>
      <view class="orange">
        <text>数据类型</text>
        <strong>公开数据</strong>
      </view>
    </view>
    
    <view class="source-note">
      <view class="source-note-title">⚠️ 数据安全承诺与免责声明</view>
      <view>1. 数据源：均来源于上海市教育考试院及各区教育局发布的 2025/2026 年官方 PDF。如有差异以官方纸质公告为准。</view>
      <view>2. 强结论控制：本平台不提供“天花板”、“收割机”等夸大表述。民办摇号及到校资格受政策变动影响，不可视作绝对依据。</view>
    </view>
  </view>

  <!-- 6. 收藏与对比区域 -->
  <!-- 微信咨询卡片 -->
  <view class="panel-card consult-card" bindtap="copyWechat" hover-class="consult-card-hover">
    <view class="consult-badge">填报规划</view>
    <view class="consult-header">
      <view class="consult-title">{{consultantTitle}}</view>
      <view class="consult-wechat-tag">微信号: MarshallPD</view>
    </view>
    <view class="consult-body">{{consultantText}}</view>
    <view class="consult-btn">
      <text class="icon-wechat">💬</text> 一键复制微信号咨询老师
    </view>
  </view>

  <!-- 志愿操作区 (点击热区不小于 88rpx) -->
  <view class="school-cta panel-card">
    <view class="cta-title">六、志愿决策操作区</view>
    <view class="cta-desc">志愿填报影响重大，添加微信号可提供 1对1 人工免费方案核实排查。</view>
    
    <view class="cta-actions-grid">
      <button class="cta-btn primary {{savedSchool ? 'saved-active' : ''}}" bindtap="saveSchool" hover-class="shortcut-hover">
        {{savedSchool ? '🌟 已关注 (点击取消)' : '⭐ 关注目标高中'}}
      </button>
      <button class="cta-btn secondary" bindtap="addCompare" hover-class="shortcut-hover">加入学校对比</button>
      <button class="cta-btn secondary" bindtap="openCompare" hover-class="shortcut-hover">查看对比方案</button>
      <button class="cta-btn secondary" bindtap="copyConsultText" hover-class="shortcut-hover">复制参考摘要</button>
    </view>
  </view>
</view>
<view wx:else class="empty">加载中...</view>