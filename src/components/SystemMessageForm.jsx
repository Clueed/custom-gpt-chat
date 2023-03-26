import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { add } from '../slices/conversationSlice'

export default function SystemMessageForm (props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => handleSystemMessage(data.systemMessage)

  const dispatch = useDispatch()
  function handleSystemMessage (systemMessage) {
    dispatch(
      add({
        role: 'system',
        content: systemMessage
      })
    )
  }

  return (
    <div className='w-full max-w-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='block mb-2 text-sm text-gray-900 font- dark:text-white'>
          System prompt
          <input
            type='text'
            defaultValue='You are a helpful assistant.'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full my-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...register('systemMessage', {
              required: true
            })}
          />
          {errors.systemMessage && (
            <span role='alert' className='block my-1 text-sm text-orange-400'>
              {errors?.systemMessage?.message}
            </span>
          )}
        </label>
      </form>
    </div>
  )
}
