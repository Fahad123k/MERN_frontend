// src/pages/NotFound.jsx
import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const NotFound = () => {
    return (
        <div className='flex flex-col min-h-[calc(100vh-120px)] justify-center items-center text-center'>
            <AiOutlineExclamationCircle className='text-red-400 text-6xl mb-4' />
            <h1 className='text-red-400 text-4xl'>404 - Not Found</h1>
            <p className='text-lg mt-4'>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;

