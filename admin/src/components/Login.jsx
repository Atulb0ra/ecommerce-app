import { useState } from 'react'
import { backend_url } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async(e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(backend_url + '/api/user/admin', {email,password});
            if(response.data.success){
                setToken(response.data.token)
            }
            else{
               toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-[#27344F] shadow-md rounded-lg px-8 py-6 max-w-md border border-indigo-500'>
        <h1 className='text-2xl text-indigo-500 font-bold mb-4 text-center'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-white mb-2'>Email Address</p>
                <input onChange={(e) => setEmail(e.target.value)} value = {email} className='placeholder-slate-300 text-white border border-indigo-500 rounded-md w-full px-3 py-2  online-none' type="email" placeholder='your@email.com' required />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-white mb-2'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value = {password} className='placeholder-slate-300 text-white border border-indigo-500 rounded-md w-full px-3 py-2  online-none'type="password" placeholder='Enter your password' required />
            </div>
            <button className='mt-2 w-full px-4 py-2 rounded-md text-white bg-indigo-500' type = 'submit'> Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
