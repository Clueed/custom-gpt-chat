import { useSelector } from 'react-redux'
import Conversation from './components/Conversation'
import PromptForm from './components/PromptForm'
import SystemMessageForm from './components/SystemMessageForm'

export default function Chat () {
  const messages = useSelector(state => state.conversation.messages)

  if (Object.keys(messages).length === 0) {
    return <SystemMessageForm />
  }

  return (
    <div className='flex flex-col items-center justify-end w-screen h-screen'>
      <Conversation />

      <PromptForm />
    </div>
  )
}
