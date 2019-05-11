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
    if(app.globalData.userid){
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
                app.globalData.userid=res.data.userid;
                app.globalData.status=res.data.status;
                app.globalData.number=res.data.number;
                app.globalData.account=res.data.account;
                app.globalData.number=res.data.number;
                console.log("用户信息", res.data)
                app.getorderlist();
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


                if (app.globalData.pageid == 2) { //实名认证
                  if (app.globalData.status != 0) {
                    wx.showToast({
                      title: '您已完成实名认证',
                      icon: 'none',
                    })
                  }
                  else {
                    wx.showModal({
                      title: '实名认证',
                      content: '完成实名认证好友也可领取贝壳哦~',
                      success: (res) => {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/verify/verify',
                          })
                        } else {
                          console.log("取消")
                        }
                      }
                    })
                  }

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