import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from "../components/NewsletterBox"

const Contact = () => {
  return (
    <div>
      <div className='text-center text-3xl pt-10 '>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="flex flex-col justify-center my-10 md:flex-row gap-10 mb-28">
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-white'>Our Store</p>
          <p className='text-slate-300'>221, MG Road, 4th Floor, Indiranagar,<br />Bengaluru, Karnataka – 560038
            India</p>
          <p className='text-slate-300'>Phone : +91-8976534154 <br />Email:admin@grabzio.com</p>
          <p className='font-semibold text-indigo-500 text-xl'>Careers at Grabzio</p>
          <p className='text-slate-300'>Learn more about our teams and job openings.</p>
          <button className='border border-indigo-500 rounded-lg px-8 py-4 text-sm bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
