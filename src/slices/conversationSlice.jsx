import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import queryChatGPT from '../components/OpenAIAPI'

const initialState = {
  messages: {},
  loading: false
}

export const getResponse = createAsyncThunk(
  'conversation/getResponse',
  async (payload, { getState }) => {
    const state = getState()

    const apiKey = state.openAIConfig.apiKey
    const model = state.openAIConfig.model

    const messages = state.conversation.messages
    const messagesUUIDs = Object.keys(messages)
    const messagesList = messagesUUIDs.map((uuid) => messages[uuid])
    const messagesContentList = messagesList.map(
      ({ content, role, ...rest }) => ({ content, role })
    )

    const res = await queryChatGPT(apiKey, model, messagesContentList).then(
      (data) => {
        return JSON.stringify(data)
      }
    )
    return res
  }
)

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    add: (state, action) => {
      state.messages[crypto.randomUUID()] = action.payload
    },
    clearExcept: (state, action) => {
      for (const key in state.messages) {
        if (key !== action.payload.uuid) {
          delete state.messages[key]
        }
      }
    },
    remove: (state, action) => {
      delete state.messages[action.payload.uuid]
    },
    edit: (state, action) => {
      state.messages[action.payload.uuid] = action.payload.message
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResponse.fulfilled, (state, { payload }) => {
        const parsedPayload = JSON.parse(payload)

        state.messages[crypto.randomUUID()] =
          parsedPayload.data.choices[0].message

        state.loading = false
      })
      .addCase(getResponse.rejected, (state) => {
        state.loading = false
      })
      .addCase(getResponse.pending, (state) => {
        state.loading = true
      })
  }
})

export const { add, clearExcept, remove, edit } = conversationSlice.actions

export default conversationSlice.reducer
