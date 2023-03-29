import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { add, getResponse } from '../slices/conversationSlice'
import CostAndToken from './CostAndToken/CostAndToken'
import ModelSelector from './ModelSelector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

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

  const onSubmit = (data) => {
    if (data.prompt.trim() !== '') {
      dispatch(
        add({
          role: 'user',
          content: data.prompt,
          uuid: promptUUID
        })
      )
    }
    dispatch(getResponse())
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
    <div className="flex justify-center w-screen pb-5 pl-5 pr-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <div className="flex flex-col px-5 py-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center">
            <label className="p-2">
              <span className="sr-only">Upload an image</span>
              <button
                disabled
                type="button"
                className="inline-flex justify-center text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-800 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <span className="fa-layers fa-fw fa-lg ">
                  <FontAwesomeIcon icon={solid('square')} transform="grow-16" />
                  <FontAwesomeIcon
                    icon={solid('image')}
                    transform="shrink-3"
                    inverse
                  />
                </span>
              </button>
            </label>
            <label className="block p-2.5 w-full">
              <span className="sr-only">Your message</span>
              <TextareaAutosize
                {...register('prompt')}
                className="w-full m-0 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                maxRows={10}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </label>
            <label className="p-2">
              <span className="sr-only">Submit prompt</span>
              <button
                type="submit"
                className="inline-flex justify-center text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <span className="fa-layers fa-fw fa-lg ">
                  <FontAwesomeIcon icon={solid('square')} transform="grow-16" />
                  <FontAwesomeIcon
                    icon={solid('paper-plane')}
                    transform="shrink-3"
                    inverse
                  />
                </span>
              </button>
            </label>
          </div>
          <div className="flex justify-between">
            <ModelSelector register={register} watch={watch} />
            <CostAndToken newPrompt={newPrompt} />
          </div>
        </div>
      </form>
    </div>
  )
}
