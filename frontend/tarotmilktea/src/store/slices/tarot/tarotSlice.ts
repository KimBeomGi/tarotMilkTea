import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface TarotState {
  value: number
  isClickGoRead : boolean
}

// Define the initial state using that type
const initialState: TarotState = {
  value: 0,
  isClickGoRead : false
}

export const tarotSlice = createSlice({
  name: 'tarot',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload
    },
    
    trueIsSelectcomplete : (state) => {
      state.isClickGoRead = true
    },
    
    falseIsSelectcomplete : (state) => {
      state.isClickGoRead = false
    }
  },
})

export const { increment, decrement, incrementByAmount, decrementByAmount,
  trueIsSelectcomplete, falseIsSelectcomplete
 } = tarotSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default tarotSlice.reducer