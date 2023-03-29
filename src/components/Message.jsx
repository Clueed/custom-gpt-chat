import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearExcept, remove, edit } from '../slices/conversationSlice'
import { useForm } from 'react-hook-form'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { MessageToolbar } from './MessageToolbar'

export default function Message ({ role, content, loading, uuid }) {
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
    dispatch(edit({ uuid, message: { content: data.content, role } }))
    setEditable(false)
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
      />

      <div className="flex items-center gap-5 mx-5 my-5">
        {editable
          ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReactTextareaAutosize
              className=""
              {...register('content')}
              defaultValue={content}
            />
            <button type="submit">Hey</button>
          </form>
            )
          : (
          <div
            style={{ hyphens: 'auto' }}
            className="inline-block break-words whitespace-pre-line text-gray-50"
          >
            {content}
          </div>
            )}
      </div>
    </div>
  )
}
