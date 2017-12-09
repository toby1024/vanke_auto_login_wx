// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: 0
  },

  formSubmit:function(e){
    const CREATE_USER = "http://127.0.0.1:3000/weixin"
    let phone = e.detail.value.phone
    let password = e.detail.value.password
    if (phone.length != 11) {
      wx.showToast({
        title: '请输入11位手机号码!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if(password.length == 0){
      wx.showToast({
        title: '请输入登录密码!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: CREATE_USER,
        data: { phone: phone, password: password, openid: this.data.openid },
        method: "POST",
        success: function(res){
          if(res.data.code == 500){
            wx.showToast({
              title: '登录失败，请稍后重试!',
              icon: 'loading',
              duration: 1500
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          } else {
            wx.setStorage({
              key: 'pointList',
              data: res.data.points,
            })
            wx.navigateTo({
              url: '/pages/points/index'
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({ openid: res.data })
      }
    })
  },

})