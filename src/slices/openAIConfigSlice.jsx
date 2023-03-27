import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Configuration, OpenAIApi } from 'openai'

const initialState = {
  apiKey: undefined,
  model: undefined,
  modelList: [],
  loading: false
}

export const getModelList = createAsyncThunk(
  'openAIConfig/getModelList',
  async (payload, { getState, rejectWithValue }) => {
    const state = getState()
    const apiKey = state.openAIConfig.apiKey

    const configuration = new Configuration({ apiKey })

    const openai = new OpenAIApi(configuration)
    try {
      const response = await openai.listModels()
      return response
    } catch (err) {
      payload.setError(payload.inputName, {
        message: err.response.data.error.message,
        type: err.response.type
      })
      return rejectWithValue(err.response)
    }
  }
)

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
  },
  extraReducers: builder => {
    builder
      .addCase(getModelList.fulfilled, (state, { payload }) => {
        state.loading = false
        const models = payload.data.data

        models.sort((a, b) => b.created - a.created)

        state.modelList = models

        state.model = models[0].id
      })
      .addCase(getModelList.rejected, (state, { payload }) => {
        state.loading = false
      })
      .addCase(getModelList.pending, state => {
        state.loading = true
      })
  }
})

export const { setApiKey, setModel, setModelList } = openAIConfigSlice.actions

export default openAIConfigSlice.reducer
