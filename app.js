//app.js
var common=require('/common/index.js');
App({
  list:1,
  onLaunch: function () {
    var that=this;
    //获取屏幕高度
    wx.getSystemInfo({
      success(res) {
        that.globalData.height=res.windowHeight;
      }
    })
    //that.globalData.avatarUrl = wx.getStorageSync('pic');
    this.gethomelist();
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
  },
  gethomelist:function(){
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/home',
      data:{
        'teamid':1,
      },
      success:(res)=>{
        common.homelist=res.data;
      }
    })

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