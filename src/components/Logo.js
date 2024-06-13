import React from "react";

const Logo = ({ w, h }) => {
  return (
    <div className={`flex flex-col items-start justify-center  p-4 rounded-lg`} style={{ height: h, width: w }}>
      <p className="text-1xl font-bold text-black">Dynamic Content Delivery</p>
      <p className=" text-gray-600" style={{fontSize:'0.5rem'}} >connecting web apps</p>
    </div>
  );
};

export default Logo;
