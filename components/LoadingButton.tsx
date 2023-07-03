import React from "react";

const LoadingButton = () => {
  return (
    <>
      <div className="grid justify-center items-center">
        <div className="w-[30px] h-[30px] border-[10px] border-blue-500 rounded-full border-t-8 border-t-white animate-spinner"></div>
      </div>
    </>
  );
};

export default LoadingButton;
