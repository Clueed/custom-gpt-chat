import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearExcept, remove } from '../slices/conversationSlice'
import { useForm } from 'react-hook-form'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { edit } from '../slices/conversationSlice'

import { MessageIcon } from './MessageIcon'

export default function Message ({ role, content, loading, uuid }) {
  const dispatch = useDispatch()

  function handleRemoveButton () {
    if (role === 'system') {
      dispatch(clearExcept({ uuid: uuid }))
    } else {
      dispatch(remove({ uuid: uuid }))
    }
  }

  const [editable, setEditable] = useState(false)

  function handleEditButton () {
    setEditable(true)
  }
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    dispatch(
      edit({ uuid: uuid, message: { content: data.content, role: role } })
    )
    setEditable(false)
  }

  return (
    <div
      className={
        'flex flex-row flex-wrap w-full gap-4 px-5 py-5 place-items-start rounded-lg text-stone-900 bg-gray-50 dark:bg-gray-700' +
        (role === 'user' ? ' opacity-80' : '')
      }
    >
      <MessageIcon role={role} />

      {editable ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReactTextareaAutosize
            className=''
            {...register('content')}
            defaultValue={content}
          />
          <button type='submit'>Hey</button>
        </form>
      ) : (
        <div
          style={{ hyphens: 'auto' }}
          className='inline-block break-words whitespace-pre-line text-gray-50'
        >
          {content}
        </div>
      )}
    </div>
  )
}
