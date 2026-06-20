import React from 'react'

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl mb-4">📦</div>

      <h2 className="text-2xl font-semibold text-gray-700">
        No Orders Yet
      </h2>

      <p className="text-gray-500 mt-2 text-center max-w-md">
        Orders from customers will appear here once purchases are made.
      </p>
    </div>
  )
}

export default NoOrders