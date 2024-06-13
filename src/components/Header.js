import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaArrowUp, FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';

const Header = () => {
    const [cart, setCart] = useState(2)
    const [menuDisplay, setMenuDisplay] = useState(false)
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const handleLogout = async () => {

        const fetchdata = await fetch(SummaryApi.logout.url, {
            method: SummaryApi.logout.method,
            credentials: 'include'
        })

        const data = await fetchdata.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate('/login')
        }
        if (data.error) {
            toast.error(data.message)
        }

    }

    console.log('user header', user)

    return (
        <header className='h-16 shadow-sm bg-white  z-10'>

            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to={'/'}>
                    <Logo w="300px" h="100px" />
                    </Link>

                </div>
                <div className='hidden lg:flex items-center  w-full justify-between max-w-sm  border-b-2 rounded-full  focus-within:shadow pl-3'>
                    <input type='text' placeholder='search product here...' className='w-full  outline-none' />
                    <div className='tex-lg bg-red-500 w-14 h-9 flex items-center justify-center rounded-r-full text-white'>
                        <GrSearch />
                    </div>
                </div>
                <div className='flex items-center gap-6'>

                    <div className='relative  flex justify-center'>


                        <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>

                            {user ? (<img src={user.profile_pic} className=' h-10 rounded-full border-2 border-gray-300 w-10' alt={user?.name} />) : (
                                <FaRegUserCircle />)}
                        </div>
                        {menuDisplay && (<div className='absolute bg-white bottom-0 top-11 h-fit p-3 rounded l-2 shadow-lg border-b-2  border-slate-400 '>
                          

                            <nav className="flex flex-col ">
                                <Link to={'admin-page'} className='whitespace-nowrap hover:bg-slate-100 md:block hidden'>Admin Panel</Link>
                                <Link to={'admin-page'} className='whitespace-nowrap hover:bg-slate-100 z-0'>Profile</Link>
                                <Link onClick={handleLogout} className='whitespace-nowrap hover:bg-slate-100 z-0'>Logout</Link>
                            </nav>
                        </div>)}


                    </div>



                    <div className='text-2xl relative'>
                        <span>

                            <FaShoppingCart />
                        </span>
                        <div className='bg-red-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2'>
                            <p className='text-sm'>
                                {cart}
                            </p>
                        </div>
                    </div>

                    <div>

                        {user?._id ? (<button onClick={handleLogout} className='bg-red-500 text-white px-3 py-1 rounded-full  hover:bg-red-700 cursor-pointer'>Logout </button>

                        ) : (<Link to={'/login'} className='bg-red-500 text-white px-3 py-1 rounded-full  hover:bg-red-700'>Login

                        </Link>)}


                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header