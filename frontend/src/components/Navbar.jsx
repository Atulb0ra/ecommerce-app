import  { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Auth from './Auth.jsx'
const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems}= useContext(ShopContext);
  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  }
  
  return (
    <div className='flex flex-col'>
    <div className='w-[100%] flex bg-[#192134] items-center justify-between pl-7 pr-7 py-5 font-medium'>
      <Link to='/'><img src={assets.logo_grabzio} className="w-30" alt="" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-white items-center'>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-white hidden' />
        </NavLink>


        <Link to='https://ecommerce-app-admin-sand.vercel.app/'><button className='bg-[#27344F] text-white text-l px-4 py-2 rounded-xl'>admin</button></Link>
      </ul>

      <div className='flex items-center gap-6'>
        <Link to='/collection'><img onClick = {() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer invert' alt="" /></Link>

        <div className='group relative'>
          <img onClick = {() => token ? null : navigate('/login')} className='w-5 cursor-pointer invert' src={assets.profile_icon} alt="" />

          {/* DropDown */}

          {token && 
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick = {() => navigate('/orders')}className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick = {logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
        </div>

        <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5 invert' alt=""/>
            <p className = 'absolute right-[-5px] bottom-[-5px] w-4 leading-4 text-center bg-white text-black font-extrabold aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>


        <img onClick= {() => setVisible(true)} src={assets.menu_icon} className='w-5 sm:hidden cursor-pointer invert' alt="" />
      </div>

      {/* Sidebar menu for small screen */}
      <div className ={`absolute top-0 right-0 bottom-0 overflow-hidden bg-[#1D283A] transition-all ${visible ? 'w-full' : 'w-0'} cursor-pointer`}>
        <div className="flex flex-col text-white">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className ='py-2 pl-6 border'to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className ='py-2 pl-6 border'to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className ='py-2 pl-6 border'to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className ='py-2 pl-6 border'to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>

    <hr className='border-t border-indigo-500'/>
  </div>
  )
}

export default Navbar
