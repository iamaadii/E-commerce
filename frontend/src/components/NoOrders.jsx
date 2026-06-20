import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoOrders = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-7xl">🛍️</div>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        No Orders Yet
      </h2>

      <p className="mt-2 text-gray-500 text-center max-w-md">
        Looks like you haven't placed any orders yet.
        Start shopping and your orders will appear here.
      </p>

      <button
        onClick={() => navigate('/collection')}
        className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        START SHOPPING
      </button>
    </div>
  )
}

export default NoOrders