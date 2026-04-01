// component-pick.js — 选项含 name、weight、cost、power、stability（与装配数据结构一致）
const SLOT_META = {
  propeller: { title: '螺旋桨', subtitle: '选择桨叶型号' },
  motor: { title: '电机', subtitle: '选择电机规格' },
  battery: { title: '电池', subtitle: '选择电池容量' },
  sensor: { title: '传感器', subtitle: '选择传感器类型' },
  frame: { title: '机架', subtitle: '选择机架材质/规格' },
  camera: { title: '相机', subtitle: '选择相机模组' }
}

// weight: g, cost: 相对成本, power/stability: 1–5 量级评分
const SLOT_OPTIONS = {
  propeller: [
    { id: 'p_tri', name: '三叶桨 · 高效', weight: 14, cost: 48, power: 4, stability: 3 },
    { id: 'p_dual', name: '双叶桨 · 静音', weight: 11, cost: 42, power: 3, stability: 3 },
    { id: 'p_fold', name: '折叠桨 · 便携', weight: 16, cost: 55, power: 3, stability: 2 }
  ],
  motor: [
    { id: 'm_2204', name: '2204 · 入门', weight: 28, cost: 60, power: 3, stability: 3 },
    { id: 'm_2306', name: '2306 · 竞速', weight: 32, cost: 85, power: 5, stability: 2 },
    { id: 'm_2807', name: '2807 · 负重', weight: 38, cost: 95, power: 5, stability: 3 }
  ],
  battery: [
    { id: 'b_3s', name: '3S 1500mAh', weight: 145, cost: 70, power: 3, stability: 3 },
    { id: 'b_4s', name: '4S 1300mAh', weight: 155, cost: 88, power: 4, stability: 3 },
    { id: 'b_6s', name: '6S 1100mAh · 高压', weight: 165, cost: 110, power: 5, stability: 2 }
  ],
  sensor: [
    { id: 's_imu', name: '六轴 IMU', weight: 8, cost: 35, power: 2, stability: 4 },
    { id: 's_gps', name: 'GPS + 气压', weight: 18, cost: 72, power: 2, stability: 5 },
    { id: 's_vio', name: '视觉惯性融合', weight: 22, cost: 120, power: 2, stability: 5 }
  ],
  frame: [
    { id: 'f_cf', name: '碳纤维 · 轻量', weight: 120, cost: 220, power: 1, stability: 4 },
    { id: 'f_al', name: '铝合金 · 耐用', weight: 180, cost: 150, power: 1, stability: 5 },
    { id: 'f_pla', name: '工程塑料 · 经济', weight: 95, cost: 45, power: 1, stability: 2 }
  ],
  camera: [
    { id: 'c_4k', name: '4K 广角', weight: 45, cost: 180, power: 2, stability: 3 },
    { id: 'c_fpv', name: 'FPV 低延迟', weight: 22, cost: 90, power: 2, stability: 2 },
    { id: 'c_zoom', name: '变焦云台', weight: 85, cost: 260, power: 2, stability: 4 }
  ]
}

Page({
  data: {
    slot: '',
    pageTitle: '',
    pageSubtitle: '',
    options: [],
    selectedId: null,
    selectedOption: null
  },

  onLoad(query) {
    const slot = query.slot || ''
    const meta = SLOT_META[slot]
    const list = SLOT_OPTIONS[slot] || []
    if (!meta || !list.length) {
      wx.showToast({ title: '未知组件类型', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1500)
      return
    }
    this.setData({
      slot,
      pageTitle: meta.title,
      pageSubtitle: meta.subtitle,
      options: list
    })
  },

  handlePick(e) {
    const id = e.currentTarget.dataset.id
    const opt = this.data.options.find((o) => o.id === id)
    if (!opt) return
    this.setData({
      selectedId: id,
      selectedOption: opt
    })
  },

  handleConfirm() {
    if (!this.data.selectedOption) {
      wx.showToast({ title: '请先选择一个选项', icon: 'none' })
      return
    }
    const o = this.data.selectedOption
    const channel = this.getOpenerEventChannel && this.getOpenerEventChannel()
    if (channel && channel.emit) {
      channel.emit('componentPicked', {
        slot: this.data.slot,
        option: {
          id: o.id,
          name: o.name,
          weight: o.weight,
          cost: o.cost,
          power: o.power,
          stability: o.stability
        }
      })
    }
    wx.navigateBack()
  }
})
