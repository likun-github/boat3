// pages/home/home.js
var app = getApp();
var common=require('../../common/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://xiaoyibang.top:8001/uploads/',
    animationData: {},//动画
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],//上面三张
    currentSwiper: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,//swiper配置

    content: "全部", //选项被选中后内容页面的展示
    scroll_top: 0,
    listData: [], //所有产品的详情
    showData: [], //需要展示的产品信息

    winHeight: "", //窗口高度
    currentTab: 1, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置


    orderName_list:['按综合','按价格','按距离'],
    orderName:'按综合',
    orderName_index:0,
    showModal: false,


    //默认的产品排序情况
    choose1:true,
    choose2:false,
    choose3:false,


   

  },


  // 滚动切换标签样式
  swiper_change_view:function(e){
    console.log(e.detail.current)
    this.setData({
      currentTab: e.detail.current
    })
    this.checkCor();
    // this.swichNav(e)
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
    if(options.puserid){
      app.globalData.puserid=options.puserid;
      wx.showToast({
        title: '完成实名认证好友也可领取贝壳哦~',
      })
    }
    // this.setData({
    //   //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList
    //   listData: listData.producationData
    // });

    // console.log("获取的产品详情list：", this.data.listData)

    // this.setData({
    //   showData: this.data.listData[0]
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      listData:common.homelist,
      showData:common.showData,
    });
    

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





  to_producation_page: function(e) {
    var id =new Array();
    id.push(e.currentTarget.dataset.id) ;
    for(var i=0;i<common.homelist.length;i++){
      if(common.homelist[i].productionid==id){
        common.currentData=common.homelist[i];
      }
    }

    wx.navigateTo({
      url: '/pages/toboat/toboat'
    })
    
   
  },


  // 滚动切换标签样式



  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    console.log(e)
    var list=[];
    this.setData({
      currentTab:e.target.dataset.current,
    })
    for(var i=0;i<common.homelist.length;i++){
      if (common.homelist[i].type == e.target.dataset.current){
        list.push(common.homelist[i]);
      }
    }
    this.setData({
      showData:list,
    })
  
  },


 
  //下面这个function和  hideModal_function的
  //wx与setdata的顺序是很重要的！！！！！！！！！！！！

  showDialogBtn: function () {
    wx.hideTabBar({
    });
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

    //排序
    // this.data.orderName_index==012 ->  按xxx


    this.setData({
      showModal: false
    });
    wx.showTabBar({
    });
   

  },
  


  choose1:function(){
    this.setData({
      orderName: this.data.orderName_list[0],
      orderName_index:0,
      choose1:true,
      choose2: false,
      choose3: false,
    })
  },

 
  choose2: function () {
    this.setData({
      orderName:this.data.orderName_list[1],
      orderName_index: 1,
      choose1: false,
      choose2: true,
      choose3: false,
    
    })
  },

  choose3: function () {
    this.setData({
      orderName: this.data.orderName_list[2],
      orderName_index: 2,
      choose1: false,
      choose2: false,
      choose3: true,
    })
  },

})