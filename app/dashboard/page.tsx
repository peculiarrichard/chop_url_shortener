"use client";

import React, { useContext} from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import { auth } from "@/firebase/config.js";
import dashboard from "@/assests/dashboard.png";
import Head from "next/head";
const Dashboard = () => {
  const appUser = useContext(AuthContext);
  let user: User | null = auth.currentUser;

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
    <Head>
        <title>Chop | Dashboard</title>
        <meta name="description" content="Sign In to Chop - Url Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full lg:w-[85%] lg:ml-[15rem] box-border p-4 text-[#2e4457] mx-auto">
        <div className="flex flex-col">
          <h1 className="text-center text-xl ">Hi, {user?.displayName}</h1>
          <p className="text-center mt-6">Welcome to your dashboard!</p>
          <Image src={dashboard} alt="dashboard"></Image>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
