import { useState } from 'react'
import './index.css'
import { CommentsList } from './components/CommentsList'

function App() {
  return(
    <div className='bg-veryLightGray font-rubik flex justify-center items-center min-h-screen py-8 px-4'>
      <CommentsList></CommentsList>
    </div>
  )
}

export default App
