import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter/counterSlice'
import tarotReducer from './slices/tarot/tarotSlice'
import accountReducer from './slices/account/accountSlice'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    tarot:tarotReducer,
    account:accountReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;