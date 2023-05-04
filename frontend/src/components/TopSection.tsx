import React from 'react'
import { Comment, CurrentUser } from '../utils/interfaces'

type TopSection = {
  user:{
    image: { 
      png: string;
      webp: string;
    },
    username: string;
  },
  createdAt: string;
  currentUser: CurrentUser
}

export const TopSection = ({user, createdAt, currentUser}: TopSection) => {
  return (
    <div className='flex items-center gap-4'>
      <img className='w-8 h-8' src={user.image.webp} alt={user.username} />
      <h2 className='text-darkBlue font-bold'>{user.username}</h2>
      {currentUser.username === user.username ? 
        <div className='px-2 py-0.5 text-[10px] rounded text-white bg-moderateBlue'>
          <p>you</p>
        </div>:``}
      <p className='text-grayishBlue'>{createdAt}</p>
    </div>
  )
}
