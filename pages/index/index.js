//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    name:'zhangsan',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  btnLogin:function(e){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://shop.2004.com/api/onLogin',
            data: {
              code: res.code
            },
            success:function(d)
            {
              console.log(d.data.data)
              //获取登录token
              wx.setStorage({
                key:"token",
                data:d.data.data
              })

              let token=wx.getStorage({
                key: 'token',
                success(res){
                  console.log(res.data)
                }
              })

            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //获取storage
  loginInfo:function(e)
  {
    let s = wx.setStorage({
      key: 'token',
      success(res){
        console.log(wx.getStorageSync('token'))  
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(this)
    let _this=this;
    //发起网络请求
    wx.request({
      url: 'http://shop.2004.com/api/test',
      data:{
        x: 'xxxx',
        y: 'yyyy'
      },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        console.log(this)
        _this.setData({
          goods_name:res.data.goods_name,
          price:res.data.price
        });
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})