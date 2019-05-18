// pages/look_tickets/look_tickets.js

var app = getApp();
var common = require("../../common/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_list:[],
    index:'',
    avatarUrl:"",
    nickname:"",
    serviver_wx_pic: '',
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log('options:',options)
    for (var i = 0; i < common.orderlist.length;i++){
      if(options.orderid==common.orderlist[i].orderid){
        let temp=[]
        temp = common.orderlist[i]
        this.setData({
          order_list:temp
        }) 
      }
    }
    console.log('common.orderlist', common)

    if(this.data.order_list.status==0){
      wx.showModal({
        title: '查看',
        content: '您已经取消了该订单',
        confirmText: "确定",
        confirmColor: "#0f0",
        showCancel: false,
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }else{

      var index_temp="";
      //这里开始判别显示的船票种类
      
      if (this.data.order_list.state == 0){
          //大船
        console.log("this.data.order_list.status ", this.data.order_list.status)
        if (this.data.order_list.status == 2){
            index_temp=1
          }else{
            index_temp=2
          }
      } else if (this.data.order_list.state == 1){
          //小船
        console.log("this.data.order_list.status ", this.data.order_list.status )
        if (this.data.order_list.status == 1){
          index_temp = 3
        } else if (this.data.order_list.status == 2){
          index_temp = 4
        } else if (this.data.order_list.status == 4 || this.data.order_list.status == 3) {
          index_temp = 5
        }

      }


      //end 判断
      this.setData({
        serviver_wx_pic: "https://xiaoyibang.top:8001/uploads/"+this.data.order_list.production__merchant__logo,
        index: index_temp,
        nickname: app.globalData.nickname,
        avatarUrl: app.globalData.avatarUrl,
      })

      console.log("！！！这里的serviver_wx_pic：", this.data.serviver_wx_pic)
    }

  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  },



  final: function () {
    var that = this
    wx.showModal({
      title: '请确认完成订单',
      content: '确认后无法再次邀请好友砍价或参团',
      success: function (res) {
        if (res.confirm) {
          console.log('orderid:', that.data.order_list.orderid)
          wx.request({
            url: 'https://xiaoyibang.top:8001/dajia/completeorder',
            data: {
              'orderid': that.data.order_list.orderid,
            },
            success: (res) => {
              console.log("确认完成拼团  --这个过程")
            }
          })

          //这里是点击了确定以后
          console.log('用户点击确定');
          wx.switchTab({
            url: '/pages/home/home',
          })
          app.getorderlist();
          wx.showTabBar({
          })

          // var myEventDetail = {
          //   msg: 0,
          // }
          // var myEventOption = {}
          // that.triggerEvent('myevent', myEventDetail, myEventOption)
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },


  cut: function () {
    wx.navigateTo({
      url: '/pages/teamcut/teamcut?productionid=' + this.data.order_list.production_id +
        '&' + 'nickname=' + app.globalData.nickname +
        '&' + 'avatarUrl=' + app.globalData.avatarUrl +
        '&' + 'steamid=' + this.data.order_list.steam_id +
        '&' + 'userid=' + app.globalData.userid,
    })
  },

  

  payfor: function (e) {
    console.log(this.data.carts)
    // var pay = this.data.really_pay;

 
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/pay',
      data: {
        'userid': app.globalData.userid,
        'bee': this.data.order_list.endprice,
        'allorderid': this.data.order_list.orderid,
      },
      success: res => {
        console.log(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success(res) {
            console.log("支付成功")
            console.log(res)
          },
          fail(res) {
            console.log("支付失败")
            console.log(res)
          }
        })
      }
    })
    console.log(e)

  },


})