const db=wx.cloud.database();
Page({
  data: {
    value:"",   //输入框中输入的内容
    score:2,
    movieid:0,  
    detail:{},
    images:[],  //保存选中图片
    fileIDS:[]  //上传成功,保存id的
  },
  //功能两个
    //功能1.将选中图片上传至云存储中

  mysubmit:function(){
    //1.在data添加属性fileIDS
    //2.显示加载动画提示框""正在提交中"
    wx.showLoading({
      title:"正在提交中...",
    })
    //3.上传至云存储
      //3.1创建promise数组[保存promise对象]
      var promiseArr=[];
      //3.2创建一个循环遍历图片
      for(var i=0;i<this.data.images.length;i++){
      //3.3创建promise对象
      promiseArr.push(new Promise((resolve,reject)=>{
        //3.3.1获取当前图片
        var item=this.data.images[i];
        //3.3.2创建正则表达式拆分文件后缀名  .jpg  .gif  .png
        var suffix=/\.\w+$/.exec(item)[0];
        //3.3.3上传图片并且将fileID保存数组  
        //新文件名=时间+随机数+后缀
        var newFile = new Date().getTime() + Math.floor(Math.random()*9999)+suffix;
        wx.cloud.uploadFile({
          cloudPath:newFile,
          filePath:item,
          success:res=>{
            var fid=res.fileID;
            var ids=this.data.fileIDS.concat(fid);
            this.setData({
              fileIDS:ids
            })
            resolve();
          },
          fail:err=>{
            console.log(err)
          }
        })
      }))    
    }
  //功能2.将云存储中的fileID一次性存储云数据集中
    Promise.all(promiseArr).then(res=>{
      db.collection("comment")
      .add({
        data:{
          content:this.data.value,
          score:this.data.score,
          movieid:this.data.movieid,
          fileIds: this.data.fileIDS
        }
      })
      .then(res=>{
        wx.hideLoading();
        wx.showToast({title:"发表成功"})
      })
      .catch(err=>{
        wx.hideLoading();
        wx.showToast({ title: "发表失败" })
      })  
    })
  },  
  // 选择图片
  selectImage:function(){
    //功能: 请用户选中9张图片且保存data中
    //1.在data中添加数组属性images
    wx.chooseImage({
      count :9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:(res)=>{
        var files=res.tempFilePaths;
        this.setData({
          images:files
        })
      }
    })
  },
  loadMore(){
    var id=this.data.movieid;
    wx.showLoading({
      title: '加载中...',
    });
    wx.cloud.callFunction({
      name:"getDetail1",
      data:{id:id}
    }).then(res=>{
      //console.log(res)
      var obj=JSON.parse(res.result);
      //console.log(obj)
      this.setData({
        detail:obj
      })
      wx.hideLoading();
    }).catch(err=>{
      console.log(err)
    })
  },
  onScoreChange:function(e){
    //用户打分对应事件处理函数
    //1.获取用户现在输入的分数
    //console.log(e.detail);
    //2.将用户输入的新值赋值操作
    this.setData({
      score:e.detail
    })
  },
  onContentChange:function(e){
    //输入框对应事件
    //用户输入的内容
    //console.log(e.detail) 
    this.setData({
      value:e.detail
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieid:options.id
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})