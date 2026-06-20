import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const { getCartAmount, delivery_fee, currency } = useContext(ShopContext)

    const cartAmount = getCartAmount()
    const shippingFee = cartAmount > 0 ? delivery_fee : 0
    const totalAmount = cartAmount + shippingFee

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {cartAmount.toFixed(2)}</p>
                </div>

                <hr className='border-gray-300' />

                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {shippingFee.toFixed(2)}</p>
                </div>

                <hr className='border-gray-300' />

                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {totalAmount.toFixed(2)}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal