// mx/mx.js
var app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    detail:[],//time year month date status  worth
    et: [
      {
        date: '-2019-4-17-',
        object: '完成认证',
        number: '50'
      },
      {
        date: '-2019-4-18-',
        object: '签到',
        number: '10'
      }, {
        date: '-2019-4-18-',
        object: '签到',
        number: '10'
      }, {
        date: '-2019-4-18-',
        object: '签到',
        number: '10'
      },
      {
        date: '-2019-4-18-',
        object: '签到',
        number: '10'
      },
      {
        date: '-2019-4-18-',
        object: '签到',
        number: '10'
      },
      {
        date: '-2019-4-18-',
        object: '签到',
        number: '10'
      },
      {
        date: '-2019-4-17-',
        object: '完成认证',
        number: '50'
      },
      {
        date: '-2019-4-17-',
        object: '完成认证',
        number: '50'
      },
      {
        date: '-2019-4-17-',
        object: '完成认证',
        number: '50'
      },
      {
        date: '-2019-4-17-',
        object: '完成认证',
        number: '50'
      },
      {
        date: '-2019-4-17-',
        object: '完成认证',
        number: '50'
      },
    ],
    h: '',//高度
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
    this.setData({
      h: app.globalData.height
    });
   
    this.getdetail();
  },
  gettime:function(status,time){//根据status返回年月日
        var time = new Date(time * 1000);
        switch(status){
          case 1:
            var year = time.getFullYear();
            return year;
            break;
          case 2:
            var month = time.getMonth();
            return month;
            break;
          case 3:
            var date = time.getDate();
            return date;
            break;
        }
    
        



  },
  getdetail: function () {
    var that=this;
    wx.login({
      success: res => {
        wx.request({
          url: 'https://xiaoyibang.top:8001/dajia/accountdetail',
          data: {
            'userid': app.globalData.userid,
          },
          success: (res) => {
            console.log(res.data)

            var gorder=res.data.gorder;
            var end = [];
            for(var i=0;i<gorder.length;i++){
              if(gorder[i].id==4){
                gorder[i].number=100;
              }
              else if (gorder[i].id == 7){
                gorder[i].number = 5;
              }
              else{
                gorder[i].number = 0;
              }
              gorder[i].status=1;//奖品
              var neworder1={};
              neworder1.time=gorder[i].time;
              neworder1.status = 2;//抽奖消耗
              neworder1.number=-30;
              end.push(gorder[i])
              end.push(neworder1) 
            }
            var invitation=res.data.invitation;
            for(var i=0;i<invitation.length;i++){
              invitation[i].status=3;//邀请实名认证
              invitation[i].number=30;
              end.push(invitation[i])

            }
            console.log(end)

            

            
            //从大到小排序
            var orderlist = end.sort(function (a, b) {
              return a.time < b.time ? 1 : -1;
            })
            console.log(orderlist)
            

            for(var i=0;i<orderlist.length;i++){
              orderlist[i].year=that.gettime(1,orderlist[i].time)
              orderlist[i].month = that.gettime(2, orderlist[i].time)
              orderlist[i].date = that.gettime(3, orderlist[i].time)
            }
            this.setData({
              detail:orderlist,
            })
            
          },
        })
      }
    })

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
  onShareAppMessage: function () {

  }
})