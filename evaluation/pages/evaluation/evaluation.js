// evaluation.js
Page({
  data: {
    flightTime: 0,
    flightStatus: '飞行完成',
    evaluationResult: '优秀',
    isLoading: false,
    aiResult: '',
    // 保存从其他页面传递的数据
    environmentMode: '',
    selectedComponents: [],
    assemblyScore: 0
  },

  onLoad() {
    // 获取飞行时间
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    if (prevPage && prevPage.data && prevPage.data.flightTime) {
      this.setData({
        flightTime: prevPage.data.flightTime
      })
    }
    
    // 获取装配信息
    this.loadAssemblyData()
  },

  loadAssemblyData() {
    // 尝试从装配页面获取组件信息
    const pages = getCurrentPages()
    for (let i = pages.length - 1; i >= 0; i--) {
      const page = pages[i]
      if (page.route && page.route.includes('assembly')) {
        if (page.data && page.data.selectedComponents) {
          this.setData({
            selectedComponents: page.data.selectedComponents,
            assemblyScore: page.data.assemblyScore || 0
          })
          break
        }
      }
      if (page.route && page.route.includes('environment')) {
        if (page.data && page.data.selectedEnvironment) {
          const environmentMap = {
            1: '航拍出片',
            2: '室内练习',
            3: '高速飞行',
            4: '入门教学'
          }
          this.setData({
            environmentMode: environmentMap[page.data.selectedEnvironment] || ''
          })
        }
      }
    }
  },

  handleAIEvaluation() {
    if (this.data.isLoading) return
    
    this.setData({
      isLoading: true,
      aiResult: ''
    })
    
    // 生成提示词
    const prompt = this.generatePrompt()
    
    // 调用AI API
    this.callAIApi(prompt)
  },

  generatePrompt() {
    const { flightTime, environmentMode, selectedComponents, assemblyScore } = this.data
    
    // 根据不同模式生成不同的提示词
    let prompt = ''
    
    switch (environmentMode) {
      case '航拍出片':
        prompt = `请对一次航拍飞行进行专业评价。\n\n飞行信息：\n- 飞行时间：${flightTime}秒\n- 飞行模式：航拍出片\n- 装配组件：${selectedComponents.join('、')}\n- 装配评分：${assemblyScore}\n\n请从以下方面进行评价：\n1. 飞行稳定性和流畅度\n2. 航拍角度和构图建议\n3. 组件搭配的合理性\n4. 改进建议\n\n请给出专业、详细的评价。`
        break
      case '室内练习':
        prompt = `请对一次室内练习飞行进行评价。\n\n飞行信息：\n- 飞行时间：${flightTime}秒\n- 飞行模式：室内练习\n- 装配组件：${selectedComponents.join('、')}\n- 装配评分：${assemblyScore}\n\n请从以下方面进行评价：\n1. 室内操控技巧\n2. 避障能力\n3. 组件选择的适用性\n4. 练习建议\n\n请给出针对性的评价和改进建议。`
        break
      case '高速飞行':
        prompt = `请对一次高速飞行进行专业评价。\n\n飞行信息：\n- 飞行时间：${flightTime}秒\n- 飞行模式：高速飞行\n- 装配组件：${selectedComponents.join('、')}\n- 装配评分：${assemblyScore}\n\n请从以下方面进行评价：\n1. 速度控制和稳定性\n2. 组件性能表现\n3. 高速飞行的安全建议\n4. 极限性能提升建议\n\n请给出专业的技术评价。`
        break
      case '入门教学':
        prompt = `请对一次入门教学飞行进行评价。\n\n飞行信息：\n- 飞行时间：${flightTime}秒\n- 飞行模式：入门教学\n- 装配组件：${selectedComponents.join('、')}\n- 装配评分：${assemblyScore}\n\n请从以下方面进行评价：\n1. 基础操作掌握程度\n2. 飞行姿态控制\n3. 组件选择的入门友好性\n4. 学习建议\n\n请给出适合初学者的评价和指导。`
        break
      default:
        prompt = `请对一次飞行进行评价。\n\n飞行信息：\n- 飞行时间：${flightTime}秒\n- 装配组件：${selectedComponents.join('、')}\n- 装配评分：${assemblyScore}\n\n请从飞行表现、组件搭配等方面进行综合评价，并给出改进建议。`
    }
    
    return prompt
  },

  callAIApi(prompt) {
    // 这里是API调用逻辑，请替换为你的API密钥和接口
    const API_KEY = 'sk-3d03545b1a764a118710e17afede70f5' // 请在此处填写你的API密钥
    const API_URL = 'https://api.deepseek.com/v1/chat/completions' // 请替换为你的API接口
    
    wx.request({
      url: API_URL,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        model: 'deepseek-chat', // 根据你的API调整模型名称
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      },
      success: (res) => {
        console.log('AI API调用成功:', res.data)
        if (res.data && res.data.choices && res.data.choices[0]) {
          this.setData({
            aiResult: res.data.choices[0].message.content
          })
        }
      },
      fail: (err) => {
        console.error('AI API调用失败:', err)
        wx.showToast({
          title: 'AI评价失败，请稍后重试',
          icon: 'none'
        })
      },
      complete: () => {
        this.setData({
          isLoading: false
        })
      }
    })
  },

  handleBackToEnvironment() {
    wx.navigateBack({
      delta: 3
    })
  }
})