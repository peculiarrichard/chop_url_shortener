"use client";

import React, {useContext, useEffect} from "react";
import { db, storage, auth } from "@/firebase/config.js";
import { getAnalytics, logEvent } from "firebase/analytics";
import { doc, collection, setDoc, getDoc, Timestamp } from "firebase/firestore";
import QRCode from "qrcode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import Loading from "../loading";

const CustomShortLinks = () => {
    let user: User | null = auth.currentUser;
    const appUser = useContext(AuthContext);
    const customCollection = collection(db, "customShortUrls");

     const customUrl = async (
    longUrl: string,
    customSlug: string
  ): Promise<string> => {
    let slug = customSlug;
    try {
      const customDocRef = doc(customCollection, slug);
      const existingCustomUrls = await getDoc(customDocRef);

      if (existingCustomUrls.exists()) {
        throw new Error(`slug ${slug} already exists`);
      }
      await setDoc(customDocRef, {
        longUrl,
        shortUrl: `chop.ly/${slug}`,
        createdAt: Timestamp.now(),
        id: slug,
      });
    } catch (error) {
      console.log(error);
    }
    return slug;
  };

  const [url, setUrl] = useState("");
  const [backHalf, setBackHalf] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

   const handleCustomShorten = async () => {
    setLoading(true);
    try {
      const customShortened = await customUrl(url, backHalf);
      setShortUrl(customShortened);
      setLoading(false)
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    const fetchCustomUserLinks = async () => {
      try {
        const response = await fetch(
          `https://us-central1-chop-1256b.cloudfunctions.net/getCustomUserLinks?userId=${user?.uid}`
        );
        if (response.ok) {
          const { links } = await response.json();
          setLinks(links);
        } else {
          // Handle the error case
        }
      } catch (error) {
        // Handle the error case
      }
    };
    fetchCustomUserLinks();
  }, [links]);

  return (
    <>
    <section className = "w-[100%] bg-[#edf2f7] ml-[15rem]">
    <div>
        <input
          type="text"
          placeholder="Enter the original URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter a custom back half"
          value={backHalf}
          onChange={(e) => setBackHalf(e.target.value)}
          required
        />
        <button onClick={handleCustomShorten}>Shorten URL
        {loading? <Loading /> : null}
        </button>
        {shortUrl && (
          <div>
            Shortened URL: <a href={shortUrl}>{shortUrl}</a>
          </div>
        )}
      </div>
      </section>
    </>
  )
}

export default CustomShortLinks