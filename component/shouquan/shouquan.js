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
  var information=wx.getStorageSync('information');
  console.log(information)
  if(information){
    this.setData({
      hq:false,
    })
    app.globalData.nickname=information.nickname;
    app.globalData.avatarUrl=information.avatarUrl;
  }
  else{
    wx.hideTabBar({})

  }
  //if(sq!=1)
  
},
  /**
   * 组件的方法列表
   */
  methods: {
    preventTouchMove: function (e) {
    },
    onGotUserInfo(e) {
      if(e.detail.errMsg){
        app.globalData.avatarUrl=e.detail.userInfo.avatarUrl;
        app.globalData.nickname=e.detail.userInfo.nickName;
        wx.setStorage({
          key: 'information',
          data: {
            'avatarUrl':app.globalData.avatarUrl,
            'nickname':app.globalData.nickname,
          },
        })
        this.setData({
          hq:false,
        })
        wx.showTabBar({});
      }
      else{
        wx.showModal({
          title: '获取失败',
          content: '',
        })

      }
      //console.log(e.detail.errMsg)
      // app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      // if (e.detail.errMsg){
      //   this.setData({
      //         hq:false})
      //   wx.showTabBar({});
      //   wx.setStorageSync('pic', e.detail.userInfo.avatarUrl);
      //   wx.setStorageSync('sq', '1')
      // }
      // else {
      //   wx.showModal({
      //     title: '获取失败',
      //     content: '',
      //   })
      // }
    }
  }
})
