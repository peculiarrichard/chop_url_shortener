import React, { useState, useContext } from "react";
import { auth } from "@/firebase/config";
import {sendPasswordResetEmail} from "firebase/auth";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";


const ResetPassword = () => {
    
const { currentUser } = useContext(AuthContext);
 const [email, setEmail] = useState<string>("");
const handlePasswordRest = async () => {
    if (currentUser) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("an email has been sent to your inbox!");
      } catch (error: any) {
        const { code, message } = error;
        console.error(code, message);
      }
    }
    setEmail("");
  };
  return (
      <>
      
      </>
  )
};

export default ResetPassword