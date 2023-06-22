"use client";

import React, { useContext, useEffect } from "react";
import { db, storage, auth } from "@/firebase/config.js";
import { getAnalytics, logEvent } from "firebase/analytics";
import { doc, collection, setDoc, getDoc, Timestamp } from "firebase/firestore";
import QRCode from "qrcode";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { useState } from "react";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import { metadata } from "@/app/layout";
import Loading from "../loading";

const QRCodes = () => {
  const urlCollection = collection(db, "shortUrls");
  const appUser = useContext(AuthContext);
  let user: User | null = auth.currentUser;
  const listRef = ref(storage, `${user?.uid}/`);
  

  const userId = user ? user.uid : "unknown";
  const generateQrCode = async (
    data: string,
    title: string
  ): Promise<string> => {
    try {
      // Generate QR code as a data URL
      const qrCodeDataUrl = await QRCode.toDataURL(data);
      // Convert the data URL to a Blob object
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      // const date = Timestamp.now();
      const name: string = `${userId}/${title}`;
      const storageRef = ref(storage, name);
      // Upload the QR code image to Firebase Storage
      await uploadBytes(storageRef, blob);
      console.log("Uploaded a blob or file!");
      const downloadURL: string = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
    
  };

  const shortenUrl = async (longUrl: string): Promise<string> => {
    let slug = nanoid(4);

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
      });
    } catch (error) {
      console.log(error);
    }
    return slug;
  };

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  interface File {
    name: string;
    downloadUrl: string;
  }
  const handleGenerateQRCode = async () => {
    setLoading(true);
    try {
      const downloadURL: string = await generateQrCode(link, title);
      setQrCodeImage(downloadURL);
      setDownloadLink(downloadURL);
      setTitle(title);
      setLoading(false);
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error;
    }
  };

  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const fileList = await listAll(listRef);
        const filePromises = fileList.items.map(async (file) => {
          const downloadUrl = await getDownloadURL(file);
          return {
            name: file.name,
            downloadUrl,
          };
        });

        const files = await Promise.all(filePromises);
        setFiles(files);
      } catch (error) {
        throw error;
      }
    };

    if (user) {
      fetchUserFiles();
    }
  }, [listRef]);

  return (
    <>
    <section className = "w-[100%] bg-[#edf2f7] ml-[15rem]">
      <div>
        <input
          type="text"
          value={link}
          placeholder="Enter a link"
          onChange={(event) => setLink(event.target.value)}
        />
        <input
          type="text"
          value={title}
          placeholder="Name this QR code"
          onChange={(event) => setTitle(event.target.value)}
        />
        <button onClick={handleGenerateQRCode}>Generate QR Code
        {loading? <Loading /> : null}
        </button>
        {qrCodeImage && (
          <>
            <Image
              src={qrCodeImage}
              alt="qrCode"
              width={200}
              height={200}></Image>
            <p>{title}</p>
          </>
        )}
        {downloadLink && (
          <a href={downloadLink} download>
            Download QR Code
          </a>
        )}
      </div>
      <div>
        <h1>Your Files</h1>
        {files.length === 0 ? (
          <p>No files found.</p>
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                <p>File Name: {file.name}</p>
                <Link href={file.downloadUrl}>
                  Download Link
                </Link>
                <Image
                  src={file.downloadUrl}
                  alt="qrcode"
                  width={200}
                  height={200}></Image>
              </li>
            ))}
          </ul>
        )}
      </div>
      </section>
    </>
  );
};

export default QRCodes;
