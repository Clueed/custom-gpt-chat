import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearExcept, remove, edit } from '../slices/conversationSlice'
import { useForm } from 'react-hook-form'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { MessageToolbar } from './MessageToolbar'

export default function Message ({ role, content, uuid }) {
  const dispatch = useDispatch()

  function handleRemoveButton () {
    if (role === 'system') {
      dispatch(clearExcept({ uuid }))
    } else {
      dispatch(remove({ uuid }))
    }
  }

  const [editable, setEditable] = useState(false)

  function handleEditButton () {
    setEditable(true)
  }
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    const trimmedContent = data.content.trim()

    if (trimmedContent !== '') {
      dispatch(edit({ uuid, message: { content: trimmedContent, role } }))
    } else {
      dispatch(remove({ uuid }))
    }
    setEditable(false)
  }

  // Submit on enter key press in textfield
  // New line on enter + shift
  function handleKeyPress (e) {
    if (e.which === 13 && e.shiftKey === false) {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <div
      className={
        ' w-full place-items-start rounded-lg text-stone-900 bg-gray-50 dark:bg-gray-700' +
        (role === 'user' ? ' opacity-80' : '')
      }
    >
      <MessageToolbar
        role={role}
        handleRemoveButton={handleRemoveButton}
        handleEditButton={handleEditButton}
        editable={editable}
      />

      <div className="flex items-center gap-5 mx-5 my-5 text-gray-50">
        {editable
          ? (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <ReactTextareaAutosize
              className="w-full p-0 m-0 bg-transparent border-0 border-none outline-none appearance-none text-inherit focus:ring-0"
              {...register('content')}
              defaultValue={content}
              onKeyPress={(e) => handleKeyPress(e)}
            />
          </form>
            )
          : (
          <div
            style={{ hyphens: 'auto' }}
            className="inline-block break-words whitespace-pre-line "
          >
            {content}
          </div>
            )}
      </div>
    </div>
  )
}
