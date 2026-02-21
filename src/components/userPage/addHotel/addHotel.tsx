import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default function addHotel({ activeTab }) {
  return (
    <View className={`user-content-addhotel ${activeTab ? 'user-content-myhotel-move' : ''}`}>
      <View className='user-content-circle' >
        <View className='user-content-line'></View>
      </View>
      <View className='user-content-circle circle1'>
        <View className='user-content-line'></View>
      </View>
      <View className='user-content'>

      </View>
    </View>
  )
}
