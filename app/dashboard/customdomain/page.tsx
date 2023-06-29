"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const CustomDomain = () => {
  const appUser = useContext(AuthContext);
  if (!appUser) {
    return (
      <p className="w-4/5 m-auto text-base text-center mt-20">
        You are not authorized to view this page. Please{" "}
      </p>
    );
  }
  return (
    <div className="w-full  lg:w-[85%] lg:ml-[15rem] box-border p-4 text-xl text-[#2e4457]">
      This feature is coming soon. Anticipate!
    </div>
  );
};

export default CustomDomain;
