import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import {toast} from 'react-toastify'


const PlaceOrder = () => {

  
  const [method, setMethod] = useState('cod');
  const {navigate, backend_url, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName :"",
    lastName:'',
    email: '',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name] : value}))
  }

  const onSubmitHandler = async(e) =>{
    e.preventDefault()
    try {
       let orderItems = [];
       for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id == items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
       }
      //  console.log(orderItems)


      let orderData = {
        address : formData,
        items: orderItems,
        amount : getCartAmount() + delivery_fee
      }

      switch (method){
        // api calls for cod order
        case 'cod':
          const response = await axios.post(backend_url + '/api/order/place', orderData, {headers : {token}})
          // console.log(response.data)
          if(response.data.success){
            setCartItems({});
            navigate('/orders')
          }
          else{
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backend_url + '/api/order/stripe', orderData, {headers : {token}})
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url);
          }
          else{
            toast.error(responseStripe.data.message);
          }
          break;
        
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit = {onSubmitHandler} className='flex flex-col sm:flex-row gap-4 min-h-[80vh] pt-5 sm:pt-14 justify-between'>

      {/* left side */}
      <div className='bg-[#27344F] p-6  py-8 rounded-2xl border border-indigo-500'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3 ">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName}type="text" placeholder='Last Name' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email aaddress' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
        <div className="flex gap-3"> 
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
          <input  required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zipcode' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="text" placeholder='number' className='border border-indigo-500 px-3.5 py-1.5 w-full rounded text-slate-300' />
      </div>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
           <Title text1={'PAYMENT'} text2={'METHODS'}/>
           {/* text payment methods */}
           <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick = {() => setMethod('stripe')} className="flex items-center gap-3 border bg-[#27344F]  border-indigo-500 p-2 px-3 cursor-pointer rounded-xl">
                 <p className={`min-w-3.5 h-3.5 border border-white rounded-full ${method === 'stripe' ? 'bg-green-300' : ''}`}></p>
                 <img className='h-5 mx-4' src={assets.stripe_logo} alt=''/>
              </div>
              {/* <div onClick = {() => setMethod('razorpay')} className="flex items-center border bg-slate-500 border-indigo-500 gap-3 p-2 px-3 cursor-pointer rounded-xl">
                 <p className={`border border-white h-3.5 min-w-3.5 rounded-full ${method === 'razorpay' ? 'bg-red-700' : ''}`}></p>
                 <img className='h-5 mx-4' src={assets.razorpay_logo} alt=''/>
              </div> */}
              <div onClick = {() => setMethod('cod')} className="flex items-center border bg-[#27344F] border-indigo-500 gap-3 p-2 px-3 cursor-pointer rounded-xl">
                 <p className={`border border-white h-3.5 min-w-3.5 rounded-full ${method === 'cod' ? 'bg-green-300' : ''}`}></p>
                 <p className='text-slate-300 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
           </div>

           <div className='w-full text-end mt-8'>
              <button type='submit' className='border border-indigo-500 rounded-lg px-8 py-4 text-sm bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all duration-500'>PLACE ORDER</button>
           </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
