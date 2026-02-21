import { View, Text } from '@tarojs/components'
import { useEffect } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Index () {
  // 检查是否有 token 且身份符合，如果不符合则跳转到登录页
  useEffect(() => {
    console.log('Checking for token in manager page...')
    const token = Taro.getStorageSync('token')
    const userInfo = Taro.getStorageSync('userInfo')
    console.log('Token found:', token)
    console.log('User info found:', userInfo)
    
    if (!token || !userInfo) {
      console.log('No token or user info, redirecting to login...')
      Taro.redirectTo({ url: '/pages/h5-login/index' })
      return
    }
    
    console.log('User role:', userInfo.role)
    // 验证身份是否符合，管理页只能管理员访问
    if (userInfo.role !== '管理员') {
      console.log('Role not matched, redirecting to login...')
      Taro.redirectTo({ url: '/pages/h5-login/index' })
    }
  }, [])

 return(
   <View>
     <Text>管理页</Text>
   </View>
 )
}
