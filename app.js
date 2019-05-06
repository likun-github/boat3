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
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/orderlist',
      data: {
        'userid': that.globalData.userid,
      },
      success: (res) => {
        common.orderlist = res.data;
        console.log(common.orderlist)

      }
    })


  },


  //从缓存中提取用户信息
  getuserinformation: function () {
    var information = wx.getStorageSync('information')
    if (information.status == 2) {
      this.globalData.status = information.status;
      this.globalData.userid = information.userid;
      this.globalData.name = information.name;
      this.globalData.avatarUrl = information.avatarUrl;
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
    userid:'',
    nickname: '',
    avatarUrl: '',//基本信息
    gender: 0,


    name: '',
    teamname: '',
    time: '',//认证信息
    
    height:'',//屏幕高度
    
    country:'',
    city:'',
    province:'',
    language: "zh_CN",//无关信息
  }
})