//app.js
App({
  list:1,
  onLaunch: function () {
    var that=this;
    //屏幕信息
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
    height:'',
    name:'',
    avatarUrl:'',
    teamname:'',
    time:''
  }
})