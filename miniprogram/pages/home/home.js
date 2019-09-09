const db=wx.cloud.database();
Page({ 
  /* 页面的初始数据*/
  data: {
    list:[],
    imgUrls: [
      {
        url: '/images/01.jpg'
      }, {
        url: '/images/02.jpg'
      }, {
        url: '/images/03.jpg'
      }
    ],
    //indicatorDots: true,  //小点
    //autoplay: true,  //是否自动轮播
    interval: 4000,  //间隔时间
    duration: 800,  //滑动时间
  },
  // showPic:function(){
  //   db.collection("myphotos")
  //   .get()
  //   .then(res=>{
  //      var list=res.data;
  //      this.setDate({
  //        list:list
  //      }) 
  //   })
  //   .catch(err=>{})
  // },
  // myUpload:function(){
  //   // 上传成功,将图片保存在myphotos中
  //   wx.chooseImage({
  //     count:1,
  //     sizeType:["original","compressed"],
  //     sourceType:["album","camera"],
  //     success:function(res){
  //       var file=res.tempFilePaths[0];
  //       var newFile=new Date().getTime()+".jpg"
  //       wx.cloud.uploadFile({
  //         cloudPath:newFile,
  //         filePath:file,
  //         success:(res)=>{
  //           //将上传成功的图片保存在myphotos中
  //           var fId=res.fileID;
  //           db.collection("myphotos")
  //           .add({data:{fileID:fId}})
  //           .then(res=>{console.log(res)})
  //           .catch(err=>{console.log(err)})
  //         },
  //         fail:(err)=>{
  //           console.log(err)
  //         }
  //       })
  //     },
  //     fail:function(){
  //       console.log(err);
  //     }
  //   })
  // },
  jumpMovie:function(e){
    //点击按钮跳到详情页面
    //保留并跳转
    var id=e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/comment/comment?id='+id,
    })

  },
  loadMore:function(){
    //console.log(123)
    // 1.调用云函数movielist3;
    wx.cloud.callFunction({    //调用云函数
      name:"movielist3",       //函数名
    // 2.将返回的结果保存 
      data:{
        start:this.data.list.length,
        count:10}  //参数
    }).then(res=>{             //调用成功 
      var obj=JSON.parse(res.result)
      var rows=obj.subjects;
      rows=this.data.list.concat(rows);
      this.setData({
        list:rows
      })
      console.log(obj.subjects)
    }).catch(err=>{          //调用失败 
      console.log(err)
    })
  },
   
  /*生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.loadMore();
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
    //发送请求,下载下一页数据
    console.log(123)
     this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})