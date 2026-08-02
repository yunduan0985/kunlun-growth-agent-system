    <!-- 估分区间多档位重算切换盘 -->
    <view wx:if="{{hasScoreRange}}" class="score-range-selector panel-card">
      <view class="selector-title">🔍 中考估分录取测试与三情景对比</view>
      <view class="selector-tabs">
        <view class="selector-tab {{activeScoreSegment === lowScore ? 'active' : ''}}" 
              data-score="{{lowScore}}" 
              bindtap="switchScoreSegment"
              hover-class="shortcut-hover">
          <view class="tab-label">低估情景 (-8分)</view>
          <view class="tab-score">{{lowScore}}分</view>
          <view class="tab-diagnostics" wx:if="{{lowDiagnostics}}">
            <view class="diag-counts">
              <text class="count-tag red">冲{{lowDiagnostics.counts[0].count + lowDiagnostics.counts[1].count}}</text>
              <text class="count-tag blue">稳{{lowDiagnostics.counts[2].count}}</text>
              <text class="count-tag green">保{{lowDiagnostics.counts[3].count + lowDiagnostics.counts[4].count}}</text>
            </view>
            <view class="diag-summary {{lowDiagnostics.summary === '高风险' ? 'text-red' : lowDiagnostics.summary === '需核对' ? 'text-orange' : 'text-green'}}">{{lowDiagnostics.summary}}</view>
          </view>
        </view>
        <view class="selector-tab {{activeScoreSegment === avgScore ? 'active' : ''}}" 
              data-score="{{avgScore}}" 
              bindtap="switchScoreSegment"
              hover-class="shortcut-hover">
          <view class="tab-label">中位情景</view>
          <view class="tab-score">{{avgScore}}分</view>
          <view class="tab-diagnostics" wx:if="{{avgDiagnostics}}">
            <view class="diag-counts">
              <text class="count-tag red">冲{{avgDiagnostics.counts[0].count + avgDiagnostics.counts[1].count}}</text>
              <text class="count-tag blue">稳{{avgDiagnostics.counts[2].count}}</text>
              <text class="count-tag green">保{{avgDiagnostics.counts[3].count + avgDiagnostics.counts[4].count}}</text>
            </view>
            <view class="diag-summary {{avgDiagnostics.summary === '高风险' ? 'text-red' : avgDiagnostics.summary === '需核对' ? 'text-orange' : 'text-green'}}">{{avgDiagnostics.summary}}</view>
          </view>
        </view>
        <view class="selector-tab {{activeScoreSegment === highScore ? 'active' : ''}}" 
              data-score="{{highScore}}" 
              bindtap="switchScoreSegment"
              hover-class="shortcut-hover">
          <view class="tab-label">高估情景 (+5分)</view>
          <view class="tab-score">{{highScore}}分</view>
          <view class="tab-diagnostics" wx:if="{{highDiagnostics}}">
            <view class="diag-counts">
              <text class="count-tag red">冲{{highDiagnostics.counts[0].count + highDiagnostics.counts[1].count}}</text>
              <text class="count-tag blue">稳{{highDiagnostics.counts[2].count}}</text>
              <text class="count-tag green">保{{highDiagnostics.counts[3].count + highDiagnostics.counts[4].count}}</text>
            </view>
            <view class="diag-summary {{highDiagnostics.summary === '高风险' ? 'text-red' : highDiagnostics.summary === '需核对' ? 'text-orange' : 'text-green'}}">{{highDiagnostics.summary}}</view>
          </view>
        </view>
      </view>
      <view class="selector-tips">💡 点击上方不同情景可一键切换下方诊断列表。建议稳和保至少保留 2 个，防范滑档风险。</view>
    </view>