  </view>

  <!-- 初中学校搜索半屏弹窗 -->
  <view class="half-screen-dialog {{showSchoolSearch ? 'show' : ''}}" style="z-index: 9999;">
    <view class="dialog-mask" bindtap="closeSchoolSearch"></view>
    <view class="dialog-content search-dialog-content">
      <view class="dialog-header">
        <text class="dialog-title">选择就读初中</text>
        <text class="dialog-close" bindtap="closeSchoolSearch">✕</text>
      </view>
      <view class="search-input-box">
        <input class="search-bar" type="text" placeholder="输入学校关键字搜索..." value="{{schoolSearchKeyword}}" bindinput="inputSchoolSearch" focus="{{showSchoolSearch}}" />
        <text wx:if="{{schoolSearchKeyword}}" class="search-clear" bindtap="clearSchoolSearch">✕</text>
      </view>
      <scroll-view scroll-y class="dialog-body search-list-body">
        <view wx:for="{{filteredSchools}}" wx:key="*this" class="search-item-row" data-name="{{item}}" bindtap="selectSchool">
          {{item}}
        </view>
        <view wx:if="{{!filteredSchools.length}}" class="empty small">未搜到相关初中学校...</view>
      </scroll-view>
    </view>
  </view>
</view>