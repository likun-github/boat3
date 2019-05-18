// pages/class/class.js
var common = require("../../common/index.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stickets:false,
    ticketData: [],
    noticket: true, //没有船票显示引导购买
    ticketlist_ing: [], //    进行中的船票的数据  (订、砍、拼团---总之未付款)
    ticketlist_ed: [], // 已结束的船票的数据（完成/取消）
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    added: [], //ing船票的是否加入购物车标志
    add_all: false,
    overList: true, //是否展示购买的底层按钮view
    ticket_number: 0, //船票数量
    buylist: [], //添加到购物车的list，打对勾

    temp:'',
    index:'',


    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据

    selectAllStatus: false, // 全选状态，默认全选

    really_pay: 0, //实际支付
    total_pay: 0, // 总价，初始为0
    cut_pay: 0, //优惠额
  },

show:function(e){
    console.log("wocao"+e.detail.msg)
    this.setData({
      stickets:false
    })
},
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.ticketlist_ing;
    const selected = carts[index].added;
    carts[index].added = !selected;
    let num = 0;
    for (let i = 0; i < carts.length; i++) {
      if(carts[i].added)
      num++;
    }
    if (num == carts.length)
      this.setData({
        selectAllStatus: true
      });
    else this.setData({
      selectAllStatus: false
    });
    this.setData({
      ticketlist_ing: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.ticketlist_ing; // 获取购物车列表
    let total = 0;
    let cut = 0;
    let pay = 0;
    let num = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].added) { // 判断选中才会计算价格
        //判断大船小船的优惠？？？？
        if (carts[i].state==1){
          //小船
          total += carts[i].production__startprice; // 所有价格加起来
          cut += carts[i].steam__cutprice;
          pay += carts[i].endprice;
          num += 1;
        }else{
          //大船
          total += carts[i].production__startprice; // 所有价格加起来
          cut += carts[i].production__startprice - carts[i].endprice;
          pay += carts[i].endprice;
          num += 1;
        }
        
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      total_pay: total.toFixed(2),
      cut_pay: cut.toFixed(2),
      really_pay: pay,
      ticket_number: num,
    });


  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.ticketlist_ing;

    for (let i = 0; i < carts.length; i++) {
      carts[i].added = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      ticketlist_ing: carts
    });
    this.getTotalPrice();
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    var ticket1 = [];
    var ticket2 = [];
    var ticketData = common.orderlist;
    console.log(ticketData.length)
    if (ticketData.length>0)
    this.setData({
      noticket:false
    })
    else this.setData({
      noticket: true
    })
    
    for (var i = 0; i < ticketData.length; i++) {
      
      ticketData[i].production__merchant__logo = "https://xiaoyibang.top:8001/uploads/" + ticketData[i].production__merchant__logo
      

      if (ticketData[i].status == 1 || ticketData[i].status == 2) {
        if (ticketData[i].state == 1) {
          ticketData[i].endprice = ticketData[i].production__startprice - ticketData[i].steam__cutprice;
        }
        //  订单正在进行的话
        //（1"预付完成"),
        // (2"拼团完成"),
        ticket1.push(ticketData[i]);

      } else {
        // (0, "订单取消"),
        // (3, "支付完成"),
        // (4, "订单完成"),
        ticketData[i].added = false;
        ticket2.push(ticketData[i]);

      }
    }

    this.setData({
      ticketlist_ing: ticket1,
      ticketlist_ed: ticket2
    })



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
  onShareAppMessage: function () { },
  turnTobuy: function () {
    wx.switchTab({
      url: '/pages/home/home',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
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


  back:function(){
    this.setData({
      stickets:false
    })
    wx.showTabBar({});
  },


  look_ticker1:function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/look_tickets/look_tickets?orderid=' + e.currentTarget.dataset.orderid + '&tickettype=' + e.currentTarget.dataset.tickettype,
    })
  },

  look_ticker: function (e) {
   
    // console.log(e)
    if (e.currentTarget.dataset.cancel=='nocancel'){
      console.log('用户查看船票', e.currentTarget.dataset.index, e.currentTarget.dataset.tickettype)
      if (e.currentTarget.dataset.tickettype == 'ing') {
        var temp = this.data.ticketlist_ing[e.currentTarget.dataset.index]
        this.setData({
          temp:temp
        })
        // wx.hideTabBar({});
        this.setData({
          stickets: true
        })
        console.log('this.data.temp',this.data.temp);


        if(temp.state==0 && temp.status==2){
          this.setData({
            index: 1
          })
        }
        else if (temp.state == 1 && temp.status == 1){
          this.setData({
            index: 3
          })
        }
        else if (temp.state == 1 && temp.status == 4) {
          this.setData({
            index: 4
          })
          console.log("index:",index)
        }
        else{
          this.setData({
            index: 4
          })
        }
      

//o-big 1-small 

        // wx.navigateTo({
        //   url: "/pages/tickets/tickets?final_price=" + temp.endprice + '&' +
        //     'start_price=' + temp.production__startprice + '&' +
        //     'yuyue_string=' + temp.certificate + '&' +
        //     'yuyue_telephone=' + temp.production__merchant__telephone + '&' +
        //     'payfor_string=' + '' + '&'
        //     + 'index=1'
        // })
      } else {
        // wx.hideTabBar({});
        this.setData({
          stickets: true
        })
        var temp = this.data.ticketlist_ed[e.currentTarget.dataset.index]
        this.setData({
          temp: temp
        })
        console.log('this.data.temp',this.data.temp);
        
        if (temp.state == 0 && temp.status == 3) {
          this.setData({
            index: 2
          })
        }
        else if (temp.state == 1 && temp.status == 3) {
          this.setData({
            index: 5
          })
        } else if (temp.state == 1 && temp.status == 4) {
          this.setData({
            index: 4
          })
          console.log("index:", this.data.index)
        }
        
  

        // wx.navigateTo({
        //   url: "/pages/tickets/tickets?final_price=" + temp.endprice + '&' +
        //     'start_price=' + temp.production__startprice + '&' +
        //     'payfor_string=' + temp.certificate + '&' +
        //     'yuyue_string=' + '' + '&' +
        //     'yuyue_telephone=' + '' + '&'

        //     + 'index=2'
        // })

      }
    }else{
      wx.showModal({
        title: '查看',
        content: '您已经取消了该订单',
        confirm:"了解"
      })
    }
   




  },


  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      overList: !this.data.overList
    });
    console.log("now:tab", this.data.currentTab)
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


  team_cut: function (e) {
    var order = this.data.ticketlist_ing[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: '/pages/teamcut/teamcut?productionid=' + order.production_id +
        '&' + 'nickname=' + app.globalData.nickname +
        '&' + 'avatarUrl=' + app.globalData.avatarUrl +
        '&' + 'steamid=' + order.steam_id +
        '&' + 'userid=' + order.userid,
    })
  },

  add_allTobuylist: function (e) {
    console.log(e)
    var temp = this.data.ticketlist_ing

    for (var i = 0; i < temp.length; i++) {
      temp[i].added = true
    }
    this.setData({
      ticketlist_ing: temp
    })
  },


  deleteorder: function (id) {
    var that = this;
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/cancel',
      data: {
        'orderid': id,
      },
      success: (res) => {
        //购物车删除该数据
        for (var i = 0; i < that.data.ticketlist_ing.length;i++){
          if (that.data.ticketlist_ing[i].orderid == id){
            that.data.ticketlist_ing.splice(i)
          }
        }
        that.getTotalPrice() 
        wx.switchTab({
          url: '/pages/home/home',
        })
        app.getorderlist();
      }
    })



  },

  cancel_order: function (e) {
    var that = this;
     console.log(e.currentTarget.dataset.index.orderid)
     var id=e.currentTarget.dataset.index.orderid;
    wx.showModal({
      title: "提示",
      content: "确定取消该订单吗？",
      showCancel: true,
      cancelText: "不不不",
      cancelColor: "#000",
      confirmText: "确定！",
      confirmColor: "#000",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          that.deleteorder(id);


        }
      }
    })
  },



  delete_order_from_DATABASE:function(e){
    // console.log(e.currentTarget.dataset.index)
    var that =this

    wx.showModal({
      title: "提示",
      content: "从记录中删除该订单吗？（不可以回复哦~）",
      showCancel: true,
      cancelText: "不不不",
      cancelColor: "#000",
      confirmText: "确定！",
      confirmColor: "#000",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: 'https://xiaoyibang.top:8001/dajia/deleteorder',
            data: {
              'orderid': that.data.ticketlist_ed[e.currentTarget.dataset.index].orderid,
            },
            success: (res) => {
              
              wx.switchTab({
                url: '/pages/home/home',
              })
              app.getorderlist();
            }
          })


        }
      }
    })

    
  },

  payfor:function(e){
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/pay',
      data:{
        'userid':app.globalData.userid,
        'bee':1,
      },
      success:res=>{
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
    
  }


})