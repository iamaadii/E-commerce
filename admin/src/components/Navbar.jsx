import React from 'react'
import { logo } from '../assets/asset'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center justify-between py-4 px-[4%]'>
            <img className="w-[clamp(36px,4vw,52px)] h-auto" src={logo} alt="" />
            <button
                onClick={() => setToken('')}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar
