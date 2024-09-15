import React from 'react'
import image from "./img/admin.avif"

function AdminDashboard() {
  return (
    <>
      <div className='w-full h-screen bg-[#111827]'>
        {/* <h1 className='p-5 text-white text-xl font-bold'>Admin Dashboard</h1> */}
        <div className='flex justify-center'>
          <div className='mt-5 border-2 border-white p-5 rounded-md'>
            <h2 className='text-white text-xl'>Welcome to the Flight India Admin Dashboard!</h2>
          </div>
        </div>
        <div> 
          <div className= "pt-3 pl-3">
            <div className='Image w-52 h-auto rounded-lg border-2 border-red-500 '>
            <img className='rounded-lg' src={image} alt="" />
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default AdminDashboard