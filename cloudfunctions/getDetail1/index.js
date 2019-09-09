// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
var rp = require("request-promise");
//2.创建main函数(异步)
exports.main = async (event, context) => {
  //3.创建变量url请求地址
  var url = `http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  // 返回带着电影详情内容
  return rp(url).then(res=>{
    return res;
  }).catch(err=>{
    return err;
  })
}
// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }