'use client'
import React,{useContext} from 'react'
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
    <div>CustomDomain</div>
  )
}

export default CustomDomain