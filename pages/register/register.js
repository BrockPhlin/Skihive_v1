// register.js
Page({
  data: {
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  handleEmailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },

  handlePasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  handleConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },

  handleSubmit(e) {
    // 验证密码是否一致
    if (this.data.password !== this.data.confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return
    }
    
    this.setData({
      isLoading: true
    })
    
    // 模拟注册逻辑
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
      
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }, 1500)
    }, 1000)
  },

  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  }
})