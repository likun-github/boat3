// pages/class/class.js

var ticketData = require('../../testdata.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticket: true, //没有船票显示引导购买
    ticketlist: [], //船票的数据
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    added:false,
    add_all:false,
    overList:true,   //是否展示购买的底层按钮view
    ticket_number:6,    //船票数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //每次进入此tab，刷新一次，假装从后台获取了数据


    this.setData({
      //jsonData.ticketData.js里定义的json数据，并赋值给ticketData
      ticketData: ticketData.ticketData
    });



    var temp1 = []
    var temp2 = []
    for(var i =0;i<this.data.ticketData.length;i++)
    {
      if(this.data.ticketData[i].state==0)//  订单正在进行的话
      {
        temp1.push(this.data.ticketData[i])
      }
      else
      {
        temp2.push(this.data.ticketData[i])
      }
    }
    this.data.ticketData=[]
    this.data.ticketData.push(temp1)
    this.data.ticketData.push(temp2)


    console.log("获取的产品详情ticketData：", this.data.ticketData)
    if (this.data.ticketData != null) {
      this.setData({
        noticket: false
      })
    }
    console.log(this.data.noticket)

    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
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
    console.log("now:tab",this.data.currentTab)
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
 
  look_ticker:function(){
    wx.navigateTo({
      url:"/pages/tickets/tickets"
    })
  },


  addtobuylist:function(){
    
    this.setData({
      added:!this.data.added
    })
  },


  team_cut:function(){
    wx.navigateTo({
      url: '/pages/teamcut/teamcut',
    })
  },

  add_allTobuylist:function(){
    this.setData({
      add_all: !this.data.add_all,
      added: !this.data.added
    })
  }

})