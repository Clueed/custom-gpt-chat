import { Configuration, OpenAIApi } from 'openai'

export default async function queryChatGPT (apiKey, model, messages) {
  const configuration = new Configuration({
    apiKey
  })

  const openai = new OpenAIApi(configuration)

  const completion = await openai.createChatCompletion({
    model,
    messages
  })
  return completion
}
