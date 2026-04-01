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
    
    // 必须先获取用户信息，这是点击事件的第一行代码
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (userInfoRes) => {
        console.log('获取用户信息成功:', userInfoRes.userInfo)
        
        this.setData({ isLoading: true })
        
        // 再调用wx.login获取code
        wx.login({
          success: (res) => {
            if (res.code) {
              console.log('获取登录凭证code:', res.code)
              
              // 将code和用户信息保存到全局数据
              const app = getApp()
              app.globalData.userInfo = userInfoRes.userInfo
              
              // 这里应该调用后端API进行登录验证
              // wx.request({
              //   url: app.globalData.config.apiBaseUrl + '/login',
              //   method: 'POST',
              //   data: {
              //     code: res.code,
              //     userInfo: userInfoRes.userInfo
              //   },
              //   success: (apiRes) => {
              //     if (apiRes.data.success) {
              //       // 登录成功，保存token等信息
              //       wx.setStorageSync('token', apiRes.data.token)
              //     }
              //   }
              // })
              
              // 模拟登录成功流程
              setTimeout(() => {
                this.setData({ isLoading: false })
                
                // 保存登录状态
                wx.setStorageSync('isLoggedIn', true)
                wx.setStorageSync('userInfo', userInfoRes.userInfo)
                
                wx.showToast({
                  title: '微信登录成功',
                  icon: 'success',
                  duration: 1500
                })
                
                // 延迟跳转，让用户看到成功提示
                setTimeout(() => {
                  wx.navigateTo({
                    url: '/pages/environment/environment'
                  })
                }, 1500)
              }, 1000)
            } else {
              console.error('微信登录失败，无法获取code:', res.errMsg)
              this.setData({ isLoading: false })
              wx.showToast({
                title: '微信登录失败，请检查网络',
                icon: 'none'
              })
            }
          },
          fail: (err) => {
            console.error('微信登录API调用失败:', err)
            this.setData({ isLoading: false })
            wx.showToast({
              title: '登录失败，请稍后重试',
              icon: 'none'
            })
          }
        })
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err)
        wx.showToast({
          title: '获取用户信息失败，请重试',
          icon: 'none'
        })
      }
    })
  }
})