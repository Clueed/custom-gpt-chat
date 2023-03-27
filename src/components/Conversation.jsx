import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'

export default function Conversation () {
  const convo = useSelector(state => state.conversation)
  const messages = convo.messages

  const messagesUUIDs = Object.keys(messages)

  // Scroll to bottom when messages change
  useEffect(() => {
    const element = document.querySelector('#chat-container')
    element.scroll({ left: 0, top: element.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <div
        id='chat-container'
        className='w-full h-full max-w-4xl py-5 overflow-y-auto'
      >
        <div className='flex flex-col items-center flex-grow w-full h-auto px-10 gap-4'>
          {messagesUUIDs.map(uuid => (
            <Message
              key={uuid}
              uuid={uuid}
              content={messages[uuid].content}
              role={messages[uuid].role}
            />
          ))}
          {convo.loading === true && (
            <Message role='assistant' loading={convo.loading} />
          )}
        </div>
      </div>
    </>
  )
}
