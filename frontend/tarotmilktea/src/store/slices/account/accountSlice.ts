import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface AccountState {
  profileUrl: string
  nickname:string
  email:string
}

// Define the initial state using that type
const initialState: AccountState = {
  profileUrl:"",
  nickname:"",
  email:"",
}

export const accountSlice = createSlice({
  name: 'account',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // 프로필 변경
    setProfileUrl: (state, action: PayloadAction<string>)=>{
      state.profileUrl = action.payload
    },
    // 닉네임 변경
    setNickname: (state, action: PayloadAction<string>)=>{
      state.nickname = action.payload
    },
    // 이메일 변경
    setEmail: (state, action: PayloadAction<string>)=>{
      state.email = action.payload
    }
  },
})

export const { setProfileUrl, setNickname, setEmail } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default accountSlice.reducer