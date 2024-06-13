import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";

import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/signin.gif'

import {  RiEyeCloseLine } from "react-icons/ri";
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';

import {  toast } from 'react-toastify';
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate= useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        profile_pic: "",
    })

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;

    //     setData({
    //         ...data,
    //         [name]: value
    //     })

    // }

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        // console.log("api ",SummaryApi.signUp.url);
        // return 0;
        if (data.password == data.confirm_password) {
            try {
                const dataResponse = await fetch(SummaryApi.signUP.url, {
                    method: SummaryApi.signUP.method,
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                if (!dataResponse.ok) {
                    // throw new Error(`HTTP error! Status: ${dataResponse.status}`);
                    toast.error(`HTTP error! Status: ${dataResponse.status}`)
                }
                try {
                    const dataapi = await dataResponse.json();
                    console.log("data", dataapi);
                    if(dataapi.success){

                        toast.success(dataapi.message)
                        navigate('/login')
                    }
                    
                    if(dataapi.error){
                        toast.error(dataapi.message)

                    }
                    // Handle successful signup, e.g., redirect or show a success message
                } catch (jsonError) {
                    // Handle JSON parsing error
                    // console.error("Error parsing JSON:", jsonError);
                    const responseText = await dataResponse.text();
                    // console.error("Response text:", responseText);
                    toast.error("There was an error processing the response from the server.:", responseText)
                    // alert("There was an error processing the response from the server.");
                }

            } catch (error) {
                // console.error('There was a problem with the fetch operation:', error);
                toast.error('There was a problem with the fetch operation:', error)

            }


        } else {
            // console.log("password and confirm password should be matched");
            toast.error('Password and confirm password should be matched')
            
        }
    }

    const handleUploadPic = async (e) => {

        const file = e.target.files[0];
        const imagePic = await imageTobase64(file);

        setData((preve) => {
            return {
                ...preve,
                profile_pic: imagePic
            }
        })
        // console.log('file is =',imagePic);

    }

    console.log("data login", data)

    return (
        <section id='signup'>

            <div className='mx-auto container p-4 pt-16'>
                {/* bg-slate-100 */}
                <div className=' bg-white p-5 w-full max-w-sm mx-auto '>

                    <div className='mx-auto h-20 w-20 relative  rounded-full overflow-hidden' >

                        <div>
                            <img src={data.profile_pic || loginIcons} alt='login icon' />
                        </div>
                        <div>
                            <form>
                                <label>

                                    <div className='text-center bg-slate-400 pb-4 pt-2  absolute text-xs bottom-0 w-full bg-opacity-80'>
                                        upload Photo
                                    </div>
                                    <input type='file' className='hidden' onChange={handleUploadPic} />
                                </label>
                            </form>

                            {/* <div className='text-7xl text-red-600 mx-auto   '>

                            <FaRegUser />
                      
                        </div> */}


                        </div>

                    </div>
                    <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>

                        <div className=''>
                            <label>Name:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    value={data.name || ""} onChange={handleOnChange}
                                    name="name"
                                    type='text'
                                    placeholder='enter name'
                                    required
                                    className='w-fill h-full outline-none bg-transparent' />
                            </div>


                        </div>
                        <div className=''>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    value={data.email || ""} onChange={handleOnChange}
                                    name="email"
                                    type='email'
                                    placeholder='enter email'
                                    required
                                    className='w-fill h-full outline-none bg-transparent' />
                            </div>


                        </div>

                        <div className=''>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex '>
                                <input
                                    value={data.password || ""}
                                    name="password"
                                    onChange={handleOnChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer' onClick={() => setShowPassword((preve) => !preve)} >
                                    <span>
                                        {showPassword ? <FaEye /> : <RiEyeCloseLine />}

                                    </span>
                                </div>
                            </div>


                        </div>

                        <div className=''>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex '>
                                <input
                                    value={data.confirm_password || ""}
                                    name="confirm_password"
                                    onChange={handleOnChange}
                                    type={"password"}
                                    placeholder='enter confirm password'
                                    required
                                    className='w-full h-full outline-none bg-transparent' />
                                {/* <div className='cursor-pointer' onClick={() => setShowPassword((preve) => !preve)} >
                                    <span>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}

                                    </span>
                                </div> */}
                            </div>


                        </div>
                        <button className='bg-red-600 text-white px-6 w-full py-2 max-w-[150px] mt-4 rounded-full  hover:bg-red-700 hover:scale-110 transition-all  mx-auto block '>Sign Up</button>
                    </form>
                    <p className='my-2'>Already  have an account? <Link to={'/login'} className='text-red-500 hover:text-red-700 transition-all'>Login</Link> </p>
                </div>
            </div>
        </section>
    )
}

export default SignUp