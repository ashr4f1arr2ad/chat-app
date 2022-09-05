import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-500'>
      <div>
        <h1 className='text-center font-extrabold text-primary text-7xl'>
          Oops, 404 Not Found!
        </h1>
        <p className='text-center font-medium text-blue py-4 text-xl'>
          <Link to='/'> Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;