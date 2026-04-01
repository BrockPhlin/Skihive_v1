// index.js
Page({
  data: {
    // 页面数据
  },

  onLoad() {
    // 检查登录状态
    this.checkLoginStatus()
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus() {
    const app = getApp()
    
    if (app.globalData.isLoggedIn) {
      console.log('用户已登录，直接进入环境选择页面')
      wx.switchTab({
        url: '/pages/environment/environment'
      })
    }
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
