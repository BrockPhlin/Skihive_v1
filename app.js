// app.js
App({
  onLaunch() {
    console.log('应用启动')
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功:', res.code)
      },
      fail: err => {
        console.error('登录失败:', err)
      }
    })

    // 初始化全局数据
    this.initGlobalData()
  },
  
  onShow() {
    console.log('应用显示')
  },
  
  onHide() {
    console.log('应用隐藏')
  },
  
  onError(err) {
    console.error('应用错误:', err)
    // 可以在这里添加错误上报逻辑
  },
  
  globalData: {
    userInfo: null,
    /** 装配页传给飞行页的已选组件 id 列表，如 ['frame','propeller'] */
    assemblySelection: null,
    /** 飞行数据 */
    flightData: {
      flightTime: 0,
      flightStatus: '未飞行',
      evaluationScore: null
    },
    /** 环境选择 */
    environment: {
      selectedId: null,
      name: '',
      description: ''
    },
    /** 应用配置 */
    config: {
      apiBaseUrl: 'https://api.skivhive.com',
      aiApiKey: 'sk-3d03545b1a764a118710e17afede70f5',
      aiApiUrl: 'https://api.deepseek.com/v1/chat/completions'
    }
  },

  /**
   * 初始化全局数据
   */
  initGlobalData() {
    // 从本地存储恢复数据
    const savedData = wx.getStorageSync('globalData')
    if (savedData) {
      this.globalData = { ...this.globalData, ...savedData }
    }
  },

  /**
   * 保存全局数据到本地存储
   */
  saveGlobalData() {
    wx.setStorageSync('globalData', this.globalData)
  },

  /**
   * 更新装配信息
   */
  updateAssemblySelection(selection) {
    this.globalData.assemblySelection = selection
    this.saveGlobalData()
  },

  /**
   * 更新飞行数据
   */
  updateFlightData(data) {
    this.globalData.flightData = { ...this.globalData.flightData, ...data }
    this.saveGlobalData()
  },

  /**
   * 更新环境选择
   */
  updateEnvironment(environment) {
    this.globalData.environment = { ...this.globalData.environment, ...environment }
    this.saveGlobalData()
  },

  /**
   * 工具函数：格式化时间
   */
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  },

  /**
   * 分享配置
   */
  onShareAppMessage() {
    return {
      title: "低空装配与仿真平台",
      path: "/pages/index/index",
      imageUrl: "/assets/share.jpg",
      success: function(res) {
        console.log('分享成功:', res)
      },
      fail: function(err) {
        console.error('分享失败:', err)
      }
    }
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: "低空装配与仿真平台 - 体验无人机装配与飞行评估",
      imageUrl: "/assets/share.jpg"
    }
  }
})
