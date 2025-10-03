import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link className='text-slate-300 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden rounded-2xl">
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt=''/>
      </div>
      <p className='pt-3 pb-1 text-sm text-white' >{name}</p>
      <p className='text-sm font-medium text-white'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
