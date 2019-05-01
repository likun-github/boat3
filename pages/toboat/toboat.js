Page({

  /**

   * 页面的初始数据

   * Linyufan.com

   */

  data: {
    chooseBoat: false,//我要上船点击
    chooseStatus: 0,//默认大船
    animationData: {},//动画实例
    datalist: {},
    picture_production: [
      'https://xiaoyibang.top:8002/uploads/photo/4_2WZVla0.jpg',
      'https://xiaoyibang.top:8002/uploads/photo/9_9eMbYEf.jpg',
      'https://xiaoyibang.top:8002/uploads/photo/6_57uxCYM.jpg'
    ]



  },



  /**

   * 生命周期函数--监听页面加载

   */

  onLoad: function (options) {

  },

  onShow: function () {

  },
  choose: function (e) {
    this.setData({
      chooseStatus: e.currentTarget.dataset.index,
    })

  },
  showModal: function () {
    console.log("真正")
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      chooseBoat: true
    })
    // setTimeout(function () {
    //   animation.translateY(0).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 200)

    animation.translateY(0).step()
    this.setData({
      animationData: animation.export()
    })

  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        chooseBoat: false
      })
    }.bind(this), 200)
  }






})