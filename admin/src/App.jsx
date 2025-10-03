import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom"
import List from "./pages/List.jsx"
import Add from "./pages/Add.jsx"
import Orders from "./pages/Orders.jsx"
import { useEffect, useState } from "react"
import Login from "./components/Login.jsx"
 import { ToastContainer} from 'react-toastify';


export const backend_url = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className='min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login  setToken = {setToken}/>
        :
        <>
          <Navbar setToken={setToken}/>
          <div className='w-full flex'>
            <Sidebar />
            <div className="w-[70%] mx-auto ml-max[max(5vw, 25px)] my-8 text-white text-base">
              <Routes>
                <Route path='/add' element={<Add token={token}/>} />
                <Route path='/list' element={<List token={token}/>} />
                <Route path='/orders' element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
