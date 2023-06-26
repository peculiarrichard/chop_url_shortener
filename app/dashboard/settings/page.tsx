'use client'
import React,{useState, useContext} from 'react'
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import {auth } from "@/firebase/config.js";

const Settings = () => {
  const appUser = useContext(AuthContext);
  let user: User | null = auth.currentUser;

  if (!appUser) {
    return (
      <p className="w-4/5 m-auto text-base text-center mt-20">
        You are not authorized to view this page. Please{" "}
      </p>
    );
  }
  
  return (
    <>
    <section className="w-full lg:w-[85%] ml-[15rem] box-border p-4 text-[#2e4457] flex flex-col space-y-4 h-full">
      <h1 className="text-xl font-extrabold "> Profile</h1>
      <h1 className="text-base font-semibold "> Display Name</h1>
      <p className='text-sm p-2 border rounded'>{user?.displayName}</p>
      <h1 className="text-base font-semibold mt-4"> Email Address</h1>
      <p className='text-sm p-2 border rounded'>{user?.email}</p>
      <h1 className="text-xl font-extrabold mt-10 ">Security</h1>
      <h1 className="text-base font-semibold "> Change Password</h1>
      <p className='text-sm'>You will be required to sign in after changing your password</p>
      <div>
        <form className='flex flex-col items-start'>
          <label htmlFor='oldPassword' className='text-sm font-semibold'>
            Enter current password: <br></br>
            <input
            type='text'
            className='border h-12 rounded'></input>
          </label>
          <label htmlFor='newPassword' className='text-sm mt-4 font-semibold'>
            Enter new password: <br></br>
            <input
            type='text'
            className='border h-12 rounded'></input>
          </label>
          <button className='mt-4 p-3 border bg-blue-600 text-white rounded-lg'>Change password</button>
        </form>
      </div>
    </section>
    </>
  )
}

export default Settings