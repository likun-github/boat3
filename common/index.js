var data = {
 
  steamid: '',
  topheight: 50,
}

//首页商品信息
var homelist = {

}
function gethomelist() {

}
//首页订单信息
var orderlist = {
}
//订单细节
var orderdetail = {

}
//正在浏览商品
var currentData = {

}

//当前用户查看的评论
var currentEvaluation = {

}
//首页tab组件选择
function changelist(provider) {
  data.index = provider;
}
var currentorder = {

}
var onecut = {

}
var showData={

}
module.exports = {
  data: data,
  homelist: homelist,//首页商品信息
  showData:showData,//首页正在展示商品类别
  currentData: currentData,//目前选择的商品
  orderlist: orderlist,//订单信息
  currentorder: currentorder,//当前查看订单
  orderdetail: orderdetail,//订单细节
  onecut: onecut,//成员砍价
}