import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setApiKey, getModelList } from '../slices/openAIConfigSlice'
import Spinner from './Spinner'

export default function ApiKeyForm () {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm({ mode: 'onChange' })

  const dispatch = useDispatch()

  const onSubmit = async data => {
    dispatch(setApiKey(data.apiKey))

    dispatch(getModelList({ setError, inputName: 'apiKey' }))
  }

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit))
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  const loading = useSelector(state => state.openAIConfig.loading)

  return (
    <div className='w-full max-w-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='block mb-2 text-sm text-gray-900 dark:text-white'>
          OpenAI API Key
          <input
            type='text'
            disabled={loading}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full my-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-900'
            placeholder='ab-yriMQM2Lw5bMYqBo9Imgy8LMQxSloPyeBggqqXvkGRUF1CUq'
            invalid={errors.apiKey ? 'true' : 'false'}
            aria-invalid={errors.apiKey ? 'true' : 'false'}
            {...register('apiKey', {
              required: true,
              minLength: {
                value: 51,
                message: 'Key needs to be 51 characters.'
              },
              maxLength: {
                value: 51,
                message: 'Key needs to be 51 characters.'
              }
            })}
          />
          {errors.apiKey && (
            <span role='alert' className='block my-1 text-sm text-orange-400'>
              {errors?.apiKey?.message}
            </span>
          )}
        </label>
      </form>
    </div>
  )
}
