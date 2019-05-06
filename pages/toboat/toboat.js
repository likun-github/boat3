const util = require('../../utils/util.js');
var app=getApp();

Page({

  /**

   * 页面的初始数据

   * Linyufan.com

   */

  data: {
    top: false, //是否置顶
    chooseinformation: 1, //默认详情
    chooseBoat: false, //我要上船点击
    chooseStatus: 0, //默认大船
    animationData: {}, //动画实例
    datalist: {},
    picture_production: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    judge: [{
      "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '太牛逼了BOAT,我的小船邀请码是 AD528  快来和我一起便宜吧',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '好啊',
      }, 
      {
      "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '太牛逼了BOAT,我的小船邀请码是 AD528  快来和我一起便宜吧',
      }, 
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '好啊',
      }, 
      {
       "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '太牛逼了BOAT,我的小船邀请码是 AD528  快来和我一起便宜吧',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '好啊',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '好啊',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '太牛逼了BOAT,我的小船邀请码是 AD528  快来和我一起便宜吧',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '好啊',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '好啊',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '太牛逼了BOAT,我的小船邀请码是 AD528  快来和我一起便宜吧',
      },
      {
        "url": "/static/sq.jpg",
        "title": '2016-艺术-李艮基',
        'time': '刚刚',
        'text': '好啊',
      },
    ],
    likethis:false,
    likers:125,   //心仪的人数
    
  },



  /**

   * 生命周期函数--监听页面加载

   */

  onLoad: function(options) {

  },

  onShow: function() {
 

  },
  choose: function(e) {
    this.setData({
      chooseStatus: e.currentTarget.dataset.index,
    })

  },
  showModal: function() {
    console.log("真正")
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      chooseBoat: true
    })
    // setTimeout(function () {
    //   animation.translateY(0).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 200)

    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })

  },
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        chooseBoat: false
      })
    }.bind(this), 200)
  },
  chooseinformation: function(e) {
    this.setData({
      chooseinformation: e.currentTarget.dataset.index,
    })

  },

  scrollnew: function(e) {
    var height = app.globalData.height*0.65+100;
    console.log(e.detail.scrollTop)
    if (e.detail.scrollTop > height) {
      if(!this.data.top){
        this.setData({
          top: true,
        })

      }
     
    } else {
      if(this.data.top){
        this.setData({
          top: false,
        })

      }
     

    }
  },

  
  home: function() {
    wx.navigateBack({
      delta: 1,
    })
  },
  gomap:function(){
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target.id)
      console.log(res.from)
      //区分按钮分享
      if (res.target.id === "btn") {
        return {
          title: '快！和我拼团一起拿返现？',
          path: '/pages/toboat/toboat',
          success: function (res) {
            // 转发成功
          },
          fail: function (res) {
            // 转发失败
          }
        }
      }
    }
    //右上角分享
    return {
      title: '快！和我拼团一起拿返现？',
      path: '/pages/toboat/toboat',
      
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },



  freebuy:function(){

    //是否实名认证
    if (app.globalData.status == 0) {
      wx.showToast({
        title: '未认证正在跳转',
        duration: 1000,
        icon: 'loading',
      })
      setTimeout(function () {
        wx.navigateTo({
          url: "/pages/verify/verify",
        }, 1000)
      })
    } else { //已认证的用户，跳出支付对话框，支付完成后弹出支付完成对话框。点击对话框或关闭后跳转自己的small_boat
      var that = this;
      switch (that.data.status) {

        case 1:
          //我要上船
          if (that.data.steamid) {
            that.buytogether(this.data.url + '/dajia/buytogether')
          } else {
            that.buyalone(this.data.url + '/dajia/buyalone');

          }

          break;
        case 2:
          //看我的船
          wx.navigateTo({
            url: "/pages/teamcut/teamcut?steamid=" + common.currentorder.steam_id + '&orderid=' + common.currentorder.orderid +
              '&avatarUrl=' + app.globalData.avatarUrl + '&nickname=' + app.globalData.nickname + '&userid=' + app.globalData.userid
          })
          break;

      }
    }


    // //增加一张船票

    // //假装增加了

    // //跳转查看船票
    // wx.switchTab({
    //   url: '/pages/boat/boat',
    //   success: function (e) {
    //     var page = getCurrentPages().pop();
    //     if (page == undefined || page == null) return;
    //     page.onLoad();
    //   }
    // }) 

  },


buyalone: function(url) {
    var that = this;
    wx.request({
      url: url,
      data: {
        "userid": app.globalData.userid,
        "periodid": common.currentData.periodid,
      },
      success: (res) => {
        common.currentorder.steam_id = res.data.steamid;
        common.currentorder.orderid = res.data.orderid;
        app.getorderlist();
        that.hidePopup(false);
      }
    })


  },
  buytogether: function(url) {
    console.log("运行buytogether")
    var that = this;
    wx.request({
      url: 'https://xiaoyibang.top:8002/dajia/buytogether',
      data: {
        "userid": app.globalData.userid,
        "periodid": common.currentData.periodid,
        "steamid": that.data.steamid,
      },
      success: (res) => {

        if (res.data.success) {
          common.currentorder.steam_id = res.data.steamid;
          common.currentorder.orderid = res.data.orderid;
          that.hidePopup(false);
          app.getorderlist();

        } else {
          wx.showToast({ //如果全部加载完成了也弹一个框
            title: res.data.reason,
            icon: 'success',
            duration: 1000
          });
          setTimeout(function() {
            wx.navigateTo({
              url: "/pages/home/home"

            })
          }, 850)

        }


      }
    })


  },
  //心仪点击后---收藏的功能吧！
  likethisProduction:function(){
    if (!this.data.likethis){
      this.setData({
        likethis: true,
        likers: this.data.likers + 1
      })
    }else{
      this.setData({
        likethis: false,
        likers: this.data.likers -1 
      })
    }
   
  }






})