// tickets/tickets.js

var app=getApp();
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
    index:1,
    final_price:0,
    start_price: 0,
    return_price: 0,
    yuyue_string: 0,
    yuyue_telephone: 0,
    payfor_string: 0,
    nickname:'',
    avatarUrl:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options) {

      console.log(options)
      this.setData({
        index:options.index,
        final_price: options.final_price,
        start_price: options.start_price,
        yuyue_string: options.yuyue_string,
        yuyue_telephone: options.yuyue_telephone,
        payfor_string: options.payfor_string,
        nickname: app.globalData.nickname,
        avatarUrl: app.globalData.avatarUrl,
      })
      console.log(this.data.avatarUrl)
    }

  }
})
