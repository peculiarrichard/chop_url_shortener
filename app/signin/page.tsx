'use client'

import React, { useContext, useState } from "react";
import Head from "next/head";
import { AuthContext } from "@/context/AuthContext";
import { auth, googleProvider } from "@/firebase/config";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  BsEye,
  BsGoogle,
  BsEyeSlash,
} from "react-icons/bs";
import Link from "next/link";
import { toast } from "react-toastify";

const Login : React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return router.push("/dashboard");
    } catch (error:any) {
      const { code, message } = error;
      if (code === "auth/user-not-found") {
        toast.error("You are not a registered user");
      }
      if (code === "auth/wrong-password") {
        toast.error("Wrong password!");
      }
      console.error(code, message);
    }
    if (currentUser) {
      return router.push("/dashboard");
    }
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const credential: string | any = GoogleAuthProvider.credentialFromResult(result);
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
      toast.error("signin failed");
    }
  };

  

  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <>
      <Head>
        <title>Chop | Sign In</title>
        <meta name="description" content="Sign In to Chop - Url Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-[90%] m-auto justify-center items-center my-10">
        <p className="text-base mb-4">Sign In with:</p>
          
            <button onClick={handleGoogleLogin} className="text-white flex items-center mb-10 hover:scale-110 bg-blue-600 px-4 py-2 rounded-lg">
              <BsGoogle
                size={45}
                color="red"
                className="shadow-lg p-2 rounded-lg hover:scale-110"></BsGoogle>
                Google
            </button>
          
          <div className="flex items-center py-4">
            <div className="flex-grow h-px bg-blue-600"></div>
            <span className="flex-shrink text-lg text-blue-600 px-4 italic font-light">
              or
            </span>
            <div className="flex-grow h-px bg-blue-600"></div>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col w-full md:w-1/2 mx-auto">
            <label htmlFor="email" className="font-hairline">
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
              <label htmlFor="password" className="font-hairline">
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
                  className="absolute top-11 right-7">
                  {passwordShown ? <BsEye></BsEye> : <BsEyeSlash></BsEyeSlash>}
                </button>
              </label>
            </div>
            <label htmlFor="checkbox" className="font-hairline mb-2">
              <input
                className="mr-4 scale-150"
                name="checkbox"
                type="checkbox"
                id="checkbox"
                value="Remember me"
                required
                defaultChecked></input>{" "}
              Save password for next time
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:border-green hover:shadow-3xl hover:scale-105 duration-300 ">
              Login
            </button>
          </form>
          <p className="mt-10 mb-4 text-center">
            {" "}
            Did you forget your email or password?{" "}
            <span>
              <Link
                href='/resetpassword'
                className="text-blue2 font-bold text-blue-600 underline">
                Reset Your Password
              </Link>
            </span>
          </p>
          <p className="mt-10 text-center">
            {" "}
            Don't have an account?{" "}
            <span>
              <Link
                href="/signup"
                className="text-blue2 font-bold text-blue-600 underline">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
    </>
  );
};

export default Login;
