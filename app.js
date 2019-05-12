//app.js
var common=require('/common/index.js');
App({
  list:1,
  onLaunch: function () {
    var that=this;
    //��ȡ��Ļ�߶�
    wx.getSystemInfo({
      success(res) {
        that.globalData.height=res.windowHeight;
      }
    })
    wx.clearStorageSync();
    this.gethomelist();
    this.getuserinformation();
    this.getorderlist();
    // ��¼
  },




  gethomelist:function(){
    wx.request({
      url: 'https://xiaoyibang.top:8001/dajia/home',
      data:{
        'teamid':1,
      },
      success:(res)=>{
        console.log(common.homelist)
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
          else{
            common.orderlist=[];
          }
          console.log("订单", common.orderlist);
          
        }
      })


    }
    


  },



  
  



  //�ӻ�������ȡ�û���Ϣ
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
    pageid:'',







    puserid:'',
    login:'',
    userid:'',
    nickname: '',
    avatarUrl: '',
    gender: 0,
    

    account:'',
    name: '',
    teamname: '',
    time: '',
    status:'',
    time:'',
    
    height:'',
    
    country:'',
    city:'',
    province:'',
    language: "zh_CN",


    ticketlist_ing:[],
    ticketlist_ed:[],
  }
})
