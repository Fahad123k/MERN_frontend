import React, { useEffect, useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";

const ChangeUserRole = ({name,email,role,onClose}) => {

  const [userRole,setUserRole]=useState(role)
  const handleSelect=(e)=>{
    setUserRole(e.target.value);
    // console.log('Role value:',e.target.value)
    console.log('Role value:',e.target.value)
  }


  
  
  return (
    <div 
    className='fixed top-0 bottom-0  rounded-sm  right-0 left-0 h-full  w-full z-10 flex justify-between items-center  '>
      <div className='mx-auto bg-white p-4 w-full shadow-md max-w-sm'>
        <button className='block ml-auto border text-red-500 hover:bg-red-500 hover:text-white' onClick={onClose}>
          <IoCloseSharp/>
        </button>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email :{email}</p>

        <div className='flex items-center justify-between my-4 border-top'>
          <p>Role :</p>

        <select className='py-1 border px-4' value={userRole} onChange={handleSelect}>
        {
          Object.values(ROLE).map(el=>(
            <option value={el} key={el}>{el}</option>
          ))
        }
        </select>
        </div>
    
        <button className='w-fit mx-auto block border py-1 px-3 rounded-md bg-red-600 text-white hover:bg-red-700'>Change Role</button>
        </div>

      </div>
  )
}

export default ChangeUserRole