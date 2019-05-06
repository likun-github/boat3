// pages/class/class.js
var common = require("../../common/index.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketData: [],
    noticket: false, //没有船票显示引导购买
    ticketlist_ing: [], //    进行中的船票的数据  (订、砍、拼团---总之未付款)
    ticketlist_ed: [], // 已结束的船票的数据（完成/取消）
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    added: false,
    add_all: false,
    overList: true, //是否展示购买的底层按钮view
    ticket_number: 6, //船票数量

    // items:[
    //  {'content' :12,
    //     'answer' :'54',
    //     'description':'sa定位',},
    //   {
    //     'content': 12,
    //     'answer': '54',
    //     'description': 'sa定位',
    //   },
    //   {
    //     'content': 12,
    //     'answer': '54',
    //     'description': 'sa定位',
    //   },
    //   {
    //     'content': 12,
    //     'answer': '54',
    //     'description': 'sa定位',
    //   },
    //   ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
<<<<<<< HEAD
    this.setData({
      ticketlist_ing: app.globalData.ticketlist_ing,
      ticketlist_ed: app.globalData.ticketlist_ed
    })
=======
   

    // this.setData({
     
    //   ticketData: ticketData.ticketData
    // });

>>>>>>> 704f6782adc8def2757a7c0d3b4582abcef7d345


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  turnTobuy: function() {
    wx.switchTab({
      url: '/pages/home/home',
      success: function(e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },



  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current,
      overList: !this.data.overList
    });
    console.log("now:tab", this.data.currentTab)
    this.checkCor();

  },


  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  look_ticker: function() {
    wx.navigateTo({
      url: "/pages/tickets/tickets"
    })
  },


  addtobuylist: function() {

    this.setData({
      added: !this.data.added
    })
  },


  team_cut: function() {
    wx.navigateTo({
      url: '/pages/teamcut/teamcut',
    })
  },

  add_allTobuylist: function() {
    this.setData({
      add_all: !this.data.add_all,
      added: !this.data.added
    })
  }

})