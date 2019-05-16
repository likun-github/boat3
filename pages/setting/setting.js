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
  getPhoneNumber(e) {
    
    var that=this;

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny'){
      console.log("失败")

    }
    else{
      console.log("登陆")
      wx.login({
        success:res => {
          console.log("正在进行")
          console.log(res.code)
          console.log(e.detail.iv)
          console.log()
          wx.request({
            url: 'https://xiaoyibang.top:8001/dajia/getphone',
            data: {
              'userid': app.globalData.userid,
              'code': res.code,
              'iv': e.detail.iv,
              'encryptedData': e.detail.encryptedData,
            },
            success:res=>{
              console.log(res.data.success)
              
              if(res.data.success){
                console.log("好的")
                app.globalData.status = 1;                
                that.setData({
                  status: 1,
                })       
                var information = {
                  'userid': app.globalData.userid,
                  'teamname': app.globalData.teamname,
                  'name': app.globalData.name,
                  'number': app.globalData.time,
                  'status': app.globalData.status,
                  'nickname': app.globalData.nickname,
                  'avatarUrl': app.globalData.avatarUrl,
                  'account': app.globalData.account,
                }
                wx.setStorage({
                  key: 'information',
                  data: information,
                })



                wx.showLoading({
                  title: '正在跳转中',
                  duration:800,
                })
                setTimeout(function(){
                  wx.navigateTo({
                    url: '/pages/verify/verify',
                  })

                },800)
                

              }
              else{
              console.log("部好的")
               wx.showToast({
                 title: '获取信息失败',
                 icon:'none',
                 duration:1000,
               })
              }
            }
          })
          console.log('1')
          console.log(res.code)
        },
       

      })

    }
    
   
    
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
    var that=this;
    wx.showLoading({
      title: '正在刷新账户',
      duration:1000,
    })
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/getinfor',
      data: {
        'userid': app.globalData.userid,
      },
      success: (res) => {
        console.log('获取成')
        console.log(res.data)
        wx.showToast({
          title: '信息更新完成',
          icon:'none',
        })
        app.globalData.userid = res.data.userid;
        app.globalData.status = res.data.status;
        app.globalData.number = res.data.number;
        app.globalData.account = res.data.account;
        app.globalData.time = res.data.number;
        that.setData({
          account:res.data.account,
        })
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
      }
    })
    setTimeout(function(){
      wx.stopPullDownRefresh();
      console.log("gu")
      
      

    },1000)
    


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