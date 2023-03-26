import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  apiKey: undefined,
  model: undefined,
  modelList: []
}

export const openAIConfigSlice = createSlice({
  name: 'openAIConfig',
  initialState,
  reducers: {
    setApiKey: (state, action) => {
      state.apiKey = action.payload
    },
    setModel: (state, action) => {
      state.model = action.payload
    },
    setModelList: (state, action) => {
      state.modelList = action.payload
    }
  }
})

export const { setApiKey, setModel, setModelList } = openAIConfigSlice.actions

export default openAIConfigSlice.reducer
