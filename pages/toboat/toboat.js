const util = require('../../utils/util.js');
var app=getApp();
var common = require('../../common/index.js');
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
      'https://xiaoyibang.top:8002/uploads/photo/4_2WZVla0.jpg',
      'https://xiaoyibang.top:8002/uploads/photo/9_9eMbYEf.jpg',
      'https://xiaoyibang.top:8002/uploads/photo/6_57uxCYM.jpg'
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
    ],
    likethis:false,
    likers:125,   //心仪的人数
    

    startprice:'',
    name:'',
    reputation:'',
  },



  /**

   * 生命周期函数--监听页面加载

   */

  onLoad: function(options) {
    console.log(common.currentData)
    this.setData({
      startprice:common.currentData.startprice,
      name:common.currentData.name,
      reputation:common.currentData.reputation
    })
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
    //增加一张船票

    //假装增加了

    //跳转查看船票
    wx.switchTab({
      url: '/pages/boat/boat',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
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