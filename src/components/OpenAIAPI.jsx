import { Configuration, OpenAIApi } from 'openai'

export async function getModelList (apiKey) {
  console.info('Requesting OpenAI API...')

  const configuration = new Configuration({
    apiKey
  })

  const openai = new OpenAIApi(configuration)

  return await openai.listModels()
}

export default async function queryChatGPT (apiKey, model, messages) {
  const configuration = new Configuration({
    apiKey
  })

  const openai = new OpenAIApi(configuration)

  try {
    const completion = await openai.createChatCompletion({
      model,
      messages
    })
    return completion
  } catch (e) {
    // if (e.response.status === 400) {}
    console.log('Error getting GPT completion: ', e)
  }
}
