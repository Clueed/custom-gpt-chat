import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { store } from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <main className='flex items-center justify-center h-screen dark:bg-gray-900 bg-stone-200'>
        <App />
      </main>
    </Provider>
  </React.StrictMode>
)
