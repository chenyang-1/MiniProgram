// 云函数movielist3
//此函数功能向豆瓣发送请求,获取最热门电影列表
//1.引入第三方ajax库,request-promise
var rp = require("request-promise");
//2.创建main函数(异步)
exports.main=async (event,context)=>{
//3.创建变量url请求地址
var url =`http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${event.start}&count=${event.count}`;
//4.请求rp函数发送请求并且将豆瓣返回
  return rp(url)
    .then(res=>{  //发送请求
      return res;//返回请求结果
  }).catch(err=>{
      console.log(err)//出错原因
  })
}

/*// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}*/