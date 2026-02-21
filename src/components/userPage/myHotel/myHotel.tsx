import { View, Text, Image } from '@tarojs/components'
import tagImage from '@/asset/pictures/钻石_填充.png'
import './index.scss'

export default function addHotel({ activeTab }) {
  return (
    <View className={`user-content-myhotel ${!activeTab ? 'user-content-myhotel-move' : ''}`}>
      <View className='user-content-circle' >
        <View className='user-content-line'></View>
      </View>
      <View className='user-content-circle circle1'>
        <View className='user-content-line'></View>
      </View>
      <View className='user-content'>
        <View className='user-hotelList'>
          {Array.from({ length: 5 }, (_, i) => i).map((i) => (
            <View className='user-hotelList-item' key={i}>
            <Image className='user-hotelList-item-img' src='https://ts3.tc.mm.bing.net/th/id/OIP-C.UyfvxlTYy6MeyKcEOWV0hwHaD4?rs=1&pid=ImgDetMain&o=7&rm=3'>
            </Image>
            <View className='user-hotelList-item-text'>
              <View className='user-hotelList-item-name'>
                <Text className='user-hotelList-item-name-text'>上海陆家嘴禧玥酒店</Text>
                <View className='user-hotelList-item-tag'>
                  {Array.from({ length: 5 }, (_, j) => j).map((j) => (
                    <Image className='user-hotelList-item-tag-img' key={j} src={tagImage} />
                  ))}
                </View>
              </View>
              <View className='hotel-evaluation'>
                <View className='hotel-point'>4.8</View>
                <View className='hotel-rank'>超棒</View>
                <View className='hotel-like'>7235评论</View>
                <View className='hotel-like'>2.3万收藏</View>
              </View>
              <View className='hotel-position'>
                近外滩·东方明珠
              </View>
              <View className='hotel-introduction'>BOSS: 25楼是上海知名米其林新荣记</View>
              <View className='hotel-label'>
                <View className='hotel-label-item'>
                  免费升房
                </View>
                <View className='hotel-label-item'>
                  新中式风
                </View>
                <View className='hotel-label-item'>
                  一线江景
                </View>
                <View className='hotel-label-item'>
                  免费停车
                </View>
              </View>
              <View className='hotel-Ranking'>上海美景酒店榜 No.16</View>
              <View className='hotel-price'><Text style='font-size: 15px'>￥</Text>936<Text style='font-size: 12px;margin-left:2px'>起</Text></View>
              <View className='hotel-supplement'>钻石贵宾价 满减券 3项优惠98<Text className='icon-jiantou-copy iconfont icon-rotate'></Text></View>
              <View className='hotel-operation'>
                <View className='hotel-operation-item'>
                  <text className='iconfont icon-chakan icon'></text>
                  &nbsp;&nbsp;查看
                </View>
                <View className='hotel-operation-item'>
                  <text className='iconfont icon-bianji icon'></text>
                  &nbsp;&nbsp;编辑
                </View>
                <View className='hotel-operation-item'>
                  <text className='iconfont icon-shanchu icon'></text>
                  &nbsp;&nbsp;删除
                </View>
              </View>
            </View>
            </View>
          ))}
        </View>
        <View className='user-hotel-show'>
        </View>
      </View>
    </View>
  )
}
