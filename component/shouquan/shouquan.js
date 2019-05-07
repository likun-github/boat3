// component/shouquan/shouquan.js
var app = getApp();
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
    hq: false,

  },
  ready: function() {
    if(app.globalData.login){
      return ''
    }
    else{
      this.setData({
        hq:true,
      })
      wx.hideTabBar({});
    }
    
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    preventTouchMove: function(e) {},

    onGotUserInfo(e) {
      console.log(e.detail.userInfo)
      if (e.detail.errMsg) {
        app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
        app.globalData.nickname = e.detail.userInfo.nickName;
        //无关信息
        app.globalData.gender = e.detail.userInfo.gender;
        app.globalData.country = e.detail.userInfo.country;
        app.globalData.province = e.detail.userInfo.province;
        app.globalData.city = e.detail.userInfo.city;
        app.globalData.language = e.detail.userInfo.language;
        var that =this
        wx.login({
          success: res => {
            console.log("微信小程序用户登录：", res)
            wx.request({
              url: 'https://xiaoyibang.top:8001/dajia/login',
              data: {
                'nickname': app.globalData.nickname,
                'gender': app.globalData.gender,
                'code': res.code,
                'pic': app.globalData.avatarUrl,
                'userid': app.globalData.userid,
              },
              success: (res) => {
                console.log("用户信息", res.data)
                var information = {
                  'userid': res.data.userid,
                  'teamname': res.data.team_name,
                  'name': res.data.name,
                  'number': res.data.number,
                  'status': res.data.status,
                  'nickname': app.globalData.nickname,
                  'avatarUrl': app.globalData.avatarUrl,
                  'account': res.data.account,
                }
                
                wx.setStorage({
                  key: 'information',
                  data: information,
                })      
              },
            })
          }
        })

        this.setData({
          hq: false,
        })
        wx.showTabBar({});
      } else {
        wx.showModal({
          title: '获取失败',
          content: '',
        })
      }
    },






  }
})