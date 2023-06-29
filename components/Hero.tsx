import Link from "next/link";
import React from "react";
import Image from "next/image";
import dashboard from "@/assests/dashboard.png";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 w-[90%] m-auto justify-center items-center text-center mt-10 text-[#2e4457]">
        <h1 className="text-lg md:text-xl lg:text-3xl font-bold capitalize">
          Optimize your online experience with our
        </h1>
        <h1 className="text-lg md:text-xl lg:text-3xl font-bold capitalize">
          Advanced <span className="text-blue-600">Url Shortening</span>{" "}
          Solution
        </h1>
        <p className="text-center text-sm md:text-base lg:w-1/2">
          {" "}
          Personalize your shortened URLs to align with your brand identity.
          Utilize custom slugs, branded links, and domain customization options
          to reinforce your brand presence and enhance user engagement.
        </p>
        <Link
          href="/signup"
          className="text-sm md:text-base p-3 md:p-4 bg-blue-600 text-white rounded-2xl border-none hover:shadow-xl hover:scale-105 duration-300">
          Get Started
        </Link>
        <Image src={dashboard} alt="heroimg"></Image>
      </div>
    </>
  );
};

export default Hero;
