"use client";
import React, { useState, useContext } from "react";
import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "@/context/AuthContext";
import Head from "next/head";
import Nav from "@/components/Nav";
import LoadingButton from "@/components/LoadingButton";

const ResetPassword: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handlePasswordRest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("an email has been sent to your email inbox!");
      } catch (error: any) {
        setLoading(false);
        const { code, message } = error;
        console.error(code, message);
      }
    }
    setLoading(false);
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
      <Nav></Nav>
      <div className="flex flex-col w-[90%] m-auto justify-center items-center my-10">
        <p className="text-base mb-4">
          Enter your details to reset your password:
        </p>
        <form
          onSubmit={handlePasswordRest}
          className="flex flex-col w-full md:w-1/2 mx-auto">
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
              onChange={(e) => setEmail(e.target.value)}></input>
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:border-green hover:shadow-3xl hover:scale-105 duration-300 ">
            Reset Password
            {loading ? <LoadingButton /> : null}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
