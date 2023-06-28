"use client";

import React, { useState, useContext } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { User } from "firebase/auth";
import { AuthContext } from "@/context/AuthContext";

interface Feedback {
  name: string;
  email: string;
  comment: string;
}

const Feedback = () => {
  const appUser = useContext(AuthContext);
  let user: User | null = auth.currentUser;
  const feedbackCollection = collection(db, "feedbacks");

  const sendContactForm = async ({ name, email, comment }: Feedback) => {
    try {
      const feedbackInfo = await addDoc(feedbackCollection, {
        name,
        email,
        comment,
        sentAt: Timestamp.now().toDate(),
        user: user?.email,
      });
      return feedbackInfo;
    } catch (err) {
      console.log(err);
    }
  };

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendContactForm({
        name: name,
        email: email,
        comment: feedback,
      });
      if (res) {
        setMessage("We have recieved your message and will be in touch");
      } else {
        setMessage("Something went wrong! Please try again");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
    setEmail("");
    setFeedback("");
    setName("");
  };
  if (!appUser) {
    return (
      <p className="w-4/5 m-auto text-base text-center mt-20">
        You are not authorized to view this page. Please{" "}
      </p>
    );
  }

  return (
    <>
      <section className="w-full ml-[15rem] box-border p-4 text-[#2e4457]">
        <div className="flex flex-col  p-2 sm:mb-4">
          <h3 className=" text-lg font-bold">
            We value your feedback! Let us know if there's an issue you
            encountered or you have Ideas on what we can improve on.
          </h3>
        </div>
        <form className="w-full" onSubmit={submitFeedback}>
          <label htmlFor="name" className="sm:text-[0.8rem] xl:text-ss">
            Name
          </label>
          <br></br>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className=" h-12 border rounded-lg mb-4 px-8"></input>
          <br></br>
          <label htmlFor="email" className=" sm:text-[0.8rem] xl:text-ss">
            Email
          </label>
          <br></br>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" h-12 border rounded-lg mb-4 px-8"></input>
          <br></br>
          <label htmlFor="message" className="sm:text-[0.8rem] xl:text-ss">
            Your feedback
          </label>
          <br></br>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className=" h-20 border rounded-lg mb-4 px-8"></textarea>
          <br></br>
          <button
            type="submit"
            className="text-center rounded-lg border mb-2  hover:shadow-3xl hover:scale-105 duration-300 p-3 text-white bg-blue-600 ">
            Submit
            {loading ? <LoadingSpinner /> : null}
          </button>
        </form>
        <div className="sm: text-lg">
          {message}
          <span onClick={() => setMessage("")}>&times;</span>
        </div>
      </section>
    </>
  );
};

export default Feedback;
