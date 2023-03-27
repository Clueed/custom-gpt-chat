import { ArrowRightCircleIcon, PhotoIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { add, getResponse } from '../slices/conversationSlice'
import CostAndToken from './CostAndToken/CostAndToken'
import ModelSelector from './ModelSelector'

export default function PromptForm (props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful }
  } = useForm()

  const dispatch = useDispatch()

  const [promptUUID] = useState(crypto.randomUUID())

  const onSubmit = data => {
    dispatch(
      add({
        role: 'user',
        content: data.prompt,
        uuid: promptUUID
      })
    )
    //dispatch(getResponse())
  }

  const newPrompt = watch('prompt', '')

  // Submit on enter key press in textfield
  // New line on enter + shift
  function handleKeyPress (e) {
    if (e.which === 13 && e.shiftKey === false) {
      handleSubmit(onSubmit)()
    }
  }

  useEffect(() => {
    reset({
      prompt: ''
    })
  }, [isSubmitSuccessful])

  return (
    <div className='flex justify-center w-screen pb-5 pl-5 pr-5'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl'>
        <div className='bg-gray-50 dark:bg-gray-700 flex flex-col px-5 py-3 rounded-lg'>
          <div className='flex items-center'>
            <label className='p-2'>
              <span className='sr-only'>Upload an image</span>
              <button
                disabled
                type='button'
                className='hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 inline-flex justify-center text-gray-500 rounded-lg cursor-pointer'
              >
                <PhotoIcon className='w-7 h-7' />
              </button>
            </label>
            <label className='block p-2.5 w-full'>
              <span className='sr-only'>Your message</span>
              <TextareaAutosize
                {...register('prompt', { required: true })}
                className='focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full m-0 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg'
                placeholder='Your message...'
                maxRows={10}
                onKeyPress={e => handleKeyPress(e)}
              />
            </label>
            <label className='p-2'>
              <span className='sr-only'>Submit prompt</span>
              <button
                type='submit'
                className='hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 inline-flex justify-center text-blue-600 rounded-full cursor-pointer'
              >
                <ArrowRightCircleIcon className='w-8 h-8' />
              </button>
            </label>
          </div>
          <div className='flex justify-between'>
            <ModelSelector register={register} watch={watch} />
            <CostAndToken newPrompt={newPrompt} />
          </div>
        </div>
      </form>
    </div>
  )
}
