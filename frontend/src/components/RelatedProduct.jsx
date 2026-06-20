import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProduct = ({ id, category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter(
                (product) =>
                    product.category === category &&
                    product.subCategory === subCategory &&
                    product._id !== id
            );
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory, id]);

    return related.length > 0 ? (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((product) => (
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
    ) : ""
}

export default RelatedProduct
