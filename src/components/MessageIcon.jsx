import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react'

export function MessageIcon ({ role, handleEditButton, handleRemoveButton }) {
  const [menuHidden, setMenuHidden] = useState(true)

  return (
    <>
      <div
        className='flex gap-5 items-center'
        onMouseEnter={() => setMenuHidden(!menuHidden)}
        onMouseLeave={() => setMenuHidden(!menuHidden)}
      >
        <div className='flex items-center gap-2 justify-center'>
          <div>
            {role === 'system' && (
              <span className='fa-layers fa-fw fa-lg'>
                <FontAwesomeIcon
                  icon={solid('square')}
                  transform='grow-16'
                  className='dark:text-gray-500'
                />
                <FontAwesomeIcon
                  icon={solid('wand-magic-sparkles')}
                  className='dark:text-gray-900'
                />
              </span>
            )}
            {role === 'assistant' && (
              <span className='fa-layers fa-fw fa-lg '>
                <FontAwesomeIcon
                  icon={solid('square')}
                  transform='grow-16'
                  className='dark:text-gray-500'
                />
                <FontAwesomeIcon
                  icon={solid('robot')}
                  className='dark:text-gray-900'
                />
              </span>
            )}
            {role === 'user' && (
              <span className='fa-layers fa-fw fa-lg' pull='right'>
                <FontAwesomeIcon
                  icon={solid('square')}
                  transform='grow-16'
                  className='dark:text-gray-500'
                />
                <FontAwesomeIcon
                  icon={solid('user')}
                  className='dark:text-gray-900'
                />
              </span>
            )}
          </div>

          {role !== 'system' && (
            <div
              className={
                'rounded-[0.3em] w-6 h-6  dark:bg-gray-500 ml-[-0.7em]' +
                (!menuHidden ? ' hidden' : '')
              }
            ></div>
          )}
        </div>
        <div className=''></div>

        <label className={menuHidden && role !== 'system' && 'hidden'}>
          <span className='sr-only'>Clear conversation</span>
          <button onClick={handleRemoveButton} className=''>
            {role !== 'system' ? (
              <FontAwesomeIcon
                icon={solid('trash')}
                className='dark:text-gray-300'
              />
            ) : (
              <FontAwesomeIcon
                icon={solid('arrows-rotate')}
                className='dark:text-gray-300'
              />
            )}
          </button>
        </label>
        <label className={menuHidden && role !== 'system' && 'hidden'}>
          <span className='sr-only'>Clear conversation</span>
          <button onClick={handleEditButton} className=''>
            <FontAwesomeIcon
              icon={solid('pen')}
              className='dark:text-gray-300'
            />
          </button>
        </label>
      </div>
    </>
  )
}
