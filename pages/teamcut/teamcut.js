// pages/teamcut/teamcut.js
var app = getApp();




let loadingMore = false
let lastScollTop = 0;
let lastRequestTime = 0;
var common=require('../../common/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hq: false,//是否登陆
    url: "https://xiaoyibang.top:8001/uploads/",
    end: false, //判定订单是否取消或者过期
    //云端获取
    production: {},
    onecut: [], //团队成员
    twocut: [], //他人砍价
    cutprice: 0,//砍价金额
    endprice: 0,//最终价格
    number: 0, //多少位朋友砍价
    res: [], //展示内容
    title: [
      '船长',
      '大副',
      '二副',
      '水手长',
      '轮机长',
    ],

    //数据缓存
    orderid: '',
    nickname: '',
    avatarUrl: '',
    steamid: '',
    openid: '',

    //状态0自我，状态1帮我砍，状态2帮好友分享
    btn_index: 1, //状态
    btn_text_left: ['分享好友砍价', '砍这好友一刀', '帮Ta召唤好友'],
    btn_text_right: ['查看拼团成员', '我要立即参团', '我要等价参团'],
    sentence: '', //展示句子
    //
    setInter: '', //定时器
    process: 40, //0到90
    day: '00',
    hour: '00',
    minute: '00',
    second: '00',
    //按钮类型
    list: [],
    hasMore: true, //列表是否有数据未加载
    page: 1,
    size: 8, //每页8条数据
    flag_hhh: '',
    realprice: 0,  //实时的价格
  },
  //下拉刷新
  lower: function () {
    // var result = this.data.res;
    // var resArr = jsonData.dataList;
    // for (let i = 0; i < 10; i++) {
    //   result.push(resArr[i]);
    // };

    // var cont = result.concat(resArr);
    // console.log(resArr.length);
    // if (cont.length >= 100) {
    //   wx.showToast({ //如果全部加载完成了也弹一个框
    //     title: '我也是有底线的',
    //     icon: 'success',
    //     duration: 300
    //   });
    //   return false;
    // } else {
    //   this.setData({
    //     res: result,
    //   })
    //   wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
    //     title: '加载中',
    //     icon: 'loading',
    //   });
    //   setTimeout(() => {
    //     this.setData({
    //       res: cont
    //     });
    //     wx.hideLoading();
    //   }, 1500)
    // }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  //打算传播steamid.,pic name就行
  onLoad: function (options) {
    console.log("用户id" + app.globalData.userid)
    console.log("购买详情：", options)
    this.setData({
      productionid: options.productionid,
      nickname: options.nickname,
      avatarUrl: options.avatarUrl,
      steamid: options.steamid,
      userid: options.userid,
    })
    // wx.showLoading({
    //   title: '正在加载中',
    //   duration:2000,
    // })
    var that=this;
    this.checkstatus();
    this.getproduction(this.data.productionid);
    setTimeout(function(){
      that.checkmember();
    },2000)
    

  },
  getproduction: function (productionid) {
    var that = this;
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/getperiod',
      data: {
        'productionid': productionid,
      },
      success: (res) => {
        res.data.production[0].logo = that.data.url + res.data.production[0].logo;

        that.setData({
          production: res.data.production[0],
        })
        console.log(that.data.production)
      }
    })
  },
  getorderdetail: function (steamid) {
    var that = this;
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/orderdetail',
      data: {
        'steamid': steamid,
      },
      success: (res) => {
        
        common.onecut = res.data.onecut;
        that.setData({
          onecut: res.data.onecut,
          twocut: res.data.twocut,
        })
        that.merge();
        that.timeapproach(res.data.onecut[0].endtime, res.data.onecut[0].time);
        
        

      }
    })
  },

  //判断是否登陆
  checkstatus: function () {
    if (app.globalData.login) {
      
      this.getorderdetail(this.data.steamid);
      
    }
    else {
      this.setData({
        hq: true,
      })
    }


  },
  
  //判定团队成员
  checkmember: function () {
    console.log('正在运行成员')
    console.log(this.data.onecut)
    console.log('哈哈')
    //是否为组团成员
    for(var i=0;i<this.data.onecut.length;i++){
      console.log(this.data.onecut[i].member__userid)
      if (app.globalData.userid == this.data.onecut[i].member__userid){
        
        this.setData({
          btn_index: 0,
        })
        return '';
      }
    
    }
    this.setData({
      btn_index: 1,
    });
    






  },
  onGotUserInfo(e) {
    var that=this;
    if (e.detail.errMsg) {
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl;
      app.globalData.nickname = e.detail.userInfo.nickName;
      //无关信息
      app.globalData.gender = e.detail.userInfo.gender;
      app.globalData.country = e.detail.userInfo.country;
      app.globalData.province = e.detail.userInfo.province;
      app.globalData.city = e.detail.userInfo.city;
      app.globalData.language = e.detail.userInfo.language;
      var that = this
      wx.login({
        success: res => {
          console.log("微信小程序用户登录：", res)
          wx.request({
            url: 'https://xiaoyibang.top:8001/dajia/login',
            data: {
              'nickname': app.globalData.nickname,
              'gender': app.globalData.gender,
              'code': res.code,
              'pic': app.globalData.avatarUrl,
              'userid': app.globalData.userid,
            },
            success: (res) => {
              console.log("用户信息", res.data)
              var information = {
                'userid': res.data.userid,
                'teamname': res.data.team_name,
                'name': res.data.name,
                'number': res.data.number,
                'status': res.data.status,
                'nickname': app.globalData.nickname,
                'avatarUrl': app.globalData.avatarUrl,
                'account': res.data.account,
              }
              that.getproduction(that.data.productionid);
              that.getorderdetail(that.data.steamid);
              wx.setStorage({
                key: 'information',
                data: information,
              })
            },
          })
        }
      })

      this.setData({
        hq: false,
      })
    } else {
      wx.showModal({
        title: '获取失败',
        content: '',
      })
    }
  },



 
  toDecimal2: function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;

  },
  //强制保留2位小数，如：2，会在2后面补上00.即2.00 
 

  //加titile
  merge: function () {
    var middle1 = [];
    var cutprice = 0;
    //组团成员
    for (var i = 0; i < this.data.onecut.length; i++) {
      var middle = {};
      middle.pic = this.data.onecut[i].member__picture;
      middle.name = this.data.onecut[i].member__nickname;
      middle.cutprice = this.data.onecut[i].membership__cutprice;
      cutprice = cutprice + middle.cutprice;
      middle.title = this.data.title[i];
      middle1.push(middle);
    }
    //砍价成员
    var middle2 = [];
    for (var i = this.data.twocut.length - 1; i >= 0; i--) {
      var middle = {};
      middle.pic = this.data.twocut[i].audience__picture;
      middle.name = this.data.twocut[i].audience__nickname;
      middle.cutprice = this.data.twocut[i].cutprice;
      cutprice = cutprice + middle.cutprice;
      middle2.push(middle);
    }
    var endprice=this.data.production.startprice-cutprice;


    this.setData({
      onecut: middle1,
      twocut: middle2,
      cutprice: cutprice,
      endprice: endprice,
      number: this.data.onecut.length + this.data.twocut.length,
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'BOAT',
      path: 'pages/teamcut/teamcut?orderid=' +
        this.data.orderid +
        '&' + 'nickname=' + this.data.nickname +
        '&' + 'avatarUrl=' + this.data.avatarUrl +
        '&' + 'steamid=' + this.data.steamid +
        '&' + 'productionid=' + this.data.productionid +
        '&' + 'userid=' + this.data.userid,

      success: (res) => {
        console.log("转发成功", res);

      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }

  },
  //右边按钮点击
  rightbindtap: function () {
    console.log(this.data.end)
    if (this.data.end) {
      wx.showToast({
        title: '订单已超时',
        icon: 'loading',
        duration: 2000,
      })
      return '';
    }
    var that = this;
    console.log(this.data.btn_index)
    if (this.data.btn_index == 0) {
      wx.navigateTo({
        url: "/pages/myteam/myteam",
      })
    }
    else {

      for (var i = 0; i < common.homelist.length; i++) {
        if (this.data.productionid == common.homelist[i].productionid) {
          common.currentData = common.homelist[i];
          break;
        }
      }
      if (this.data.onecut[0].steamnumber > 5) {
        wx.showModal({
          title: '拼团人数已满，是否单独发船',
          content: '',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/toboat/toboat",
              });
            } else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        });
        //common.data.steamid = this.data.steamid;


      }
      else {
        wx.navigateTo({
          url: "/pages/toboat/toboat?steamid=" + that.data.steamid,
        })


      }


    }


  },
  //帮这好友砍一刀
  cutprice: function (steamid) {

    var that = this;
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/cutprice',
      data: {
        'steamid': that.data.steamid,
        'userid': app.globalData.userid,
        'productionid': that.data.productionid,
      },
      success: (res) => {
        console.log("状态2")
        that.setData({
          btn_index: 2,
        })
        that.getorderdetail(that.data.steamid);

      }
    })

  },
  timeapproach: function (endtime,starttime) {
    var time1 = Math.floor(new Date().getTime() / 1000);
    var time2 = endtime - time1;
    this.data.setInter = setInterval(
      () => {
        var nowtime = Math.floor(new Date().getTime() / 1000);
        var time = endtime - nowtime;
        var day = Math.floor(time / (3600 * 24));
        var hour = Math.floor((time - day * 3600 * 24) / 3600);
        var minute = Math.floor((time - day * 3600 * 24 - hour * 3600) / 60);
        var second = time - day * 3600 * 24 - hour * 3600 - minute * 60;
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (minute < 10) {
          minute = '0' + minute;
        }
        if (second < 10) {
          second = '0' + second;
        }
        this.setData({
          day: day,
          hour: hour,
          minute: minute,
          second: second,
        })


      }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
  
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
    clearInterval(this.data.setInter)
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







})