import React, { use, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { razorpay_icon, stripe_icon } from '../assets/asset';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const [method, setMethod] = useState("cod");

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      const initPay = (order) => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Order Payment',
          description: 'Order Payment',
          order_id: order.id,
          receipt: order.receipt,
          handler: async (response) => {
            try{
              const {data} = await axios.post(backendUrl+'/api/order/verifyRazorpay',response,{headers:{token}})
              if(data.success){
                navigate('/orders');
                setCartItems({});
              }
              else{
                navigate('/cart')
              }
            }
            catch(error){
              console.log(error)
              toast.error(error.message)
            }
          }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()

      }

      switch (method) {
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          console.log(response)
          if (response.data.success) {
            toast.success(response.data.message)
            setCartItems({})
            navigate('/orders')
          }
          else {
            toast.error(response.data.message)
          }
          break;
        }

        case 'razorpay': {
          const response = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          console.log(response)
          if (response.data.success) {
            initPay(response.data.order)
          }

          break;
        }

        default:
          break;
      }

    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t  border-gray-300">

      {/* ---------- Left Side ---------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
            required
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
            required
            placeholder="Last name"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
          required
          placeholder="Email address"
        />

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
          required
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
            required
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
            required
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            name='zipcode'
            value={formData.zipcode}
            onChange={onChangeHandler}
            required
            placeholder="Zipcode"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
            required
            placeholder="Country"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
          required
          placeholder="Phone"
        />
      </div>


      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ---------- Payment Method Selection ---------- */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200">
              <p className={`min-w-3.5 h-3.5  border-gray-500 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
              <img className="h-5 mx-4" src={stripe_icon} alt="Stripe" />
            </div>

            <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-200">
              <p className={`min-w-3.5 h-3.5  border-gray-500 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={razorpay_icon} alt="Stripe" />
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border-gray-200 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-500  rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>

      </div>

    </form>
  );
}

export default PlaceOrder
