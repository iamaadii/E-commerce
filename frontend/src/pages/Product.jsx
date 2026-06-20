import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { star_dull_icon, star_icon } from '../assets/asset';
import RelatedProduct from '../components/RelatedProduct';
import Title from '../components/Title';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductData = () => {
    const product = products.find(
      (item) => item._id === productId
    );

    if (product) {
      console.log(product)
      setProductData(product);
      console.log(product.images)
      setImage(product.images[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  useEffect(() => {
    setSize('');
    setActiveTab('description');
    window.scrollTo(0, 0);
  }, [productId]);

  return productData ? (
    <div className='border-t-2 pt-10 border-gray-300  transition-opacity ease-in duration-500 opacity-100'>

      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>


        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full  '>
            {
              productData.images.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' alt='' />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%] '>
            <img src={image} alt='' className='w-full h-auto ' />
          </div>

        </div>


        {/* Product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={star_icon} alt="" className='w-3 5' />
            <img src={star_icon} alt="" className='w-3 5' />
            <img src={star_icon} alt="" className='w-3 5' />
            <img src={star_icon} alt="" className='w-3 5' />
            <img src={star_dull_icon} alt="" className='w-3 5' />
            <p className='pl-2'>(22)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price} </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description} </p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((sz, index) => (
                <button onClick={() => setSize(sz)} className={`border py-2 px-4 bg-gray-100 ${sz === size ? 'border-orange-400' : ''}`} key={index} >{sz}</button>
              ))}
            </div>
          </div>

          <button onClick={()=>addToCart(productId,size)} className='bg-black text-white  px-8 py-3 text-sm active:bg-gray-700'> ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 border-gray-300 ' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>


      {/* Description & review Section */}
      <div className='mt-20 '>

        <div className='flex'>
          <p onClick={() => setActiveTab("description")} className={`border border-gray-300 px-5 py-3 cursor-pointer ${activeTab === "description" ? "bg-gray-100 font-medium" : ""
            }`} >Description</p>

          <p onClick={() => setActiveTab("reviews")} className={`border border-gray-300 px-5 py-3 cursor-pointer ${activeTab === "reviews" ? "bg-gray-100 font-medium" : ""
            }`}>Reviews (22)</p>
        </div>

        <div className='flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-500'>
          {activeTab === "description" ? (
            <div className='flex flex-col gap-4'>
              <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
              <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
              </p>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              <p>⭐⭐⭐⭐⭐ Great quality product!</p>
              <p>⭐⭐⭐⭐ Nice fit and fast delivery.</p>
              <p>⭐⭐⭐⭐⭐ Worth the price.</p>
            </div>
          )}
        </div>
      </div>



      {/* Related Product */}
      <RelatedProduct id={productData._id} category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
