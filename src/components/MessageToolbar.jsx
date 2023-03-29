import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export function MessageToolbar ({ role, handleEditButton, handleRemoveButton }) {
  return (
    <>
      <div className="flex items-center justify-between w-full gap-5 px-5 py-1 transition-all duration-500 ease-in-out rounded-t-lg dark:bg-gray-800 group hover:py-3">
        <div className="transition duration-500 ease-in-out group-hover:scale-125 dark:text-gray-400 group-hover:dark:text-gray-50">
          {role === 'system' && (
            <FontAwesomeIcon
              icon={solid('wand-magic-sparkles')}
              className="group-hover:scale-110"
              size="xs"
            />
          )}
          {role === 'assistant' && (
            <FontAwesomeIcon icon={solid('robot')} size="xs" />
          )}
          {role === 'user' && (
            <FontAwesomeIcon icon={solid('user')} size="xs" />
          )}
        </div>
        <div className="flex gap-6 transition-all duration-500 ease-in-out dark:text-gray-500 group-hover:dark:text-gray-50">
          <label className="transition duration-500 ease-in-out group-hover:scale-125">
            <span className="sr-only">Clear conversation</span>
            <button onClick={handleEditButton}>
              <FontAwesomeIcon icon={solid('pen')} size="xs" />
            </button>
          </label>
          <label className="transition duration-500 ease-in-out group-hover:scale-125">
            <span className="sr-only">Clear conversation</span>
            <button onClick={handleRemoveButton} className="">
              <div></div>
              {role !== 'system'
                ? (
                <FontAwesomeIcon icon={solid('trash')} size="xs" />
                  )
                : (
                <FontAwesomeIcon icon={solid('arrows-rotate')} size="xs" />
                  )}
            </button>
          </label>
        </div>
      </div>
    </>
  )
}
