//app.js
var common=require('/common/index.js');
App({
  list:1,
  onLaunch: function () {
    var that=this;
    //获取屏幕高度
    wx.getSystemInfo({
      success(res) {
        that.globalData.height=res.windowHeight;
      }
    })


    this.gethomelist();
    this.getuserinformation();
    this.getorderlist();
    // 登录
  
  },




  gethomelist:function(){
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/home',
      data:{
        'teamid':1,
      },
      success:(res)=>{
        common.homelist=res.data;
        var list = [];
        for (var i = 0; i < common.homelist.length; i++) {
          if (common.homelist[i].type == 1) {
            list.push(common.homelist[i]);
          }

        }
        common.showData=list;
      }
    })

  },
  getorderlist:function(){
    var that=this;
    if(this.globalData.userid){
      wx.request({
        url: 'https://xiaoyibang.top:8001/dajia/orderlist',
        data: {
          'userid': that.globalData.userid,
        },
        success: (res) => {
          if (res.data.success) {
            common.orderlist = res.data.order;

          }
          console.log("用户的订单:", common.orderlist)
          that.orderClassify()
        }
      })


    }
    


  },



  orderClassify: function (){
    var ticketData=common.orderlist
    for (var i = 0; i <ticketData.length; i++) {
      if (ticketData[i].status == 1 || ticketData[i].status == 2) {
        //  订单正在进行的话
        //（1"预付完成"),
        // (2"拼团完成"),
        this.globalData.ticketlist_ing.push(ticketData[i])

      }
      else {
        // (0, "订单取消"),
        // (3, "支付完成"),
        // (4, "订单完成"),
        // (5, "评价完成"),
        this.globalData.ticketlist_ed.push(ticketData[i])
      }
    }
    // console.log("重新分组的船票ticketData--")
    // console.log("ing:", this.globalData.ticketlist_ing)
    // console.log("ed:", this.globalData.ticketlist_ed)
    for (var i = 0; i < this.globalData.ticketlist_ing.length; i++) {
      this.globalData.ticketlist_ing[i].added = false
    }
    
  },
  



  //从缓存中提取用户信息
  getuserinformation: function () {
    var information = wx.getStorageSync('information')

    if (information) {
      this.globalData.login=true;
    //   this.setData({
    //     hq: false,
    //   })
    // } else {
    //   wx.hideTabBar({})
    }
    else
    {
      this.globalData.login=false;
    }
    if (information.status == 2) {

      this.globalData.nickname=information.nickname;
      this.globalData.avatarUrl = information.avatarUrl;


      this.globalData.status = information.status;
      this.globalData.userid = information.userid;
      this.globalData.name = information.name;
      
      this.globalData.time = information.number;
      this.globalData.teamname = information.teamname;
      this.globalData.account = information.account;

    }
    else{
      this.globalData.status = information.status;
      this.globalData.userid = information.userid;
      this.globalData.avatarUrl = information.avatarUrl;
      this.globalData.nickname = information.nickname;
     

    }
  },


  globalData: {
    puserid:'',//邀请人
    login:'',//是否登陆
    userid:'',
    nickname: '',
    avatarUrl: '',//基本信息
    gender: 0,

    account:'',
    name: '',
    teamname: '',
    time: '',//认证信息
    status:'',
    
    height:'',//屏幕高度
    
    country:'',
    city:'',
    province:'',
    language: "zh_CN",//无关信息


    ticketlist_ing:[],
    ticketlist_ed:[],
  }
})