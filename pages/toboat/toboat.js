const util = require('../../utils/util.js');
var app = getApp();
var common = require('../../common/index.js');
Page({

  /**

   * 页面的初始数据

   * Linyufan.com

   */

  data: {
    url: 'https://xiaoyibang.top:8001/uploads/',
    url1: 'https://xiaoyibang.top:8001/',
    top: false, //是否置顶
    chooseinformation: 0, //默认详情
    chooseBoat: false, //我要上船点击
    chooseStatus: 0, //默认大船
    animationData: {}, //动画实例
    datalist: {},//评论列表
    buy:false,//是否购买
    text:'',//评论
    length:0,//评论条数



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
    likethis: false,
    likers: 125, //心仪的人数

    pic: [],
    startprice: '',
    endprice: '',
    name: '',
    number: '',
    reputation: '',
    rank: 0,
    position: '',
    introduction: '',
    introductionpic: '',
    logo: '',








  },



  /**

   * 生命周期函数--监听页面加载

   */

  onLoad: function(options) {

  },

  onShow: function() {
    this.checkstatus();
    console.log(common.currentData)
    var pic = [];
    pic.push(common.currentData.pic1)
    pic.push(common.currentData.pic2)
    pic.push(common.currentData.pic3)
    console.log(pic)
    this.setData({
      startprice: common.currentData.startprice,
      endprice: common.currentData.startprice * 0.6,
      name: common.currentData.name,
      number: common.currentData.number,
      reputation: common.currentData.reputation,
      rank: common.currentData.rank,
      introduction: common.currentData.introduction,
      position: common.currentData.merchant__location,

      introductionpic: this.data.url + common.currentData.introductionpic,
      pic: pic,
      logo: common.currentData.logo,
    })
   this.getcomment();


  },
  getcomment:function(){
    var that = this;
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/firstcomment',
      data: {
        'productionid': common.currentData.productionid,
      },
      success: (res) => {
       console.log(res.data.data)
       if(res.data.data==100){
         this.setData({
           length:999,
         })

       }
       else{
         this.setData({
           length:res.data.data.length,
         })
       }
       this.setData({
         datalist:res.data.data,
       })

      }
    })

  },
  gettext:function(e){
    console.log(e.detail)
    this.setData({
      text:e.detail.value,
    })

  },
  sendmessege:function(){
    var that = this;
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/comment',
      data: {
        'productionid': common.currentData.productionid,
        'userid':app.globalData.userid,
        'context':that.data.text,
      },
      success: (res) => {
       that.getcomment();

      }
    })

  },
  checkstatus:function(){
    for(var i=0;i<common.orderlist.length;i++){
      if(common.currentData.productionid==common.orderlist[i].production_id){
        this.setData({
          buy:true,
        })
        return 0;
      }
    }

  },//查看是否购买
  choose: function(e) {
    this.setData({
      chooseStatus: e.currentTarget.dataset.index,
    })

  },
  showModal: function() {
    if(this.data.buy){
      wx.switchTab({
        url: '/pages/boat/boat',
      })
    }
    else{
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

    }
   

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
    var height = app.globalData.height * 0.65 + 100;
    console.log(e.detail.scrollTop)
    if (e.detail.scrollTop > height) {
      if (!this.data.top) {
        this.setData({
          top: true,
        })

      }

    } else {
      if (this.data.top) {
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
  ticket:function(){
    wx.switchTab({
      url: '/pages/boat/boat',
    })

  },
  gomap: function() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },


  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target.id)
      console.log(res.from)
      //区分按钮分享
      if (res.target.id === "btn") {
        return {
          title: '快！和我拼团一起拿返现？',
          path: '/pages/toboat/toboat',
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
      }
    }
    //右上角分享
    return {
      title: '快！和我拼团一起拿返现？',
      path: '/pages/toboat/toboat',

      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  buybigboat: function() {
    var that = this;
    wx.request({
      url: that.data.url1 + 'dajia/buybigboat',
      data: {
        'userid': app.globalData.userid,
        'productionid': common.currentData.productionid,
      },
      success: (res) => {
        console.log(res.data);
        app.getorderlist();
        wx.switchTab({
          url: '/pages/boat/boat',
        });


      },
    })

  },
  buysmallboat:function(){
    var that = this;
    wx.request({
      url: that.data.url1 + 'dajia/buysmallboat',
      data: {
        'userid': app.globalData.userid,
        'productionid': common.currentData.productionid,
      },
      success: (res) => {
        console.log(res.data)
         app.getorderlist();
         wx.switchTab({
           url: '/pages/boat/boat',
         });
     

      },
    })

  },



  freebuy: function() {
    console.log("免费登船")

    //是否实名认证
    if (app.globalData.status == 0) {
      wx.showToast({
        title: '未认证正在跳转',
        duration: 1000,
        icon: 'loading',
      })
      setTimeout(function() {
        wx.navigateTo({
          url: "/pages/verify/verify",
        })

      }, 1000)
    } else { //已认证的用户，跳出支付对话框，支付完成后弹出支付完成对话框。点击对话框或关闭后跳转自己的small_boat
      var that = this;
      if (this.data.chooseStatus == 0) {
        this.buybigboat();
      } else {
        this.buysmallboat();
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

  //心仪点击后---收藏的功能吧！
  likethisProduction: function() {
    if (!this.data.likethis) {
      this.setData({
        likethis: true,
        likers: this.data.likers + 1
      })
    } else {
      this.setData({
        likethis: false,
        likers: this.data.likers - 1
      })
    }

  }






})