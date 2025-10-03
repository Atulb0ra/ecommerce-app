
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-indigo-500'>
      <div className='flex flex-col pt-6 gap-4 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-indigo-500 border-r-0 px-3 py-2 rounded-l' to ='/add'>
           <img className='invert w-5 h-5' src={assets.add_icon}/>
           <p className='text-white hidden md:block'> Add Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-indigo-500 border-r-0 px-3 py-2 rounded-l' to ='/list'>
           <img className='invert w-5 h-5' src={assets.order_icon}/>
           <p className='text-white hidden md:block'> List Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-indigo-500 border-r-0 px-3 py-2 rounded-l' to ='/orders'>
           <img className='invert w-5 h-5' src={assets.order_icon}/>
           <p className='text-white hidden md:block'> Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
