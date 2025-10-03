import React from 'react'
import { assets } from '../assets/assets.js'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] text-sm gap-14 my-10 mt-40 pl-7 pr-7'>

        <div>
          <img className='mb-5 w-32' src={assets.logo_grabzio} alt="" />
          <p className='w-full md:w-2/3 text-slate-300'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore porro dolor in fugit minus similique, minima impedit dolorem temporibus natus perferendis odit aut distinctio fuga quo eligendi nulla tenetur maxime!</p>
        </div>

        <div>
          <p className='text-xl mb-5 font-medium text-white'>
            COMPANY
          </p>
          <ul className='flex flex-col gap-1 text-slate-300'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl mb-5 font-medium text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-slate-300'>
            <li>+91-8276165112</li>
            <li>contact@grabzio.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='border-t border-indigo-500'/>
        <p className='py-5 text-sm text-center text-slate-300'>Copyright 2025@ grabzio.com - All rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
