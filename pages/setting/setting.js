// pages/setting/setting.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pic: '',
    teamname: '',
    time: '',
    top: '180',
    popup: true,
    show_model: true,
    code: '',
    t: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  scroll(e) {
    console.log(e);
    this.setData({
      t: e.detail.scrollTop
    })
    console.log('距离是' + this.data.t);
  },
  touchend: function() {

    this.setData({
      top: 180
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      name: app.globalData.nickname,
      pic: app.globalData.avatarUrl,
      teamname: app.globalData.teamname,
      time: app.globalData.time
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  changelist1: function() {
    wx.navigateTo({
      url: '../asset/asset',
    })
    app.list = 1;
  },
  changelist2: function() {
    wx.navigateTo({
      url: '../asset/asset',
    })
    app.list = 2;
  },
  changelist3: function() {
    this.setData({
      popup: false
    })
  },
  changelist4: function() {
    wx.navigateTo({
      url: '../asset/asset',
    })
    app.list = 4;
  },
  changelist5: function() {
    wx.navigateTo({
      url: '../asset/asset',
    })
    app.list = 5;
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
  yaoqingma: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getin: function() {
    this.setData({
      "popup": true
    });

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  scroll: function(e) {


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





})