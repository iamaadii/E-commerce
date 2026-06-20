import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { order_box } from '../assets/asset'
import { useState } from 'react'
import NoOrders from '../components/NoOrders'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/list`, {}, { headers: { token } })
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }


  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/status`, { orderId, status: event.target.value }, { headers: { token } })
      console.log(response)
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      {
        orders.length > 0 ?
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Orders Management
              </h1>
              <p className="text-gray-500 text-sm">
                Track and manage customer orders
              </p>
            </div>
            <div>
              {
                orders.map((order) => (
                  <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700  ' key={order._id}>
                    <img className='w-12' src={order_box} alt="" />
                    <div>
                      <div>
                        {
                          order.items.map((item, index) => {
                            if (index === order.items.length - 1) {
                              return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size} </span></p>
                            }
                            else {
                              return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span> {item.size}, </span></p>
                            }
                          })
                        }
                      </div>

                      <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName} </p>
                      <div>
                        <p>{order.address.street + ","}</p>
                        <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                        </p>
                      </div>
                      <p>{order.address.phone}</p>
                    </div>

                    <div className='text-sm sm:text-[15px]'>
                      <p >Items : {order.items.length}</p>
                      <p className='mt-3'>Method : {order.paymentMethod}</p>
                      <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                      <p>Date : {new Date(order.updatedAt
                      ).toLocaleDateString("en-GB")}</p>
                    </div>
                    <p className='text-sm sm:text-[15px]' >${order.amount}</p>
                    <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered" > Delivered</option>
                    </select>

                  </div>
                ))
              }
            </div>
          </> : <NoOrders />
      }
    </div>
  )
}

export default Orders
