import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const cartTotal = () => {

    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext)
  return (
    <div className='w-full'>
       <div className='text-2xl'>
         <Title text1 ={"CART"} text2 = {"TOTALS"}/>
       </div>

       <div className='flex flex-col gap-2 mt-2 text-sm'>
          <div className="flex justify-between text-white">
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}.00</p>
          </div>

          <hr className ='border-t border-indigo-500'/>
          <div className="flex justify-between text-white">
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
          </div>

          <hr className ='border-t border-indigo-500'/>
          <div className="flex justify-between text-white">
            <p >Total</p>
            <p >{currency}{getCartAmount() === 0? 0 : getCartAmount() + delivery_fee}.00</p>
          </div>

       </div>
    </div>
  )
}

export default cartTotal
