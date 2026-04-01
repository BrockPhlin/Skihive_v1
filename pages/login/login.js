// login.js 最终稳定版
Page({
  data: {
    email: '',
    password: '',
    isLoading: false,
    agreed: false
  },

  onLoad() {
    // 不做任何动画
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

  handleAgreeChange() {
    this.setData({
      agreed: !this.data.agreed
    })
  },

  handleSubmit(e) {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先阅读并同意协议',
        icon: 'none'
      })
      return
    }
    
    this.setData({ isLoading: true })
    
    setTimeout(() => {
      this.setData({ isLoading: false })
      wx.navigateTo({
        url: '/pages/environment/environment'
      })
    }, 1000)
  },

  handleRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

  handleWechatLogin(e) {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先阅读并同意协议',
        icon: 'none'
      })
      return
    }
    
    this.setData({ isLoading: true })
    
    // 调用微信登录API
    wx.login({
      success: (res) => {
        if (res.code) {
          // 获取用户信息
          wx.getUserProfile({
            desc: '用于完善用户资料',
            success: (userInfoRes) => {
              console.log('微信登录成功:', userInfoRes.userInfo)
              
              // 这里可以将code和用户信息发送到后端进行登录验证
              // 模拟登录成功
              setTimeout(() => {
                this.setData({ isLoading: false })
                wx.showToast({
                  title: '微信登录成功',
                  icon: 'success'
                })
                wx.navigateTo({
                  url: '/pages/environment/environment'
                })
              }, 1000)
            },
            fail: (err) => {
              console.error('获取用户信息失败:', err)
              this.setData({ isLoading: false })
              wx.showToast({
                title: '获取用户信息失败',
                icon: 'none'
              })
            }
          })
        } else {
          console.error('微信登录失败:', res.errMsg)
          this.setData({ isLoading: false })
          wx.showToast({
            title: '微信登录失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        console.error('微信登录失败:', err)
        this.setData({ isLoading: false })
        wx.showToast({
          title: '微信登录失败',
          icon: 'none'
        })
      }
    })
  }
})