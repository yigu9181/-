import { PropsWithChildren } from 'react'
import { useDidShow, useDidHide, getEnv } from '@tarojs/taro'
import { Provider } from 'react-redux'
import { store } from './store'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useDidShow(() => {
    console.log('App 显示')
    // 获取当前环境
    const env = getEnv()
    console.log('当前环境:', env)

    // 根据环境跳转到不同的默认页面
    if (env === 'WEB') {
      // H5环境，跳转到h5-login
      console.log('H5环境，跳转到h5-login')
    } else {
      // 微信小程序环境，保持在we-index
      console.log('微信小程序环境，保持在we-index')
    }
  })

  useDidHide(() => {
    console.log('App 隐藏')
  })

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default App
