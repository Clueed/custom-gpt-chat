import { useDispatch, useSelector } from 'react-redux'
import { setModel } from '../slices/openAIConfigSlice'

export default function ModelSelector ({ register, watch }) {
  // Updates models on selector update
  useDispatch(setModel(watch('model')))

  const modelList = useSelector(state => state.openAIConfig.modelList)

  return (
    <>
      <label>
        <span className='sr-only'>Model</span>
        <select
          className='w-full m-0 text-xs text-gray-600 bg-white border border-gray-300 rounded-lg opacity-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('model')}
        >
          {modelList.map(model => (
            <option key={model.id}>{model.id}</option>
          ))}
        </select>
      </label>
    </>
  )
}
