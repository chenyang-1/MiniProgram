// pages/my/my.js
const app=getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true
  },
  bindGetUserInfo:function(e){
    if(e.detail.UserInfo){
      var that=this;
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    }else{
      wx.showModal({
        title:"警告",
        content:"您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
        showCancel: false,
        confirmText: '返回授权',
        success:function(res){
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      }) 
    }
  },
  jumpyhq:function(e){
    wx.navigateTo({
      url:'/pages/yhq/yhq'
    })  
  },
  jumpyd:function(e){
    wx.navigateTo({
      url: '/pages/yd/yd',
    })
  },
  jumpMovie:function(e){
    //点击按钮跳到详情页面
    //保留并跳转
    wx.navigateTo({
      url: '/pages/dingdan/dingdan'
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    //查看是否授权
    wx.getSetting({
      success:function(res){
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:function(res){ 
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success:res=>{
                  //获取用户的code之后，res.code
                  console.log("用户的code："+res.code);
                  //可以传给后台，在经过解析获取用户的openid
                  //或者可以直接使用微信提供的接口直接获取openid：方法如下
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid="wxb7c802000bc8dedf"&secret="7bd78111f1a8b5da00333dee58f2b834"&js_code=' + res.code +'&grant_type=authorization_code',
                    header: {
                      'content-type': 'application/json'
                    },
                    success:res=>{
                      console.log("用户的openid:" + res.data.openid)
                    }
                  })
                }
              })
            }
          })
        }else{
          //用户没有授权
          //改变ishide的值，显示授权
          that.setData({
            isHide:true
          });
        }
      }
    }); 
  },
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})