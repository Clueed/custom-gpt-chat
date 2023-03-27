import Chat from './ChatView'
import ApiKeyForm from './components/ApiKeyForm'

import { useSelector } from 'react-redux'

export default function App () {
  const modelList = useSelector(state => state.openAIConfig.modelList)

  if (modelList.length === 0) {
    return <ApiKeyForm />
  }

  return <Chat />
}
