import React from 'react'
import {assets} from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <>
    <div className='w-full flex bg-[#192134] items-center justify-between pl-7 pr-7 py-5 font-medium'>
      <img className='w-30' src = {assets.logo_grabzio} alt ='' />
      <button onClick = {() => setToken('')} className='bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
    <hr className='border-t border-indigo-500'/>
    </>
  )
}

export default Navbar
