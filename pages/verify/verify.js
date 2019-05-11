// pages/verify/verify.js
var zhenzisms = require('../../utils/zhenzisms.js');
//获取应用实例
const app = getApp();
var arrayHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    puserid:'',//邀请人userid
    popup: true,
    selectPerson: true,
    firstPerson: '武汉大学',
    selectArea: false,
    teamid: 1,
    name: '',
    yuanxi: '',
    number: '',
    phone: '',
    code: '',
    second: 60,
    codee: '',
    expire: 300, //有效时间
    time: 0,
    setInter: '',
    text: '恭喜您 \n 提交成功',
    isShow: false,
    t1: 'white',
    t2: 'white',
    t3: 'white',
    t4: 'white',
    school: '武汉大学',
    inputValue1: '武汉大学',
    inputValue2: '',

    adapterSource: ['哲学学院国学院', '文学院', '外国语言文学学院', '新闻与传播学院 ', '艺术学院', '历史学院', '经济与管理学院法学院', '马克思主义学院社会学系', '政治与公共管理学院', '教育科学研究院', '信息管理学院',
      '数学与统计学院', '物理科学与技术学院', '化学与分子科学学院', '生命科学学院', '资源与环境科学学院', '高等研究院',
      '动力与机械学院', '电气与自动化学院', '城市设计学院', '土木建筑工程学院', '水利水电学院', '工业科学研究院',
      '电子信息学院', '计算机学院', '测绘学院', '遥感信息工程学院', ' 印刷与包装系', '网络安全学院',
      '医学部机关', '医学研究院', '基础医学院', '健康学院', '药学院', '第一临床学院', '第二临床学院', '口腔医学院', '医学职业技术学院',
      '弘毅学堂'
    ],
    bindSource: [],
    hideScroll: true,

  },
  name: function (e) {
    let reg = /^[\u4e00-\u9fa5]+|[a-zA-Z]+$/;
    var x = e.detail.value;
    if (!reg.test(x)) {
      this.setData({
        t1: 'red'
      })
    } else this.setData({

      name: x,
      t1: 'white'
    })

  },
  school: function (e) {
    var x = e.detail.value;
    if (x == 'WHU')
      this.setData({
        school: '武汉大学',
        inputValue1: '武汉大学'
      })
  },
  number: function (e) {
    var x = e.detail.value;
    let str = /\d{13}$/;
    if (!str.test(x)) {
      this.setData({
        t4: 'red'
      })
    } else {
      this.setData({
        number: x,
        t4: 'white'
      })
    }
  },
  yuanxi: function (e) {
    var newSource = []
    let reg = /^[\u4e00-\u9fa5]+$/;
    var x = e.detail.value;
    if (!reg.test(x)) {
      this.setData({
        t3: 'red'
      })
    } else {
      this.setData({
        yuanxi: x,
        t3: 'white'
      });
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(x) != -1) {

          newSource.push(e)
        }
      })
    };
    if (newSource.length != 0) {
      this.setData({
        hideScroll: false,
        bindSource: newSource,
        arrayHeight: newSource.length * 71
      })
    } else {
      this.setData({
        hideScroll: true,
        bindSource: []
      })
    }


  },
  itemtap: function (e) {
    this.setData({
      inputValue2: e.target.id,
      yuanxi: e.target.id,
      hideScroll: true,
      bindSource: []
    });
    this.setData({
      t3: 'white'
    })
  },

  
  //保存
  save(e) {
    var that = this;
    console.log('姓名: ' + this.data.name);
    console.log('学校: ' + this.data.school);
    console.log('院系: ' + this.data.yuanxi);
    console.log('学号: ' + this.data.number);
    var m = this.data.yuanxi;
    console.log(m);
    if (this.data.adapterSource.indexOf(m) == -1) {
      this.setData({
        t3: 'red'
      })
    } else this.setData({
      t3: 'white'
    })
    if (this.data.name == '') {
      this.setData({
        t1: 'red'
      })
    }
    if (this.data.number == '') {
      this.setData({
        t4: 'red'
      })
    }

    if (this.data.t1 == 'red' || this.data.t2 == 'red' || this.data.t3 == 'red' || this.data.t4 == 'red') {
      wx.showToast({
        title: '信息未填',
        icon: 'none',
      });
      this.setData({
        could: false
      })
    } else this.setData({
      could: true
    })
    if ( this.data.could) {
      wx.request({
        url: 'https://xiaoyibang.top:8001/dajia/verify',
        data: {
          'name':that.data.name,
          'puserid':app.globalData.puserid,
          'userid': app.globalData.userid,
          'teamid': that.data.teamid,
          'number': that.data.number, 
          'department':that.data.yuanxi,      
        },
        success: (res) => {

          var information = {
            'userid': app.globalData.userid,
            'teamname': app.globalData.teamname,
            'name': that.data.name,
            'number': that.data.number.substring(0, 4),
            'status': 2,
            'nickname': app.globalData.nickname,
            'avatarUrl': app.globalData.avatarUrl,
            'account':res.data.account,
          }
          wx.setStorage({
            key: 'information',
            data: information,
          })
          app.globalData.time = that.data.number.substring(0, 4);
          app.globalData.status=2;
          app.globalData.account=res.data.account;
          console.log("状态码")
          console.log(app.globalData.status)
          
          this.hidePopup(false);
        }

      })

      
    }
  },

  hidePopup(flag ) {
    this.setData({
      "popup": flag
    });
  },


  backtopages: function (options) {
    wx.navigateBack({
      delta:1,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
  onGotUserInfo(e) {
    console.log("正在运行login")
    app.globalData.nickname = e.detail.userInfo.nickName
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
    app.globalData.gender = e.detail.userInfo.gender
    this.backlogin();


  },

  //后台登陆
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  cg: function () {
    wx.navigateTo({
      url: '../home/home',
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})