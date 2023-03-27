import {
  ArrowRightCircleIcon,
  RocketLaunchIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/20/solid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearExcept, remove } from '../slices/conversationSlice'
import { MessageTextField } from './MessageTextField'

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

  return (
    <div
      className={
        'flex w-full gap-3 px-5 py-5 align-middle rounded-lg text-stone-900 bg-gray-50 dark:bg-gray-700' +
        (role === 'user' ? ' opacity-80' : '')
      }
    >
      <div>
        {role === 'system' && <SparklesIcon className='w-6 h-6' />}
        {role === 'assistant' && (
          <RocketLaunchIcon
            className={'w-6 h-6' + (loading === true ? ' animate-spin' : '')}
          />
        )}
        {role === 'user' && <UserIcon className='w-6 h-6' />}
      </div>
      <MessageTextField
        content={content}
        editable={editable}
        setEditable={setEditable}
        uuid={uuid}
        role={role}
      />
      <label className='w-6 h-6'>
        <span className='sr-only'>Clear conversation</span>
        <button
          onClick={handleRemoveButton}
          className='hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 inline-flex justify-center text-orange-600 rounded-full cursor-pointer'
        >
          <ArrowRightCircleIcon className='w-6 h-6' />
        </button>
      </label>{' '}
      <label className='w-6 h-6'>
        <span className='sr-only'>Clear conversation</span>
        <button
          onClick={handleEditButton}
          className='hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 inline-flex justify-center text-lime-600 rounded-full cursor-pointer'
        >
          <ArrowRightCircleIcon className='w-6 h-6' />
        </button>
      </label>
    </div>
  )
}
