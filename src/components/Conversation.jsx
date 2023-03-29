import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Conversation () {
  const convo = useSelector((state) => state.conversation)
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
        id="chat-container"
        className="w-full h-full max-w-4xl py-5 overflow-y-auto"
      >
        <div className="flex flex-col items-center flex-grow w-full h-auto gap-4 px-10">
          {messagesUUIDs.map((uuid) => (
            <Message
              key={uuid}
              uuid={uuid}
              content={messages[uuid].content}
              role={messages[uuid].role}
            />
          ))}
          {convo.loading === true && (
            <div className="flex items-center justify-center w-full my-5 text-green-200 align-middle animate-bounce">
              <FontAwesomeIcon icon={solid('robot')} size="xl" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
