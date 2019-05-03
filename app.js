//app.js
App({
  onLaunch: function () {
    var that=this;
    //获取屏幕高度
    wx.getSystemInfo({
      success(res) {
        that.globalData.height=res.windowHeight;
        
        
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
  },
  globalData: {
    name: '',
    teamname: '',
    time: '',
    nickname: '',
    avatarUrl: '',
    height:'',
  }
})