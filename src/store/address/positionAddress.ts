import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LocationInfo {
  latitude: number|null
  longitude: number|null
  address: string|null
  name: string|null
  province: string|null
  city: string|null
  district: string|null
  street: string|null
  streetNumber: string|null
}

interface AddressState {
  selectedAddress: LocationInfo | null
}

const initialState: AddressState = {
  selectedAddress: null
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<LocationInfo>) => {
      state.selectedAddress = action.payload
    },
    setSelectedTheAddress: (state, action: PayloadAction<string>) => {
      if (state.selectedAddress) {
        state.selectedAddress.name = action.payload || ''
      } else {
        // 如果selectedAddress为null，创建一个新的地址对象
        state.selectedAddress = {
          latitude: null,
          longitude: null,
          address: action.payload || '',
          name: null,
          province: null,
          city: null,
          district: null,
          street: null,
          streetNumber: null
        }
      }
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null
    }
  }
})

export const { setSelectedAddress, setSelectedTheAddress, clearSelectedAddress } = addressSlice.actions

export default addressSlice.reducer
