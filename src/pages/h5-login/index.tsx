import { View, Form,  Input } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function Index () {
  const [state, setState] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [Surepassword, setSurepassword] = useState('')
  const [id, setId] = useState(0)
  const handleIdClick = (d: number) => {
    setId(d)
  }
  const handleUsernameChange = (e: any) => {
    setUsername(e.detail.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.detail.value)
  }
  const handleSurepasswordChange = (e: any) => {
    setSurepassword(e.detail.value)
  }
  const handleSignupClick = () => {
    setState(!state)
  }
 return(
   <View className='login'>
    <View className='login-module'>
      <View className='login-module-title'>
        易宿酒店管理系统
      </View>
      <View className='login-module-icon'>
         <View className='login-module-icon-item'>
          <View className='icon-jiudian iconfont icon'></View>
          <View className='text'>高效管理</View>
         </View>
         <View className='login-module-icon-item'>
           <View className='icon-suo iconfont icon'></View>
           <View className='text'>安全管控</View>
         </View>
         <View className='login-module-icon-item'>
           <View className='icon-gengxin iconfont icon'></View>
           <View className='text'>实时更新</View>
         </View>
      </View>
      <View className='login-module-content'>
        {!state && <View className='login-module-content-box'>
          <View className='login-module-content-title'>
            登录
          </View>
          <Form className='login-module-content-form'>
            <View className='form-item'>
               <View className='icon-ren iconfont icon1'></View>
               <Input className='username' placeholder='请输入用户名' value={username} onInput={handleUsernameChange}></Input>
            </View>
             <View className='form-item'>
               <View className='icon-mima iconfont icon1 icon2'></View>
               <Input className='password' placeholder='请输入密码' value={password} onInput={handlePasswordChange}></Input>
            </View>
          </Form>
          <View className='to-signup'>
            还没有账号？<View className='to-signup-link' onClick={handleSignupClick}>去注册</View>
          </View>
          <View className='login-module-content-btn'>
            确认
          </View>
        </View>
        }
        {state && <View className='signup-module-content-box'>
          <View className='signup-module-content-title'>
            注册
          </View>
          <Form className='signup-module-content-form'>
            <View className='form-item'>
               <View className='icon-ren iconfont icon'></View>
               <Input className='text' placeholder='请输入用户名' value={username} onInput={handleUsernameChange}></Input>
            </View>
             <View className='form-item'>
               <View className='icon-mima iconfont icon'></View>
               <Input className='text' placeholder='请输入密码' value={password} onInput={handlePasswordChange}></Input>
             </View>
             <View className='form-item'>
               <View className='icon-mimaqueren iconfont icon'></View>
               <Input className='text' placeholder='请确认密码' value={Surepassword} onInput={handleSurepasswordChange}></Input>
             </View>
          </Form>
          <View className='id'>
            <View className={id === 0 ? 'id-item id-item-active' : 'id-item'} onClick={()=>handleIdClick(0)}>
               <View className='icon-guanliyuan iconfont icon'></View>
               <View className='text'>管理员</View>
            </View>
            <View className={id === 1 ? 'id-item id-item-active' : 'id-item'} onClick={()=>handleIdClick(1)}>
               <View className='icon-yonghu iconfont icon'></View>
               <View className='text'>商户</View>
            </View>
          </View>
          <View className='to-login'>
            已经有账号？<View className='to-login-link' onClick={handleSignupClick}>去登录</View>
          </View>
           <View className='login-module-content-btn signup-module-content-btn'>
            确认
          </View>
        </View>
        }
      </View>
    </View>
   </View>
 )
}
