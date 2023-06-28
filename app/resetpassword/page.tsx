'use client'
import React, { useState, useContext } from "react";
import { auth } from "@/firebase/config";
import {sendPasswordResetEmail} from "firebase/auth";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Head  from "next/head";


const ResetPassword: React.FC = () => {
    
const { currentUser } = useContext(AuthContext);
 const [email, setEmail] = useState<string>("");
const handlePasswordRest = async (e: React.FormEvent) => {
  e.preventDefault()
    if (currentUser) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("an email has been sent to your email inbox!");
      } catch (error: any) {
        const { code, message } = error;
        console.error(code, message);
      }
    }
    setEmail("");
  };
  return (
      <>
      <Head>
        <title>Chop | Reset password</title>
        <meta name="description" content="Your best Url Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-[90%] m-auto justify-center items-center my-10">
        <p className="text-base mb-4">Enter your details to reset your password:</p>
        <form onSubmit={handlePasswordRest} className="flex flex-col w-full md:w-1/2 mx-auto">
          <label htmlFor="email" className="font-hairline ">
              Email address: <br></br>
              <input
                className="w-full shadow-lg h-10 mt-2 text-center text-black rounded-lg mb-6 border border-blue-600"
                name="email"
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:border-green hover:shadow-3xl hover:scale-105 duration-300 "
            >
              Reset Password
            </button>
        </form>
      </div>
      </>
  )
};

export default ResetPassword