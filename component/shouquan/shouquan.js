// component/shouquan/shouquan.js
var app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hq:true

  },
ready:function(){
  var sq=wx.getStorageSync('sq');
  if(sq!=1)
  wx.hideTabBar({})
},
  /**
   * 组件的方法列表
   */
  methods: {
    preventTouchMove: function (e) {
    },
    onGotUserInfo(e) {
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      if (e.detail.errMsg){
        this.setData({
              hq:false})
        wx.showTabBar({});
        wx.setStorageSync('pic', e.detail.userInfo.avatarUrl);
        wx.setStorageSync('sq', '1')
      }
      else {
        wx.showModal({
          title: '获取失败',
          content: '',
        })
      }
    }
  }
})
