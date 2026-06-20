import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        
    }

  return (
    <div className='text-center'>
      <div className='text-2xl font-medium text-gray-800'> Subsribe Now & get 20% off</div>
      <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ullam corrupti ducimus iste facere similique quibusdam error doloribus sapiente molestias nam, tenetur odio dignissimos, ipsum, libero praesentium atque rerum obcaecati!</p>

      <form onSubmit={onSubmitHandler}  className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' >
        <input className='w-full sm:flex-1 outline-none' type='text' placeholder='Enter your Email' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4' >SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
