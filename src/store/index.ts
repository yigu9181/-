import { configureStore } from '@reduxjs/toolkit'
import chooseDateReducer from './date/chooseDate'

export const store = configureStore({
  reducer: {
    chooseDate: chooseDateReducer
  },
  // Taro 开发环境开启 Redux DevTools
  devTools: process.env.NODE_ENV !== 'production',
})

// 导出类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
