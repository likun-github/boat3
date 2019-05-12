// pages/setting/setting.js
var app = getApp();
var common=require("../../common/index.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pic: '',
    teamname: '',
    time: '',
    top: '70',
    popup: true,
    number: '',
    imagePath: 'https://xiaoyibang.top:8001/static/ma.jpg',
    code: '',//邀请码
    t: 0,
    status: 0,
    deletecode:'',//邀请码删除
  },
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gotoverify: function () {
    wx.navigateTo({
      url: '/pages/verify/verify',
    })

  },
  gotogetprize: function () {
    wx.navigateTo({
      url: '/pages/getprize/getprize',
    })

  },
  hidepop: function () {
    this.setData({
      popup: true,
    })

  },

  scroll(e) {
    // console.log(e);
    // this.setData({
    //   t: e.detail.scrollTop
    // })
    // console.log('距离是' + this.data.t);
  },
  touchend: function () {

    // this.setData({
    //   top: 80
    // })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      name: app.globalData.nickname,
      pic: app.globalData.avatarUrl,
      teamname: app.globalData.teamname,
      status: app.globalData.status,
      account: app.globalData.account,
      number: app.globalData.time,
    })


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("正在展示")
    this.setData({
      status: app.globalData.status,
      account: app.globalData.account,
      number: app.globalData.time,
    })

  },
  changelist1: function () {
    wx.navigateTo({
      url: '../list1/list1',
    })
    
  },
  changelist2: function () {
    wx.navigateTo({
      url: '../list2/list2',
    })
    
  },
  changelist3: function () {
    this.setData({
      popup: false
    })
  },
  changelist4: function () {
    wx.navigateTo({
      url: '../list4/list4',
    })
    
  },
  changelist5: function () {
    wx.navigateTo({
      url: '../list5/list5',
    })
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  yaoqingma: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getin: function () {
    var that = this;
    if(this.data.code){
      wx.request({
        url: 'https://xiaoyibang.top:8001/dajia/findboatmaster',
        data: {
          'steamid': that.data.code,
        },
        success: (res) => {
          if (res.data.success) {

            if(res.data.userid==app.globalData.userid){
              wx.showToast({
                title: '不能加入自己的船',
                icon: 'none',
              })
              that.setData({
                deletecode: '',
              })
              that.setData({
                "popup": true
              });
              return '';


            }
            if (res.data.number < 5) {
              
              var production=false;
              for (var i = 0; i < common.homelist.length; i++) {
                if (res.data.productionid == common.homelist[i].productionid) {
                  common.currentData = common.homelist[i];
                  production=true;
                  break;
                }
              }
              if(production){
                wx.showLoading({
                  title: '正在跳转',

                })
                setTimeout(function () {
                  wx.hideLoading()
                  that.setData({
                    deletecode: '',
                  })
                  that.setData({
                    "popup": true
                  });
                  wx.navigateTo({
                    url: "/pages/toboat/toboat?steamid=" + that.data.code +
                      '&' + 'name=' + res.data.name +
                      '&' + 'department=' + res.data.department,
                  })

                }, 1500)

              }
              else{
                wx.showToast({
                  title: '无效的邀请码',
                  icon: 'none',
                })
                that.setData({
                  deletecode: '',
                })

              }
              

            }
            else {
              wx.showToast({
                title: '团队成员已满',
                icon: 'none',
              })
              that.setData({
                deletecode: '',
              })

            }


          }
          else {
            console.log("bu拥有该团队");
            wx.showToast({
              title: '无效的邀请码',
              icon: 'none',
            })
            that.setData({
              deletecode: '',
            })

          }

        }
      })

    }
    else{
      wx.showToast({
        title: '请输入邀请码',
        icon:'none',
      })
    }
    
    
    

  },
  hidden: function () {
    this.setData({
      "popup": true
    });

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  scroll: function (e) {


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '完成实名认证领取贝壳',
      path: 'pages/home/home?puserid=' + app.globalData.userid+
      '&' + 'pageid=' + 2,
      success: (res) => {
        console.log("转发成功", res);

      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }

  },





})