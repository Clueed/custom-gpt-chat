import {
  RocketLaunchIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/20/solid'

export default function Message ({ role, content, loading }) {
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
      {content && (
        <div
          style={{ hyphens: 'auto' }}
          className='inline-block break-words whitespace-pre-line'
        >
          {content}
        </div>
      )}
    </div>
  )
}
