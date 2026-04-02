// assembly.js — 六项需分别进入选型页确认后才计为完成
const { computeAssemblyScore } = require('../../../utils/assemblyScore.js')

const COMPONENT_IDS = ['propeller', 'motor', 'battery', 'sensor', 'frame', 'camera']

const EMPTY_CHOICES = () => ({
  propeller: null,
  motor: null,
  battery: null,
  sensor: null,
  frame: null,
  camera: null
})

function buildSlotDoneFlags(choices) {
  const flags = {}
  COMPONENT_IDS.forEach((id) => {
    flags[id] = !!(choices && choices[id])
  })
  return flags
}

function countCompleted(choices) {
  let n = 0
  COMPONENT_IDS.forEach((id) => {
    if (choices[id]) n++
  })
  return n
}

Page({
  data: {
    choices: EMPTY_CHOICES(),
    slotDoneFlags: buildSlotDoneFlags(EMPTY_CHOICES()),
    completedCount: 0
  },

  onLoad() {
    this.setData({
      slotDoneFlags: buildSlotDoneFlags(this.data.choices),
      completedCount: countCompleted(this.data.choices)
    })
  },

  handleComponentClick(e) {
    const slot = e.currentTarget.dataset.id
    if (!slot) return

    wx.navigateTo({
      url: '/packageA/pages/component-pick/component-pick?slot=' + encodeURIComponent(slot),
      events: {
        componentPicked: (payload) => {
          if (!payload || !payload.slot || !payload.option) return
          const choices = { ...this.data.choices }
          choices[payload.slot] = { ...payload.option }
          const completedCount = countCompleted(choices)
          this.setData({
            choices,
            completedCount,
            slotDoneFlags: buildSlotDoneFlags(choices)
          })
        }
      }
    })
  },

  handleBottomButton() {
    if (this.data.completedCount < 6) {
      wx.showToast({
        title: '请完成全部 6 项选型',
        icon: 'none'
      })
      return
    }
    this.handleNext()
  },

  handleReset() {
    const empty = EMPTY_CHOICES()
    this.setData({
      choices: empty,
      completedCount: 0,
      slotDoneFlags: buildSlotDoneFlags(empty)
    })
  },

  handleNext() {
    const choices = this.data.choices
    const score = computeAssemblyScore(choices)
    const app = getApp()
    app.globalData.assemblySelection = {
      choices: { ...choices },
      completedCount: 6,
      componentOrder: COMPONENT_IDS,
      evaluationScore: score
    }
    wx.navigateTo({
      url: '/packageA/pages/flying/flying'
    })
  }
})
