import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((product) => (product.bestseller == true))
        setBestSeller(bestProduct)
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600  '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione laudantium facere officiis nulla amet provident non expedita at, nam id nihil sint neque earum maxime iste nostrum quia sit aut?
                </p>
            </div>


            {/* {rendering products} */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((product) => (
                        <ProductItem
                            key={product._id}
                            id={product._id}
                            images={product.images}
                            name={product.name}
                            price={product.price}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
