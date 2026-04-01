# 低空装配与仿真平台

## 项目简介

低空装配与仿真平台是一个基于微信小程序的无人机装配与飞行评估系统。用户可以通过选择不同的环境模式，进行无人机组件装配，并体验虚拟飞行和AI评估功能。

## 功能特性

### 核心功能

- **环境选择**：提供航拍出片、室内练习、高速飞行、入门教学四种环境模式
- **组件装配**：支持螺旋桨、电机、电池、传感器、机架、相机六种组件的选型和装配
- **虚拟飞行**：模拟无人机飞行过程，记录飞行时间和状态
- **AI评估**：基于飞行数据和装配配置进行专业的AI评估
- **性能评分**：计算装配组件的综合性能得分

### 技术特点

- 使用微信小程序原生开发
- 集成Vant UI组件库
- 使用DeepSeek AI API进行智能评估
- 响应式设计，适配不同屏幕尺寸

## 项目结构

```
├── assets/                 # 静态资源文件
│   └── svg/                # SVG图标资源
├── components/             # 自定义组件
│   └── navigation-bar/     # 导航栏组件
├── evaluation/             # 评估模块（分包）
│   └── pages/evaluation/   # 评估页面
├── flying/                 # 飞行模块（分包）
│   ├── assets/             # 飞行模块资源
│   └── pages/flying/       # 飞行页面
├── pages/                  # 主包页面
│   ├── assembly/           # 装配页面
│   ├── component-pick/     # 组件选型页面
│   ├── environment/        # 环境选择页面
│   ├── index/              # 首页
│   ├── login/              # 登录页面
│   ├── logs/               # 日志页面
│   └── register/           # 注册页面
├── utils/                  # 工具函数
│   ├── assemblyScore.js    # 装配评分计算
│   └── util.js             # 通用工具函数
├── app.js                  # 应用入口文件
├── app.json                # 应用配置
├── app.wxss                # 全局样式
├── package.json            # 项目依赖
└── project.config.json     # 微信开发者工具配置
```

## 安装与运行

### 前置条件

- 微信开发者工具
- Node.js环境（用于安装依赖）

### 安装步骤

1. 克隆项目到本地
```bash
git clone https://github.com/brockphlin/skihive_v1.git
cd skihive_v1
```

2. 安装依赖
```bash
npm install
```

3. 在微信开发者工具中导入项目
   - 打开微信开发者工具
   - 选择"导入项目"
   - 选择项目根目录
   - 填写AppID（测试可使用测试号）

4. 编译运行
   - 点击"编译"按钮
   - 在模拟器中查看效果

## 使用说明

### 基本流程

1. **登录/注册**：首次使用需要注册账号或登录(目前版本暂未实现)
2. **环境选择**：选择适合的飞行环境模式
3. **组件装配**：选择六种组件进行装配（螺旋桨、电机、电池、传感器、机架、相机）
4. **开始飞行**：进入飞行页面，点击"开始飞行"按钮
5. **查看评估**：飞行结束后查看性能评估和AI评估结果

### AI评估功能

AI评估功能可以根据以下信息生成专业评价：
- 飞行时间
- 飞行模式（环境选择）
- 装配组件配置
- 装配评分

评估内容包括：
- 飞行稳定性和流畅度
- 组件搭配合理性
- 性能表现分析
- 改进建议

## v_1

- **框架**：微信小程序原生开发
- **UI组件**：Vant Weapp (v1.11.7)
- **日期处理**：Dayjs (v1.11.20)
- **AI服务**：DeepSeek API

## 开发说明

### 添加新组件

1. 在 `pages/component-pick/component-pick.js` 中添加组件选项
2. 在 `utils/assemblyScore.js` 中添加评分逻辑
3. 在 `pages/assembly/assembly.wxml` 中添加组件图标

### 修改AI评估提示词

在 `evaluation/pages/evaluation/evaluation.js` 的 `generatePrompt()` 方法中修改提示词模板。

## 注意事项

- AI评估功能需要网络连接
- 确保在 `evaluation/pages/evaluation/evaluation.js` 中配置正确的API密钥
- 组件装配需要完成全部六项才能开始飞行

## 贡献

欢迎提交Issue和Pull Request！

---

**项目维护者**：brockphlin

**最后更新**：2026-04-01

## 维护记录

- 2026-04-01：v_1
  - 对文件夹结构进行优化
  - 实现了微信登录的功能
