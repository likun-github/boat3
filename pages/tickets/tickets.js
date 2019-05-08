// tickets/tickets.js
var QR = require("../../utils/qrcode.js");
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 1,
    final_price: 0,
    start_price: 0,
    return_price: 0,
    yuyue_string: 0,
    yuyue_telephone: 0,
    payfor_string: 0,
    nickname: '',
    avatarUrl: '',

    canvasHidden: false,
    maskHidden: true,
    imagePath: '',

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options) {
      var that = this;

      var scene = decodeURIComponent(options.scene)

      console.log(options)
      this.setData({
        index: options.index,
        final_price: options.final_price,
        start_price: options.start_price,
        yuyue_string: options.yuyue_string,
        yuyue_telephone: options.yuyue_telephone,
        payfor_string: options.payfor_string,
        nickname: app.globalData.nickname,
        avatarUrl: app.globalData.avatarUrl,
      })

      // 页面初始化 options为页面跳转所带来的参数
      var size = this.setCanvasSize();//动态设置画布大小
      var initUrl ;
      initUrl = '最终价：'+options.final_price +'￥  凭证:'+ options.payfor_string
      this.createQrCode(initUrl, "mycanvas", size.w, size.h);

      
    },

    //适配不同屏幕大小的canvas
    setCanvasSize: function () {
      var size = {};
      try {
        var res = wx.getSystemInfoSync();
        var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth / scale;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败" + e);
      }
      return size;
    },
    createQrCode: function (url, canvasId, cavW, cavH) {
      //调用插件中的draw方法，绘制二维码图片
      QR.api.draw(url, canvasId, cavW, cavH);
      setTimeout(() => { this.canvasToTempImage(); }, 1000);

    },

    //获取临时缓存照片路径，存入data中
    canvasToTempImage: function () {
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imagePath: tempFilePath,
            // canvasHidden:true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    },

    //点击图片进行预览，长按保存分享图片
    previewImg: function (e) {
      var img = this.data.imagePath;
      console.log(img);
      wx.previewImage({
        current: img, // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      })
    },

    formSubmit: function (e) {
      var that = this;
      var url = e.detail.value.url;
      that.setData({
        maskHidden: false,
      });
      wx.showToast({
        title: '生成中...',
        icon: 'loading',
        duration: 2000
      });
      var st = setTimeout(function () {
        wx.hideToast()
        var size = that.setCanvasSize();
        //绘制二维码
        that.createQrCode(url, "mycanvas", size.w, size.h);
        that.setData({
          maskHidden: true
        });
        clearTimeout(st);
      }, 2000)

    },



  }
})