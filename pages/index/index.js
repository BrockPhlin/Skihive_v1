// index.js
Page({
  data: {
    // 页面数据
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  handleRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
})
