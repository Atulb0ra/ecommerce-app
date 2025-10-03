import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent'>{text1} <span className='bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent'>{text2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-indigo-500'></p>
    </div>
  )
}

export default Title
