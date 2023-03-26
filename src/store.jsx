import { configureStore } from '@reduxjs/toolkit'
import conversationReducer from './slices/conversationSlice'
import openAIConfigReducer from './slices/openAIConfigSlice'

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    openAIConfig: openAIConfigReducer
  }
})
