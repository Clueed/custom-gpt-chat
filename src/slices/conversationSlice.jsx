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
    //    const messages = useSelector(state => state.conversation.messages)
    const messages = state.conversation.messages

    const messagesUUIDs = Object.keys(messages)

    const messagesList = messagesUUIDs.map(uuid => messages[uuid])

    const messagesContentList = messagesList.map(
      ({ content, role, ...rest }) => ({ content, role })
    )

    // console.log(apiKey, model, messagesContentList)

    const res = await queryChatGPT(apiKey, model, messagesContentList).then(
      data => {
        // console.log(data)
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
      if (state.messages[action.payload.uuid]) {
        state.messages[action.payload.uuid] = action.payload.map(
          ({ uuid, ...rest }) => ({ ...rest })
        )
      } else {
        state.messages[crypto.randomUUID()] = action.payload
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getResponse.fulfilled, (state, { payload }) => {
        const parsedPayload = JSON.parse(payload)

        state.messages[crypto.randomUUID()] =
          parsedPayload.data.choices[0].message

        state.loading = false
      })
      .addCase(getResponse.rejected, state => {
        state.loading = false
      })
      .addCase(getResponse.pending, state => {
        state.loading = true
      })
  }
})

// Action creators are generated for each case reducer function
export const { add } = conversationSlice.actions

export default conversationSlice.reducer
