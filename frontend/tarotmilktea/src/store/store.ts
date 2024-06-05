import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter/counterSlice'
import tarotReducer from './slices/tarot/tarotSlice'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    tarot:tarotReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;