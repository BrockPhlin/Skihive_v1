// environment.js
Page({
  data: {
    environments: [
      { id: 1, name: '航拍出片', icon: '🏠', description: '稳定飞行，拍摄风景' },
      { id: 2, name: '室内练习', icon: '🌳', description: '轻量，安全' },
      { id: 3, name: '高速飞行', icon: '🔬', description: '速度与机动性' },
      { id: 4, name: '入门教学', icon: '🧩', description: '低成本，低速可飞' }
    ],
    selectedEnvironment: null
  },

  onLoad() {},

  handleEnvironmentSelect(e) {
    const raw = e.currentTarget.dataset.id
    const environmentId = raw === undefined || raw === '' ? null : Number(raw)
    this.setData({
      selectedEnvironment: environmentId
    })
  },

  handleNavigateToAssembly() {
    if (this.data.selectedEnvironment == null) {
      wx.showToast({
        title: '请选择环境',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/assembly/assembly',
      fail: (err) => {
        wx.showModal({
          title: '无法打开装配页',
          content: (err && err.errMsg) || '请重新编译小程序后重试',
          showCancel: false
        })
      }
    })
  }
})
