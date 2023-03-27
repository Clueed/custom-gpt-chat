import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { edit } from '../slices/conversationSlice'

export function MessageTextField ({
  content,
  editable,
  uuid,
  setEditable,
  role
}) {
  const { register, handleSubmit } = useForm()

  const dispatch = useDispatch()

  const onSubmit = data => {
    dispatch(
      edit({ uuid: uuid, message: { content: data.content, role: role } })
    )
    setEditable(false)
  }

  if (editable === false) {
    return (
      <div
        style={{ hyphens: 'auto' }}
        className='inline-block break-words whitespace-pre-line'
      >
        {content}
      </div>
    )
  } else if (editable === true) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactTextareaAutosize
          className=''
          {...register('content')}
          defaultValue={content}
        />
        <button type='submit'>Hey</button>
      </form>
    )
  }
}
