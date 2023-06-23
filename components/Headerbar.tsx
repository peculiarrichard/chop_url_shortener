"use client";
import React, { useContext, useState } from "react";
import { auth } from "@/firebase/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, signOut } from "firebase/auth";
import { BsChevronDown } from "react-icons/bs";
import profilephoto from '../assests/profilephoto.png'
import Link from "next/link";

const Headerbar: React.FC = () => {
  const user: User | null = auth.currentUser;
  const router = useRouter();
  const [active, setActive] = useState(false);

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
    <section className="top-0 z-50 sticky bg-white shadow-lg">
      <div className="flex justify-between items-center relative h-20 w-[95%] mx-auto text-[0.8rem]">
        <Link href='/' className="text-[#005AE2] font-bold text-xl italic tracking-widest">Chop</Link>
        <h1 className="font-bold text-xl">Welcome, {user?.displayName}</h1>
        <div className="flex space-x-6">
        <button className="p-2 w-40 rounded-lg bg-[#005AE2] text-white font-bold ">Upgrade</button>
        <button onClick={dropDown} className="">
          <div className="flex items-center justify-center gap-3 border-2 border-[#edf2f7] rounded-lg p-2">
            <Image src={user?.photoURL? user.photoURL: profilephoto} width={40} height={40} alt="user-image" className="rounded-full"></Image>
            <p>{user?.displayName}</p>
            <BsChevronDown></BsChevronDown>
          </div>
        
        {active ? (
            <div className="flex flex-col absolute mt-2 bg-white w-[15rem] border shadow-xl py-4 space-y-6 rounded">
              <div className="border-b-2 p-3">
                <p className="text-sm font-semibold">{user?.displayName}</p>
                <p>{user?.email}</p>
              </div>
              <p className="border-b-2 p-3">User: {user?.uid} <br></br>Free account</p>
              <p className="border-b-2 p-3">{user?.emailVerified? "You are a verified user" : "Not Verified yet, check your email to verify your account"}</p>
              <button className="border-2 border-blue-200 self-center p-3 rounded-lg hover:bg-slate-300">Upgrade</button>
              <button onClick={handleSignOut} className="bg-blue-200 p-4 rounded-lg self-center font-bold hover:bg-slate-400 hover:text-white">Sign Out</button>
            </div>
          ) : ('')}
          </button>
        </div>
      </div>
      </section>
    </>
  );
};

export default Headerbar;
