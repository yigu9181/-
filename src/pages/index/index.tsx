import { View, Text,Button,Input,Picker} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import classNames from 'classnames'
import './index.scss'
export default function Index() {
  useLoad(() => {
    console.log('酒店查询页加载')
  })
  const [array] = useState(['上海', '北京', '广州', '深圳'])
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const onPickerChange = (e) => {
    setIndex(e.detail.value)
    setIsOpen(!isOpen)
  }
  const rotate=():void=>{
    setIsOpen(!isOpen)
  }
  return (
    <View className='index'>
      <View className='advertisement'>广告</View>
      <view className='message'>
        <View className='position'>
          <Picker 
            mode='selector' 
            range={array} 
            onChange={onPickerChange}
            onClick={rotate}
            onCancel={rotate}
          >
            <View className='picker'>
              {array[index]}
            </View>
            <Text className={classNames('iconfont', 'icon-jiantou-copy','arrow-up', {
            'arrow-down': isOpen
            })} />
          </Picker>
          <View className="input">
            <Input placeholder="位置/品牌/酒店"></Input>
          </View>
          <View className='iconfont icon-dingwei icon'></View>
        </View>
        <Button className='search'>
          <Text>查询</Text>
        </Button>
      </view>
    </View>
  )
}