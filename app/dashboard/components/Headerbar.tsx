"use client";
import React, { useContext, useState } from "react";
import { auth } from "@/firebase/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, signOut } from "firebase/auth";
import { BsChevronDown } from "react-icons/bs";
import profilephoto from "/public/assests/profilephoto.png";
import Link from "next/link";

const Headerbar: React.FC<{ toggleSidebar: () => void; isOpen: boolean }> = ({
  toggleSidebar,
  isOpen,
}) => {
  const user: User | null = auth.currentUser;
  const router = useRouter();
  const [active, setActive] = useState<boolean>(false);

  const dropDown = () => {
    setActive(!active);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <>
      <nav className="top-0 z-50 sticky bg-white shadow-lg w-full border-2">
        <div className="flex justify-between items-center relative h-20 w-[95%] mx-auto text-[0.8rem]">
          <button className="lg:hidden" onClick={toggleSidebar}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            )}
          </button>
          <Link
            href="/"
            className="text-[#005AE2] font-bold text-base lg:text-xl italic lg:tracking-widest hidden sm:flex">
            Chop
          </Link>
          <h1 className="w-[45%] font-bold text-[0.7rem] md:text-base lg:text-xl">
            Welcome, {user?.displayName}
          </h1>
          <div className="flex lg:space-x-6">
            <button className=" hidden lg:block p-2 w-32 rounded-lg text-center bg-[#005AE2] text-white font-bold ">
              Upgrade
            </button>
            <button onClick={dropDown} className="">
              <div className="flex items-center justify-center gap-2 lg:gap-3 border-2 border-[#edf2f7] rounded-lg p-1 lg:p-2">
                <Image
                  src={user?.photoURL ? user.photoURL : profilephoto}
                  width={40}
                  height={40}
                  alt="user-image"
                  className="rounded-full"></Image>
                <p className="hidden lg:flex">{user?.displayName}</p>
                <BsChevronDown></BsChevronDown>
              </div>
            </button>
            {active ? (
              <div className="flex flex-col absolute mt-16 bg-white lg:w-[20rem] border shadow-xl py-4 space-y-6 rounded lg:-ml-0 -ml-40">
                <div className="border-b-2 p-3">
                  <p className="text-sm font-semibold">{user?.displayName}</p>
                  <p>{user?.email}</p>
                </div>
                <p className="border-b-2 p-3">
                  User: {user?.uid} <br></br>Free account
                </p>
                <p className="border-b-2 p-3">
                  {user?.emailVerified
                    ? "You are a verified user"
                    : "Not Verified yet, check your email to verify your account"}
                </p>
                <button className="border-2 border-blue-200 self-center p-3 rounded-lg hover:bg-slate-300">
                  Upgrade
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-blue-200 p-4 rounded-lg self-center font-bold hover:bg-slate-400 hover:text-white">
                  Sign Out
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Headerbar;
