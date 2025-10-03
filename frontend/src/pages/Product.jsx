import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
     products.map((item) => {
       if(item._id === productId){
         setProductData(item);
         setImage(item.image[0]);
        //  console.log(item);
         return null;
       }
     })
  }

  useEffect(() => { 
    fetchProductData();
  },[productId]);

  return productData ?(
    <div className=' pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
       <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>
          {/* Product Images */}
          <div className = 'flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className ='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item, index) =>(
                  <img onClick = {() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' src={item} key ={index} alt =''/>
                ))
              }
            </div>

            <div className='w-full sm:w-[80%]'>
              <img className='w-full' src={image} alt=''/>
            </div>
          </div>

          {/* Product Info */}
          <div className ='flex-1'>
            <h1 className='font-medium text-2xl mt-2 text-white'>{productData.name}</h1>
            <div className='flex items-center mt-2 gap-1'>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_dull_icon} alt="" className='w-3.5'/>
              <p className='pl-2 text-indigo-500'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium text-white'>{currency}{productData.price}</p>
            <p className='text-slate-300 mt-5 w-4/5'>{productData.description}</p>
            <div className='flex flex-col my-8 gap-4 text-indigo-500'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {
                  productData.sizes.map((item, index) => (
                    <button onClick ={() => setSize(item)} className={`bg-gray-100 border py-2 px-4 ${item === size ? 'border-orange-500': ''}`} key={index}>{item}</button>
                  ))
                }
              </div>
            </div>
            <button onClick = {() => addToCart(productData._id, size)} className='border border-indigo-500 rounded-lg px-8 py-4 text-sm bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all duration-500'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5 border-indigo-500
            '/>
            <div className='flex flex-col gap-1 mt-5 text-sm text-slate-300'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
       </div>

       {/* Description and Reviews */}
       <div className='mt-20'>
          <div className='flex'>
            <b className='border border-indigo-500 px-5 py-3 text-sm text-indigo-500'> Dsscription </b>
            <p className='border border-indigo-500 px-5 py-3 text-sm text-indigo-500'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 px-6 py-6 text-sm border border-indigo-500 text-slate-300'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
          </div>
       </div>

       {/* displaying related products */}
       <RelatedProducts category = {productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product
