import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  const user = useSelector(state => state?.user?.user);
  return (
    <div className=' min-h-[calc(100vh-120px)] md:flex  hidden border-t-2= border-slate-300'>

      <aside className='bg-white min-h-full w-full max-w-60 custom-shadow'>
        <div className='h-32  flex justify-center items-center flex-col'> 
          <div className='text-8xl cursor-pointer relative flex justify-center' >

            {user ? (<img src={user.profile_pic} className=' h-20 w-20 rounded-full border-2 border-gray-300 ' alt={user?.name} />) : (
              <FaRegUserCircle  className='text-white'/>)}
          </div>
          <p className='capitalize text-lg font-semibold'> {user?.name}</p>
          <p className='text-sm'> {user?.role}</p>

        </div>
        {/* navigaton section */}
        <div>
          <nav className="grid p-4" >
            <Link to={'all-products'} class="px-2 py-1 hover:bg-slate-100">All Products</Link>
            <Link to={'all-user'} class="px-2 py-1 hover:bg-slate-100">Users</Link>
            <Link to={'analyze'} class="px-2 py-1 hover:bg-slate-100">Analyze</Link>
            <Link to={'upload-images'} class="px-2 py-1 hover:bg-slate-100">Upload Images</Link>
          </nav>
        </div>

      </aside>
      <main className='w-full h-full p-2'>
   
          <Outlet/>
        
      </main>
    </div>
  )
}

export default AdminPage