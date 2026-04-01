// flying.js
const COMPONENT_LABELS = {
  propeller: '螺旋桨',
  motor: '电机',
  battery: '电池',
  sensor: '传感器',
  frame: '机架',
  camera: '相机'
}

Page({
  data: {
    isFlying: false,
    flightTime: 0,
    timer: null,
    assemblySummary: '',
    assemblyIds: [],
    evaluationScore: null
  },

  onLoad() {
    const app = getApp()
    const sel = app.globalData.assemblySelection
    const order = (sel && sel.componentOrder) || [
      'propeller',
      'motor',
      'battery',
      'sensor',
      'frame',
      'camera'
    ]

    if (sel && sel.choices) {
      const lines = []
      const ids = []
      order.forEach((id) => {
        const c = sel.choices[id]
        if (c && c.name) {
          ids.push(id)
          const w = c.weight != null ? `重${c.weight}g` : ''
          const meta = [w, c.cost != null ? `成本${c.cost}` : '', c.power != null ? `动力${c.power}` : '', c.stability != null ? `稳${c.stability}` : '']
            .filter(Boolean)
            .join(' · ')
          lines.push(`${COMPONENT_LABELS[id] || id}：${c.name}${meta ? '（' + meta + '）' : ''}`)
        }
      })
      this.setData({
        assemblyIds: ids,
        assemblySummary: lines.join('；'),
        evaluationScore: typeof sel.evaluationScore === 'number' ? sel.evaluationScore : null
      })
    } else if (sel && Array.isArray(sel.selectedComponents) && sel.selectedComponents.length) {
      const ids = sel.selectedComponents
      const summary = ids.map((id) => COMPONENT_LABELS[id] || id).join('、')
      this.setData({
        assemblyIds: ids,
        assemblySummary: summary,
        evaluationScore: null
      })
    } else {
      this.setData({
        assemblyIds: [],
        assemblySummary: '',
        evaluationScore: null
      })
    }
  },

  onUnload() {
    // 页面卸载时清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
  },

  handleStartFlying() {
    this.setData({
      isFlying: true,
      flightTime: 0
    })
    
    // 开始计时
    const timer = setInterval(() => {
      this.setData({
        flightTime: this.data.flightTime + 1
      })
    }, 1000)
    
    this.setData({
      timer: timer
    })
  },

  handleStopFlying() {
    this.setData({
      isFlying: false
    })
    
    if (this.data.timer) {
      clearInterval(this.data.timer)
      this.setData({
        timer: null
      })
    }
  },

  handleNavigateToAssembly() {
    wx.navigateTo({
      url: '/evaluation/pages/evaluation/evaluation'
    })
  }
})