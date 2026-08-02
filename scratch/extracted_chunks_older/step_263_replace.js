    <!-- 志愿填报风险排查清单 -->
    <view class="panel-card risk-checklist-card">
      <view class="plan-title text-red">📋 需要家长确认的待办条件</view>
      <view class="checklist-desc">根据考生当前估分及招生类型，建议逐项勾选确认以下关键待办，规避政策限制及滑档：</view>
      <view class="checklist-items">
        <view wx:for="{{todoList}}" wx:key="id" class="checklist-item {{item.checked ? 'completed' : ''}}" data-id="{{item.id}}" bindtap="toggleTodo" hover-class="shortcut-hover">
          <view class="check-box-wrap">
            <view class="check-box {{item.checked ? 'checked' : ''}}">
              <text wx:if="{{item.checked}}">✓</text>
            </view>
          </view>
          <view class="check-text">
            <text class="check-bold">{{item.title}}</text>
            <text>{{item.desc}}</text>
          </view>
        </view>
      </view>
 
      <view class="wechat-consult-box" bindtap="copyWechat" hover-class="wechat-consult-box-hover">
        <view class="consult-badge orange-badge">填报建议</view>
        <view class="consult-wechat-tag">微信咨询: MarshallPD</view>
        <view class="consult-prompt">算法自诊基于公开数据，实际名额资格或自招变化有更复杂的区校级细节。点击复制微信，可免费获取 1对1 人工志愿排查，并赠送《2026年上海中考名额分配与志愿填报避坑指南.pdf》。</view>
        <button class="copy-wechat-btn">💬 一键复制微信号咨询老师</button>
      </view>
    </view>