import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const List = ({ token }) => {

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/list`
      );

      console.log(response)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/remove`,
        { id }, {
        headers: { token }
      }
      );

      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])


  return (
    <>
      <p>All products list</p>
      <div className='flex flex-col gap-2 pt-2'>
        <div className='hidden border-gray-200 md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        <div className='flex flex-col gap-2' >
          {
            list.map((item) => (
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm  ' key={item._id}>
                <img className='w-12' src={item.images[0]} alt="" />
                <p> {item.name} </p>
                <p> {item.category} </p>
                <p> ${item.price} </p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-right md:text-center cursor-pointer
             text-red-500 font-bold text-xl
             hover:text-red-700 hover:scale-110
             transition-all duration-200"
                >
                  ✕
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default List
