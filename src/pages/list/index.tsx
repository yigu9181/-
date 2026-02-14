import { View, Text, Input } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { setSelectedTheAddress } from '@/store/address/positionAddress'
import { useSelector , useDispatch } from 'react-redux'
import { useState } from 'react'
import './index.scss'



export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const filterItems = ['默认','热度排序','价格/星级','位置距离']
  const [selectedFilter, setSelectedFilter] = useState(0)
  const handleFilterClick = (index: number) => {
    setSelectedFilter(index)
  }
  const { priceRange, hotelStar, Labels } = useSelector((state: any) => state.hotelLabel)

  const text = Labels.join(' ')
  const hotalLabel = text.length > 11
    ? text.slice(0, 11) + '...'
    : text
  interface Arrow {
    type: string
    content: any
  }
  const arrows: Arrow[] = []
  if (Labels.length > 0) {
    arrows.push({ type: 'tags', content: hotalLabel })
  }
  if (priceRange.length > 0) {
    arrows.push({ type: 'price', content: priceRange })
  }
  if (hotelStar.length > 0) {
    arrows.push({ type: 'star', content: hotelStar })
  }
  const changeDate=():void=>{
    Taro.navigateTo({
      url: '/pages/index/calendar/calendar'
    })
  }
  const { startDate, endDate } = useSelector((state: any) => state.chooseDate)
  const getMouth = (str) => String(str).split('/')[1]
  const getDay = (str) => String(str).split('/')[2]
  const getWeek = (str) => '日一二三四五六'.charAt(new Date(str).getDay())
  // 计算两个日期之间的天数差
  function getDaysBetween(dateStr1: string, dateStr2: string): number {
    // 将字符串转换为 Date 对象（支持 "2024-02-12" 或 "2024/02/12" 格式）
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  const choosePositon=():void=>{
    Taro.navigateTo({
      url: '/pages/index/position/position'
    })
  }
  const dispatch = useDispatch()
  const { selectedAddress } = useSelector((state: any) => state.address || { selectedAddress: null })
  return (
    <View className='index'>
      <View className='tab'>
        <View className='iconfont icon-jiantou-copy icon' onClick={()=>Taro.navigateBack({
                delta: 1
              })}
        >
        </View>
        <View className='tab-form'>
          <View className='tab-form-pos'>
            {selectedAddress?.province.slice(0, 2) || '位置'}
          </View>
          <View className='tab-form-time'>
            <View className='tab-form-checkin' onClick={changeDate}>
              <Text style={{ color: '#000000' }}>入住 </Text>{startDate ? `${getMouth(startDate)}-${getDay(startDate)}(${getWeek(startDate)})` : '12-01'}
            </View>
            <View className='tab-form-checkout'>
              <Text style={{ color: '#000000' }}>退房 </Text>{endDate ? `${getMouth(endDate)}-${getDay(endDate)}(${getWeek(endDate)})` : '12-05'}
            </View>
          </View>
          <View className='tab-form-interval'>
             {startDate && endDate ? `${getDaysBetween(startDate, endDate)}晚` : '4晚'}
          </View>
          <View className='search'>
            <View className='search-icon icon-sousuobeifen2 iconfont'></View>
            <Input className='search-input'
              placeholder='位置/品牌/酒店'
              value={selectedAddress?.name || ''}
              onInput={(e) => dispatch(setSelectedTheAddress(e.detail.value))}
            ></Input>
          </View>
        </View>
        <View className='tab-choose-position' onClick={choosePositon}>
          <View className='tab-icon icon-dingwei1 iconfont'></View>
          <View className='tab-choose-position-text'>地图</View>
        </View>
      </View>
      <View className='filter-box'>
        <View className='filter-text'>{'筛选 >'}</View>
        <View className='filter'>
         {filterItems.map((item, index) => (
            <View className={`filter-item ${selectedFilter === index ? 'active' : ''}`} key={index} onClick={() => handleFilterClick(index)}>{item}</View>
          ))}
        </View>
      </View>
      <View className='Label'>
        {arrows.map((arrow, index) => (
          <View
            key={arrow.type}
            className={`arrow ${index === 0 ? '' : 'arrow2'}`}
          >
            {index !== 0 && <View className='tail'></View>}
            <View className='body'>{arrow.content}</View>
            <View className='head'></View>
          </View>
        ))}
      </View>
    </View>
  )
}
