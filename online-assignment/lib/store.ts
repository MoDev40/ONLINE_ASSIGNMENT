import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const makeStore = () => {
   const store = configureStore({
    reducer: {
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  })
  setupListeners(store.dispatch)
  return store
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']