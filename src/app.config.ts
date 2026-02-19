// 基础页面配置
const basePages = [
  // 微信小程序页面
  'pages/we-index/index',
  'pages/we-list/index',
  'pages/we-details/index',
  'pages/we-index/calendar/calendar',
  'pages/we-index/position/position',
  // H5页面
  'pages/h5-login/index',
  'pages/h5-manager/index',
  'pages/h5-user/index'
]

// 根据不同环境设置默认页面
const entryPagePath = process.env.TARO_ENV === 'h5' ? 'pages/h5-login/index' : 'pages/we-index/index'

export default defineAppConfig({
  pages: basePages,
  // 设置默认页面
  entryPagePath: entryPagePath,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '易宿酒店预订',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  },
  requiredPrivateInfos: [
    'getLocation',
    'chooseLocation'
  ],
  requiredBackgroundModes: []
})
