import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}
const chooseDateStore = createSlice({
  name: 'chooseDate',
  initialState: {
    startDate:  formatDate(today),
    endDate: formatDate(tomorrow)
  },
  reducers: {
    setChooseDate(state, action: PayloadAction<{ startDate: string, endDate: string}>) {
      state.startDate = action.payload.startDate
      state.endDate = action.payload.endDate
    }
  }
})
const { setChooseDate } = chooseDateStore.actions
export { setChooseDate }
export default chooseDateStore.reducer
