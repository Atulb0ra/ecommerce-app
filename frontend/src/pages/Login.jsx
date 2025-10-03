import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

   const [currentState, setCurrentState] = useState("Login");
   const { token, setToken, navigate, backend_url } = useContext(ShopContext);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");


   const onSubmitHandler = async (e) => {
      e.preventDefault()
      try {
         if (currentState === 'Sign Up') {
            const response = await axios.post(backend_url + '/api/user/register', {name,email,password});
            // console.log(response.data);
            if(response.data.success){
               setToken(response.data.token);
               localStorage.setItem('token' , response.data.token)
            }
            else{
               toast.error(response.data.message);
            }
         }
         else {
            const response = await axios.post(backend_url + '/api/user/login', {email,password});
            console.log(response.data);
            if(response.data.success){
               setToken(response.data.token);
               localStorage.setItem('token' , response.data.token)
            }
            else{
               toast.error(response.data.message);
            }
         }
      }
      catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

   useEffect(()=>{
      if(token){
         navigate('/')
      }
   },[token])


   return (
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black'>
         <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl text-indigo-500'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-indigo-500' />
         </div>
         {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border text-white border-indigo-500' placeholder='Name' required />}
         <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border text-white border-indigo-500' placeholder='Email' required />
         <input onChange={(e) => setPassword(e.target.value)} value={password} type="passowrd" className='w-full px-3 py-2 border text-white border-indigo-500' placeholder='Password' required />
         <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer text-white'>forgot your password?</p>
            {
               currentState === 'Login'
                  ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-white'>Create Account</p>
                  : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-white'>Login Here</p>
            }
         </div>

         <button className='bg-indigo-500 text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? "Sign In" : "Sign Up"}</button>
      </form>
   )
}

export default Login
