// pages/look_tickets/look_tickets.js

var app = getApp();
var common = require("../../common/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_list:[]
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

  }
})