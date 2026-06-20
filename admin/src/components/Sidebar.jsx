import { CircleCheck, CirclePlus, List } from 'lucide-react'
import React from 'react'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-gray-300 border-r-2 '>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] '>
        <NavLink to="/add" className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l`} >
            <CirclePlus />
            <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink to="/list" className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l`} >
            <List />
            <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink to="/orders" className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l`} >
            <CircleCheck />
            <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
