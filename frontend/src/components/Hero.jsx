import React from 'react'
import { assets } from '../assets/assets.js'

const Hero = () => {
  return (
    <div className='bg-slate-300 flex flex-col sm:flex-row mt-2 border border-indigo-800'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-10'>
        <div className='text-[#414141]'>
          <div className ='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-indigo-500'></p>
            <p className='font-semibold text-black text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='.prata-regular bg-gradient-to-r from-purple-500 to-indigo-500 text-3xl  bg-clip-text text-transparent sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-black text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-indigo-500'></p>
          </div>
        </div>
      </div>

      <img className='w-full sm:w-1/2'src={assets.Hero}/>
    </div>
  )
}

export default Hero
