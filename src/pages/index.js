import Head from 'next/head'
import App from '../App'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex items-center justify-center h-screen dark:bg-gray-900 bg-stone-200'>
        <App />
      </main>
    </>
  )
}