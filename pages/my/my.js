// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: ['/images/discount-banner.jpg', '/images/draw-banner.jpg', '/images/nursing-banner.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    list:[],
    page:2,
    pagesize:10,
  },
  onReachBottom:function(){
    console.log(111);
    this.data.page++;
    this.onLoad();
  },
  //商品详情
  goodsDetail:function(e)
  {
    //获取被点击的 商品id
    let goodsid = e.currentTarget.dataset.goodsid;
    //切换至 详情页
    wx.redirectTo({
      url: '/pages/detail/detail?goods_id='+goodsid
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getGoodsList();
  },
  getGoodsList: function(){
    let _this = this;
    //获取首页商品列表
    wx.request({
      url: 'http://shop.2004.com/api/goods',
      data:{
        page:_this.data.page,
        size:_this.data.pagesize
      },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        let new_list = _this.data.list.concat(res.data)
        _this.setData({
          list: new_list
        })
      }
    })
  }
})
