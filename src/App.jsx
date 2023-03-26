import Chat from './ChatView'
import ApiKeyForm from './components/ApiKeyForm'

import { useSelector } from 'react-redux'

export default function App () {
  if (useSelector(state => state.openAIConfig.apiKey) === undefined) {
    return <ApiKeyForm />
  }

  return <Chat />
}
