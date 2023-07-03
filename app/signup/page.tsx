"use client";

import React, { useState } from "react";
import Head from "next/head";
import { auth, googleProvider } from "@/firebase/config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { BsEye, BsGoogle, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import Nav from "@/components/Nav";
import LoadingButton from "@/components/LoadingButton";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("account created successfully");
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      await sendEmailVerification(userCredential.user);
      alert("verification email sent");
      return router.push("signin");
    } catch (error: any) {
      setLoading(false);
      const { code, message } = error;
      if (code === "auth/email-already-in-use") {
        alert("Your email address is already in use");
      }
      console.error(code, message);
    }
    setLoading(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const credential: string | any =
        GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      console.log(user, accessToken);
      return router.push("dashboard");
    } catch (error: any) {
      const { code, message, email, credential } = error;
      console.error(code, message, email, credential);
      alert("signin failed");
    }
  };

  const togglePassword = () => {
    setPasswordShown((prevPasswordShown) => !prevPasswordShown);
  };

  return (
    <>
      <Head>
        <title>Chop | Sign Up</title>
        <meta name="description" content="Your best Url Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav></Nav>
      <div className="flex flex-col w-[90%] m-auto justify-center items-center my-10">
        <p className="text-base mb-4">Sign up with:</p>
        <button
          onClick={handleGoogleLogin}
          className="text-white flex items-center mb-10 hover:scale-110 bg-blue-600 px-4 py-2 rounded-lg">
          <BsGoogle
            size={45}
            color="red"
            className="shadow-lg p-2 rounded-lg "></BsGoogle>{" "}
          Google
        </button>
        <div className="flex items-center py-4">
          <div className="flex-grow h-px bg-blue-600"></div>
          <span className="flex-shrink text-lg text-blue-600 px-4 italic font-light">
            or
          </span>
          <div className="flex-grow h-px bg-blue-600"></div>
        </div>
        <form
          onSubmit={handleRegister}
          className="flex flex-col w-full md:w-1/2 mx-auto">
          <label htmlFor="name" className="font-hairline ">
            Name: <br></br>
            <input
              className="w-full shadow-lg h-10 mt-2 text-center text-black rounded-lg mb-6 border border-blue-600"
              name="name"
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}></input>
          </label>
          <label htmlFor="email" className="font-hairline ">
            Email Address: <br></br>
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
          <div className="relative">
            <label htmlFor="password" className="font-hairline ">
              Password: <br></br>
              <input
                className="w-full shadow-lg h-10 mt-2 text-center text-black rounded-lg mb-6 border border-blue-600"
                name="password"
                type={passwordShown ? "text" : "password"}
                id="password"
                placeholder=""
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}></input>
              <button
                onClick={togglePassword}
                className="absolute top-11 right-7 ">
                {passwordShown ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>}
              </button>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:border-green hover:shadow-3xl hover:scale-105 duration-300 ">
            Sign Up
            {loading ? <LoadingButton /> : null}
          </button>
        </form>
        <p className="mt-10 text-center">
          {" "}
          Do you already have an account?{" "}
          <span>
            <Link href="/signin" className="text-blue-600 font-bold underline">
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
