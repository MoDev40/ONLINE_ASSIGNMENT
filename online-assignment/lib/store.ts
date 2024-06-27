import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userSlice from './features/userSlice'
import roomSLice from './features/roomSlice'

export const makeStore = () => {
   const store = configureStore({
    reducer: {
    [userSlice.reducerPath]:userSlice.reducer,
    [roomSLice.reducerPath]:roomSLice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userSlice.middleware)
    .concat(roomSLice.middleware)
  })
  setupListeners(store.dispatch)
  return store
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']