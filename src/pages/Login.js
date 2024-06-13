import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import {  RiEyeCloseLine } from "react-icons/ri";

import { IoLockClosedOutline } from "react-icons/io5";
import SummaryApi from "../common";
import {  toast } from 'react-toastify';
import Context from "../context";
const Login = () => {
    const [showPassword, setShowPassword] = useState(true);
    const navigate= useNavigate()
    // const generalContext= useContext(Context);
    const { fetchUserDetails } = useContext(Context)
    // console.log('general contextr:',generalContext.fetchUserDetails())

    const [data, setData] = useState({
        email: "",
        password: "",
    });



    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

 
    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            // fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login", data);
    return (
        <section id="login">
            <div className="mx-auto container p-4 pt-16">
                {/* bg-slate-100 */}
                <div className=" bg-white p-5 w-full max-w-sm mx-auto rounded">
                    <div className="mx-auto block w-fit">
                        {/* <img src={loginIcons} alt='login icon' /> */}
                        <div className="text-7xl text-red-600">
                            <FaRegUser />
                            {/* <FaUser/>
                        <RiUserFill/>
                        <CiUser/> */}
                        </div>
                    </div>
                    <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Email:</label>
                            <div className="bg-slate-100 p-2 flex justify-start items-center ">
                                <div className="">
                                    <FaRegUser />
                                </div>
                                <input
                                    value={data.email || ""}
                                    onChange={handleOnChange}
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    className="w-fill h-full outline-none bg-transparent ml-4"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className="bg-slate-100 p-2 flex justify-start items-center  ">
                                <div className="">
                                    <IoLockClosedOutline />
                                </div>
                                <input
                                    value={data.password || ""}
                                    name="password"
                                    onChange={handleOnChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    className="w-full h-full outline-none bg-transparent ml-4"
                                />
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setShowPassword((preve) => !preve)}
                                >
                                    <span>{showPassword ? <FaEye /> : <RiEyeCloseLine />}</span>
                                </div>
                            </div>
                        

                            <Link
                                to={"/forgot-password"}
                                className="hover:text-red-600 block w-fit ml-auto hover:underline"
                            >
                                Forgot Password
                            </Link>
                        </div>
                        <button className="bg-red-600 text-white px-6 w-full py-2 max-w-[150px] mt-2 rounded-full  hover:bg-red-700 hover:scale-110 transition-all  mx-auto block ">
                            Login
                        </button>
                    </form>
                    <p className="my-2">
                        Don't have an account?{" "}
                        <Link
                            to={"/sign-up"}
                            className="text-red-500 hover:text-red-700 transition-all"
                        >
                            Sign up
                        </Link>{" "}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
