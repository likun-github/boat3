// tickets/tickets.js
var QR = require("../../utils/qrcode.js");
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pname:String,//产品名称
    eprice:Number,//结束价格
    sprice: Number,//开始价格
    certify: String,//预约码
    telephone: String,//联系电话
    index: Number,//状态
    p_id: String,//产品ID
    u_id:String,//用户ID
    o_id:String,  
    s_id:String,//steamID
    serviver_wx_pic:String, //商家的客服微信二维码
  
  },


  /**
   * 组件的初始数据
   */
  data: {
    index: 1,
    // final_price: 0,
    // start_price: 0,
    // return_price: 0,

    yuyue_telephone: 0,

    nickname: '',
    avatarUrl: '',
    production__name:'',
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    stickets:false,
    p_id:'',
    u_id:'',
    s_id:'',
    o_id:'',
    serviver_wx_pic:'',

    showview_flag:1,
  },
  ready:function () {
    this.setData({
      index: this.properties.index,
      production__name: this.properties.pname,
      final_price: this.properties.eprice,
      start_price: this.properties.sprice,
      certify: this.properties.certify,
      telephone:this.properties.telephone,

      serviver_wx_pic: this.properties.serviver_wx_pic,
      p_id: this.properties.p_id,
      u_id: this.properties.u_id,
      s_id: this.properties.s_id,
      o_id: this.properties.o_id,
      nickname: app.globalData.nickname,
      avatarUrl: app.globalData.avatarUrl,
    })
    
    // var size = this.setCanvasSize();//动态设置画布大小
    // var initUrl;
    // initUrl = '最终价：' + this.data.final_price + '￥  凭证:' + this.data.payfor_string
    // this.createQrCode(initUrl, "mycanvas", size.w, size.h);

    console.log(this.properties.serviver_wx_pic)
   
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    final:function(){
      var that =this
      wx.showModal({
        title: '请确认完成订单',
        content: '确认后无法再次邀请好友砍价或参团',
        success: function (res) {
          if (res.confirm) {
            console.log('orderid:',that.properties.o_id)
            wx.request({
              url: 'https://xiaoyibang.top:8001/dajia/completeorder',
              data: {
                'orderid': that.properties.o_id,
              },
              success: (res) => {
                console.log("确认完成拼团  --这个过程")
              }
            })

            //这里是点击了确定以后
            console.log('用户点击确定');
            wx.switchTab({
              url: '/pages/home/home',
            })
            app.getorderlist();
            wx.showTabBar({
            })

            var myEventDetail = {
              msg: 0,
            } 
            var myEventOption = {} 
            that.triggerEvent('myevent', myEventDetail, myEventOption)
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    },


    cut:function(){
      wx.navigateTo({
        url: '/pages/teamcut/teamcut?productionid=' + this.data.p_id +
          '&' + 'nickname=' + app.globalData.nickname +
          '&' + 'avatarUrl=' + app.globalData.avatarUrl +
          '&' + 'steamid=' + this.data.s_id+
          '&' + 'userid=' + this.data.u_id,
      })
    },

    
    // //适配不同屏幕大小的canvas
    // setCanvasSize: function () {
    //   var size = {};
    //   try {
    //     var res = wx.getSystemInfoSync();
    //     var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
    //     var width = res.windowWidth / scale;
    //     var height = width;//canvas画布为正方形
    //     size.w = width;
    //     size.h = height;
    //   } catch (e) {
    //     // Do something when catch error
    //     console.log("获取设备信息失败" + e);
    //   }
    //   return size;
    // },
    // createQrCode: function (url, canvasId, cavW, cavH) {
    //   //调用插件中的draw方法，绘制二维码图片
    //   QR.api.draw(url, canvasId, cavW, cavH);
    //   setTimeout(() => { this.canvasToTempImage(); }, 1000);
    // },

    // //获取临时缓存照片路径，存入data中
    // canvasToTempImage: function () {
    //   var that = this;
    //   wx.canvasToTempFilePath({
    //     canvasId: 'mycanvas',
    //     success: function (res) {
    //       var tempFilePath = res.tempFilePath;
    //       console.log(tempFilePath);
    //       this.setData({
    //         imagePath: tempFilePath,
    //         // canvasHidden:true
    //       });
    //     },
    //     fail: function (res) {
    //       console.log(res);
    //     }
    //   });
    // },

    //点击图片进行预览，长按保存分享图片
    // previewImg: function (e) {
    //   var img = this.properties.serviver_wx_pic;
    //   // console.log(img);
    //   wx.previewImage({
    //     current: img, // 当前显示图片的http链接
    //     urls: [img] // 需要预览的图片http链接列表
    //   })
    // },

    // formSubmit: function (e) {
    //   var that = this;
    //   var url = e.detail.value.url;
    //   that.setData({
    //     maskHidden: false,
    //   });
    //   wx.showToast({
    //     title: '生成中...',
    //     icon: 'loading',
    //     duration: 2000
    //   });
    //   var st = setTimeout(function () {
    //     wx.hideToast()
    //     var size = that.setCanvasSize();
    //     //绘制二维码
    //     that.createQrCode(url, "mycanvas", size.w, size.h);
    //     that.setData({
    //       maskHidden: true
    //     });
    //     clearTimeout(st);
    //   }, 2000)

    // },



  }
})