var app = getApp()
Page({
  data: {
    h: '',//高度
    t: 1,//几等奖0是特等奖  1:运动相机 2：英雄皮肤  3：100贝壳 4：5贝壳
    //5：和开发者吃饭 6：清养生茶  7：樱花茶杯  0：IPHONEX
    award: '',//名字
    account: '',
    circleList: [],//圆点数组
    awardList: [],//奖品数组
    colorCircleFirst: '#FFDF2F',//圆点颜色1
    colorCircleSecond: '#FE4D32',//圆点颜色2
    colorAwardDefault: '#F5F0FC',//奖品默认颜色
    colorAwardSelect: '#ffe400',//奖品选中颜色
    indexSelect: 0,//被选中的奖品index
    isRunning: false,//是否正在抽奖
    imageAward: [
      '/static/getprize/8.jpg',
      '/static/getprize/1.jpg',
      '/static/getprize/2.jpg',
      '/static/getprize/3.jpg',
      '/static/getprize/4.jpg',
      '/static/getprize/5.jpg',
      '/static/getprize/6.jpg',
      '/static/getprize/7.jpg',


    ],//奖品图片数组

    aa: [//获奖名单
      {

        nickName: "刘**",

        reward: "IPHONEX",
        vertify:'2016级遥感信息工程学院'

      },

      {

        nickName: "李**",

        reward: "IPHONEX",
        vertify: '2016级遥感信息工程学院'

      },

      {

        nickName: "龙**",

        reward: "IPHONEX",
        vertify: '2016级遥感信息工程学院'

      },

      {

        nickName: "基**",

        reward: "IPHONEX",
        vertify: '2016级遥感信息工程学院'

      },

      {

        nickName: "于**",

        reward: "5贝壳",
        vertify: '2016级遥感信息工程学院'

      },



    ],

  },
  onReady: function () {
    this.setData({
      h: app.globalData.height,
      account: app.globalData.account,
    });
    console.log(this.data.h)
  },
  onLoad: function () {
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
    }
    this.setData({
      awardList: awardList
    })
  },
  mx: function () {
    wx.navigateTo({
      url: '/pages/prizedetail/prizedetail',
    })
  },
  //开始游戏
  startGame: function (prize) {
    if (this.data.isRunning) return
    this.setData({
      isRunning: true
    })
    prize = Number(prize);
    console.log(prize);
    var t = prize;
    //奖项确定
    var _this = this;
    var indexSelect = 0
    var i = 0;
    var timer = setInterval(fn, (i + 100));
    function fn() {
      indexSelect++;
      //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
      i += 10;
      clearInterval(timer);
      timer = setInterval(fn, (i + 100));
      if (i > 300 && (indexSelect % 8) == t) {
        //去除循环
        clearInterval(timer)
        //获奖提示
        switch (prize) {
          case 1:
            _this.setData({
              award: '运动相机'
            })
            break;

          case 2:
            _this.setData({
              award: '英雄皮肤'
            })
            break;
          case 3:
            _this.setData({
              award: '樱花茶杯'
            })
            break;
          case 4:
            _this.setData({
              award: '100贝壳'
            })
            break;
          case 5:
            _this.setData({
              award: '轻养身茶'
            })
            break;
          case 6:
            _this.setData({
              award: '和开发者共进午餐'
            })
            break;
          case 7:
            _this.setData({
              award: '5贝壳'
            })
            break;
        }
        wx.showModal({
          title: '恭喜您',
          content: '获得了' + (_this.data.award) + "",
          showCancel: false,//去掉取消按钮
          success: function (res) {
            if (res.confirm) {
              _this.setData({
                isRunning: false
              })
            }
          }
        })
      }
      indexSelect = indexSelect % 8;
      _this.setData({
        indexSelect: indexSelect
      })
    }
  },
  getprize: function () {
    var that = this;
    wx.request({
      url:  "https://xiaoyibang.top:8001/dajia/getgift",
      data: {
        "userid": app.globalData.userid,
      },
      success: (res) => {
        if (res.data.prize) {
          that.startGame(res.data.prize);
          app.globalData.account = res.data.account;
          var information = {
            'userid': app.globalData.userid,
            'teamname': app.globalData.teamname,
            'name': app.globalData.nickname,
            'number': app.globalData.time,
            'status': 2,
            'nickname': app.globalData.nickname,
            'avatarUrl': app.globalData.avatarUrl,
            'account': app.globalData.account,
          }
          wx.setStorage({
            key: 'information',
            data: information,
          })

          setTimeout(function () {
            that.setData({
              account: res.data.account,
            })

          }, 7000)
          

        }

        else if (res.data.error) {
          wx.showToast({
            title: '您的贝壳不足',
            icon: "loading",
          })
        }
        else {
          wx.showToast({
            title: '网络错误',
            icon: "loading",
          });
        }


      },
      fail: (res) => {
        wx.showToast({
          title: '网络错误',
          icon: "success",
        });
      }
    })

  },

})
