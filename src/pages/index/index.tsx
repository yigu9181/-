import { View, Text,Button,Input,Picker} from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import Taro, { useLoad } from '@tarojs/taro'
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
  const changeDate=():void=>{
    console.log('1111111')
    Taro.navigateTo({
      url: '/pages/index/calendar/calendar'
    })
  }
  const {startDate, endDate} = useSelector((state: any) => state.chooseDate)
  const getMouth = (str) => String(str).split('/')[1]
  const getDay = (str) => String(str).split('/')[2]
  const getWeek = (str) => '日一二三四五六'.charAt(new Date(str).getDay())
  function getDaysBetween(dateStr1: string, dateStr2: string):number {
    // 将字符串转换为 Date 对象（支持 "2024-02-12" 或 "2024/02/12" 格式）
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  // 酒店属性标签数组
  const hotelTags = ['亲子', '豪华', '免费停车场', 'WiFi', '健身房', '游泳池', '早餐', '商务中心']

  // 价格范围数组
  const priceRanges = ['¥200以下', '¥200-¥350', '¥350-¥450', '¥450-¥600', '¥600-¥1000', '¥1000以上']

  // 酒店星级数组
  const hotelStars = ['2钻/星及以下', '3钻/星', '4钻/星', '5钻/星', '金钻酒店', '铂钻酒店']

  // 快捷标签状态管理
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 筛选面板状态管理
  const [filterPanelVisible, setFilterPanelVisible] = useState(false)

  // 选中的价格范围
  const [selectedPrice, setSelectedPrice] = useState<string>('')

  // 选中的酒店星级
  const [selectedStar, setSelectedStar] = useState<string>('')

  // 处理价格范围点击
  const handlePriceClick = (price: string) => {
    setSelectedPrice(prev => prev === price ? '' : price)
  }

  // 处理酒店星级点击
  const handleStarClick = (star: string) => {
    setSelectedStar(prev => prev === star ? '' : star)
  }

  // 清空筛选条件
  const handleClearFilters = () => {
    setSelectedPrice('')
    setSelectedStar('')
  }

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        // 如果已选中，则移除
        return prev.filter(t => t !== tag)
      } else {
        // 如果未选中，则添加到最前面
        return [tag, ...prev]
      }
    })
  }

  // 获取排序后的标签数组
  const getSortedTags = () => {
    // 选中的标签放在前面，未选中的放在后面
    return [...selectedTags, ...hotelTags.filter(tag => !selectedTags.includes(tag))]
  }

  // 处理筛选按钮点击
  const handleFilterClick = () => {
    setFilterPanelVisible(!filterPanelVisible)
  }
  return (
    <View className='index'>
      <View className='advertisement'></View>
      <View className='message'>
        <View className='pos-time'>
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
            })}
            />
          </Picker>
          <View className='input'>
            <Input placeholder='位置/品牌/酒店'></Input>
          </View>
          <View className='iconfont icon-dingwei icon'></View>
        </View>
        <View className='date' >
          <View className='check-in'onClick={changeDate}>
            <Text className='check-in-date'>{`${getMouth(startDate)}月${getDay(startDate)}日`}</Text>
            <Text className='check-in-week'>{`周${getWeek(startDate)}`}</Text>
          </View>
          <View className='decoration'></View>
          <View className='check-out'onClick={changeDate}>
            <Text className='check-out-date'>{`${getMouth(endDate)}月${getDay(endDate)}日`}</Text>
            <Text className='check-out-week'>{`周${getWeek(endDate)}`}</Text>
          </View>
          <View className='time-interval'>共{getDaysBetween(startDate, endDate)}晚</View>
        </View>
        </View>
        <View className='background'>
          <View className='fil-lab'>
            {/* 快捷标签 */}
            <View className='quick-tags'>
              <Text className='tag-title'>酒店属性</Text>
              <View className='tag-list'>
                {getSortedTags().map(tag => (
                  <View
                    key={tag}
                    className={`tag-item ${selectedTags.includes(tag) ? 'tag-selected' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </View>
                ))}
              </View>
            </View>

            {/* 筛选条件 */}
            <View className='filters'>
              <View className='filter-panel-btn' onClick={handleFilterClick}>
                <Text className='filter-panel-text'>筛选条件</Text>
                <Text className={`filter-panel-arrow ${filterPanelVisible ? 'arrow-up' : 'arrow-down'}`}>▼</Text>
              </View>

              {/* 筛选面板 */}
              {filterPanelVisible && (
                <View className='filter-panel'>
                  {/* 价格范围 */}
                  <View className='filter-section'>
                    <View className='filter-section-title'>价格范围</View>
                    <View className='filter-options'>
                      {priceRanges.map(price => (
                        <View
                          key={price}
                          className={`filter-option ${selectedPrice === price ? 'filter-selected' : ''}`}
                          onClick={() => handlePriceClick(price)}
                        >
                          <Text>{price}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* 酒店星级 */}
                  <View className='filter-section'>
                    <View className='filter-section-title'>酒店星级</View>
                    <View className='filter-options'>
                      {hotelStars.map(star => (
                        <View
                          key={star}
                          className={`filter-option ${selectedStar === star ? 'filter-selected' : ''}`}
                          onClick={() => handleStarClick(star)}
                        >
                          <Text>{star}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* 操作按钮 */}
                  <View className='filter-actions'>
                    <View className='filter-action-btn reset-btn' onClick={handleClearFilters}>
                      <Text>清空</Text>
                    </View>
                    <View className='filter-action-btn confirm-btn' onClick={handleFilterClick}>
                      <Text>完成</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* 查询按钮 */}
            <Button className='search'>
              <View className='search-text'>查询</View>
            </Button>
          </View>
        </View>
        </View>
      </View>
  )
}
