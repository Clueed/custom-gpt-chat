import { useEffect } from 'react'
import { set, useForm } from 'react-hook-form'
import { getModelList } from './OpenAIAPI'
import { useDispatch } from 'react-redux'
import { setApiKey, setModelList, setModel } from '../slices/openAIConfigSlice'

export default function ApiKeyForm () {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError
  } = useForm({ mode: 'onChange' })

  const dispatch = useDispatch()

  const onSubmit = async data => {
    try {
      const response = await getModelList(data.apiKey)
      saveModels(response.data.data)
    } catch (err) {
      if (err.response.status === 401) {
        setError('apiKey', {
          type: err.response.status,
          message: 'Invalid API Key'
        })
        return false
      } else {
        throw new Error(err)
      }
    }

    console.info('Api connected successfully')

    dispatch(setApiKey(data.apiKey))

    return true
  }

  function saveModels (models) {
    models.sort((a, b) => b.created - a.created)

    dispatch(setModelList(models))
    dispatch(setModel(models[0].id))
  }

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit))
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  return (
    <div className='w-full max-w-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className='block mb-2 text-sm text-gray-900 dark:text-white'>
          OpenAI API Key
          <input
            type='text'
            disabled={isSubmitting}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full my-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
