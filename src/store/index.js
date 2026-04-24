import { configureStore } from '@reduxjs/toolkit'
import workflowReducer from './slices/workflowSlice'
import { workflowApi } from '../api/workflowApi'

const store = configureStore({
  reducer: {
    workflow: workflowReducer,
    [workflowApi.reducerPath]: workflowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workflowApi.middleware),
})

export default store
