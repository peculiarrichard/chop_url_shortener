"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-white w-full rounded-b-3xl shadow-xl">
      <div className=" p-2 w-[90%] mx-auto flex md:h-24 sticky justify-between items-center xl:text-base md:text-sm ">
        <Link href="/">
          <p className="text-blue-600 font-extrabold tracking-widest text-sm md:text-lg">
            {" "}
            Chop
          </p>
        </Link>

        <div className="flex space-x-4 text-[0.8rem] md:text-sm">
          <Link href={currentUser ? "/dashboard" : "/signin"}>
            <button className="p-2 md:p-4 border-blue-600 rounded-2xl border hover:shadow-xl hover:scale-105 duration-300">
              {currentUser ? "View Dashboard" : "Sign In"}
            </button>
          </Link>
          <Link href="/signup">
            <button className="p-2 md:p-4 bg-blue-600 text-white rounded-2xl border-none hover:shadow-xl hover:scale-105 duration-300">
              Try for free
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
