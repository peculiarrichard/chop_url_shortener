"use client";

import React, {useContext, useState} from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import { auth } from "@/firebase/config.js";
const Dashboard = () => {
  const appUser = useContext(AuthContext);
  let user:User | null = auth.currentUser;


  //function to track link clicks
  // const trackLinkClick = async (slug: string): Promise<void> => {
  //   const analytics = getAnalytics();
  //   logEvent(analytics, "click", {
  //     content_type: "url",
  //     url: `https://choply.web.app/${slug}`,
  //   });
  // };
  
  if (!appUser) {
    return (
      <p className="w-4/5 m-auto text-base text-center mt-20">
        You are not authorized to view this page. Please{" "}
      </p>
    );
  }
  return (
    <>
    <section className = "w-[100%] bg-[#edf2f7] ml-[15rem]">
      <div>
        <h1>Hi, {user?.displayName}</h1>
      </div>
    </section>
    </>

  );
};

export default Dashboard;
