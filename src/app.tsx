import { PropsWithChildren } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { Provider } from 'react-redux'
import { store } from './store'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useDidShow(() => {
    console.log('App 显示')
  })

  useDidHide(() => {
    console.log('App 隐藏')
  })

  return (
    <Provider store={store}>
    { children }
    </Provider>
  )
}

export default App
