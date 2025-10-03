import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios, { all } from 'axios';

const Orders = () => {

  const {backend_url, token , currency} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () =>{
    try {
      if(!token){
        return null;
      }

      const response =await axios.post(backend_url + '/api/order/userorders', {}, {headers: {token}});
      // console.log(response.data);
      if(response.data.success){
        let allOrdersItems = []
        response.data.orders.map((order) =>{
          order.items.map((item) =>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItems.push(item)
          })

        })
        // console.log(allOrdersItems)
        setOrderData(allOrdersItems.reverse());
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token])

  return (
    <div className='pt-16 '>
       <div className='text-2xl'>
          <Title text1= {'MY'} text2 ={'ORDERS'}/>
       </div>

       <div>
        {
          orderData.map((item, index) => (
            <div key = {index} className='py-4 border-t border-b text-slate-300 border-indigo-400 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className="flex items-start gap-6 text-sm">
                <img className='w-16 sm:w-20'src={item.image[0]} alt=''/>
                <div>
                  <p className="sm:text-base font-medium">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-base text-slate-500">
                    <p >{currency}{item.price}</p>
                    <p >Quantity : {item.quantity}</p>
                    <p > size : {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: {new Date(item.date).toDateString()}<span className='text-slate-300'></span></p>
                  <p className='mt-1'>payment: {item.paymentMethod}<span className='text-slate-300'></span></p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                  <button onClick={() =>loadOrderData()} className='border border-indigo-500 px-4 py-2 text-sm font-medium rounded-sm text-white'>Track Order</button>
              </div>
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default Orders
