// pages/home/home.js
var app = getApp();
var listData = require('../../testdata.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_flag: 'false',
    animationData: {},
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    currentSwiper: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    ips: [{
        id: "1",
        title: "驾校",
        isSelect: true
      },
      {
        id: "2",
        title: "健身",
        isSelect: false
      },
      {
        id: "3",
        title: "外语",
        isSelect: false
      },
      {
        id: "4",
        title: "托福",
        isSelect: false
      },
      {
        id: "5",
        title: "雅思",
        isSelect: false
      },
      {
        id: "6",
        title: "电动车",
        isSelect: false
      },
      {
        id: "7",
        title: "考研",
        isSelect: false
      },

    ],
    content: "全部", //选项被选中后内容页面的展示
    scroll_top: 0,
    listData: [], //产品的详情
    showData: [], //需要展示的产品信息

    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置


    orderName_list:['按综合','按价格','按距离'],
    orderName:'按综合',
    showModal: false,


  },
  onslidechangeend: function (e) {
    var that = this;

    that.setData({
      currentSwiper: e.detail.current
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
      listData: listData.producationData
    });

    console.log("获取的产品详情list：", this.data.listData)

    this.setData({
      showData: this.data.listData[0]
    })

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


  onPageScroll: function(e) {
    console.log(e.scrollTop, this.data.scroll_top)
    this.setData({
      'scroll_top': e.scrollTop
    })
  },



  /**
   * item点击事件
   */
  onIpItemClick: function(event) {
    var id = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips.length; i++) {
      if (id == this.data.ips[i].id) {
        this.data.ips[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips[i].isSelect = false;
      }
    }

    this.setData({
      content: this.data.ips[curIndex].id, //这个是种类控制的index
      ips: this.data.ips, //这个是类别的中文内容
    });

    this.setData({
      showData: this.data.listData[this.data.content - 1]
    })


  },

  to_producation_page: function(e) {
    console.log("查看产品的详情信息-->")
    var $data = e.currentTarget.dataset;
    console.log("用户点击的是", $data);

    wx.navigateTo({
      url: '/pages/toboat/toboat?producation_cutdowmPrice=' + $data.bean.producation_cutdowmPrice +
        '&producation_name=' + $data.bean.producation_name +
        '&producation_originalPrice=' + $data.bean.producation_originalPrice +
        '&producation_pic_url=' + $data.bean.producation_pic_url,
    })
  },


  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },


  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
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
  checkCor: function () {
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

  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }

 

})