import React from 'react'

const NewsletterBox = () => {
    const onCubmitHandler = (e) => {
        e.preventDefault();
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-white'>Subscribe now & get 20% off</p>
      <p className='text-slate-300 mt-3'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam obcaecati repellat accusantium? Numq
      </p>
      <form onSubmit={onCubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-indigo-500 pl-3'>
        <input className='w-full sm:flex-1 outline-none text-white' type='email' placeholder='Enter your email' required/>
        <button type="submit" className='bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
