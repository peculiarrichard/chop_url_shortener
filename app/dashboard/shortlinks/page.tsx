"use client";
import React, { useContext, useEffect } from "react";
import { db, auth } from "@/firebase/config.js";
import { doc, collection, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { nanoid } from "nanoid";
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import Loading from "../loading";
import Link from "next/link";
const ShortLinks = () => {
  const urlCollection = collection(db, "shortUrls");
  const appUser = useContext(AuthContext);
  let user: User | null = auth.currentUser;

  const isValidUrl = (url: string): boolean => {
    // Regular expression pattern to validate URLs
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    return urlPattern.test(url);
  };

  const shortenUrl = async (longUrl: string, name: string): Promise<string> => {
    let slug = nanoid(4);

    // Validate the URL
    if (!isValidUrl(longUrl) && !longUrl) {
      throw new Error("Invalid URL or Url is required");
    }

    // Validate the name
    if (!name) {
      throw new Error("Link title is required");
    }

    try {
      const docRef = doc(urlCollection, slug);
      const existingUrls = await getDoc(docRef);

      if (existingUrls.exists()) {
        throw new Error(`slug ${slug} already exists`);
      }

      await setDoc(docRef, {
        longUrl,
        shortUrl: `chop.ly/${slug}`,
        createdAt: Timestamp.now(),
        id: slug,
        user: user?.uid,
        name: name,
      });
    } catch (error) {
      console.log(error);
    }
    return slug;
  };

  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const response = await fetch(
          `https://us-central1-chop-1256b.cloudfunctions.net/getUserLinks?userId=${user?.uid}`
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
    fetchUserLinks();
  }, [links]);

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlName, setUrlName] = useState("");

  const handleShorten = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const shortened = await shortenUrl(originalUrl, urlName);
      setShortenedUrl(shortened);
      setUrlName(urlName);
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
      alert(error);
    }
    setLoading(false);
    setUrlName("");
    setOriginalUrl("");
  };

  //function to get click count
  // const [clickCount, setClickCount] = useState(0);
  //   const getClickCount = async (shortLinkId: string) => {
  //   try {
  //     // const shortLinkDocRef = urlCollection.('shorturls').doc(shortLinkId);
  //     const shortLinkDocRef = doc(urlCollection, shortLinkId);
  //     const shortLinkSnapshot = await getDoc(shortLinkDocRef);
  //     if (shortLinkSnapshot.exists()) {
  //       const { clickCount } = shortLinkSnapshot.data();
  //       setClickCount(clickCount);
  //       return clickCount;
  //     }
  //     return 0;
  //   } catch (error) {
  //     console.error('Error fetching click count:', error);
  //     throw error;
  //   }
  // };
  const copyToClipBoard = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('copied')
    } catch (err) {
      alert('failed to copy!')
    }
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
      <section className="w-full lg:ml-[15rem] box-border p-4 text-[#2e4457]">
        <div className="flex flex-col lg:flex-row justify-between border-b py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-center lg:items-center">
            <h1 className="text-xl font-extrabold ">Short Links:</h1>
            <p className="font-semibold">
              Create short links with auto backhalves
            </p>
          </div>
          <Link href='/dashboard/feedback' className="flex gap-2 items-center p-2 border-2 rounded-lg text-[0.8rem] font-semibold hover:bg-[#2e4457] hover:text-white hover:border-none mt-4 lg:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-left-fill"
              viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
            <p>Leave Feedback</p>
          </Link>
        </div>
        <h2 className="mt-6 font-bold">Shorten Url</h2>
        <form
          onSubmit={handleShorten}
          className="flex flex-col items-center border-2 rounded-lg h-full p-3 mt-3">
          <label htmlFor="urlname" className="w-full lg:w-[50%]">
            Name this link: <br></br>
            <input
              type="text"
              placeholder="Title"
              value={urlName}
              onChange={(e) => setUrlName(e.target.value)}
              required
              className="w-full text-center p-4 border border-[#2e4457] rounded"
            />
          </label>
          <label htmlFor="originalurl" className="w-full lg:w-[50%]">
            <input
              type="url"
              placeholder="Paste in the long url here..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="w-full text-center p-4 border border-[#2e4457] rounded mt-4"
            />
          </label>
          <button
            disabled={loading}
            className="p-3 bg-[#005AE2] rounded-lg mt-2 text-white">
            Chop URL
            {loading ? <Loading /> : null}
          </button>
          <p className="mt-2 text-[0.7rem]">
            By clicking Chop URL, I agree with the terms of service, privacy
            policy, and use of cookies.
          </p>
        </form>
        {shortenedUrl && (
          <div>
            <h1>Title: {urlName}</h1>
            Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a>
          </div>
        )}

        <div className="mt-6">
          {links.length === 0 ? (
            <p>You are yet to create any links.</p>
          ) : (
            <ul className=" w-full  ">
              {links.map((link: any) => (
                <li
                  key={link.shortUrl}
                  className="justify-between mt-3 flex flex-col lg:flex-row border-2 shadow-lg p-3 rounded">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-xl font-bold">{link.name}</h1>
                    <p className="overflow-x-hidden font-bold">
                      Long Url: {link.longUrl}{" "}
                    </p>
                    <p className="font-bold">Short URL: {link.shortUrl}</p>
                    <p className="text-[0.8rem]">
                      Created at: {link.createdAt._seconds}{" "}
                    </p>
                    {/* <p>Click Count: {getClickCount(link.shortUrl)}</p> */}
                  </div>
                  <button onClick={() => copyToClipBoard(link.shortUrl)} className="rounded p-2 lg:self-start border ">Copy
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default ShortLinks;
