"use client";

import React, { useContext, useEffect } from "react";
import { storage, auth } from "@/firebase/config.js";
import QRCode from "qrcode";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import useDownloader from "react-use-downloader";
import LoadingSpinner from "../LoadingSpinner";

const QRCodes = () => {
  const appUser = useContext(AuthContext);
  const { download } = useDownloader();
  let user: User | null = auth.currentUser;
  const listRef = ref(storage, `${user?.uid}/`);

  const userId = user ? user.uid : "unknown";
  const generateQrCode = async (
    data: string,
    title: string
  ): Promise<string> => {
    if (!data) {
      throw new Error("Invalid link or no link found");
    }
    if (!title) {
      throw new Error("Code Title is required");
    }
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

  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  interface File {
    name: string;
    downloadUrl: string;
  }
  const handleGenerateQRCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const downloadURL: string = await generateQrCode(link, title);
      setQrCodeImage(downloadURL);
      setDownloadLink(downloadURL);
      setTitle(title);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error generating QR code:", error);
      throw error;
    }
    setLink("");
    setTitle("");
  };

  //fetch qrcodes
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
          <div className="flex flex-col lg:flex-row lg:gap-4 justify-center lg:items-center">
            <h1 className="text-xl font-extrabold ">QR codes:</h1>
            <p className="font-semibold">
              Create and download QR codes for your links
            </p>
          </div>
          <Link
            href="/dashboard/feedback"
            className="flex gap-2 items-center p-2 border-2 rounded-lg text-[0.8rem] font-semibold hover:bg-[#2e4457] hover:text-white hover:border-none mt-4 lg:mt-0">
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
        <h2 className="mt-6 font-bold">Generate QR code</h2>
        <form
          onSubmit={handleGenerateQRCode}
          className="flex flex-col items-center border-2 rounded-lg h-full p-3 mt-3">
          <label htmlFor="qrtitle" className=" w-full lg:w-[50%]">
            Name this QR code: <br></br>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full text-center p-4 border border-[#2e4457] rounded"
            />
          </label>
          <label htmlFor="link" className="w-full lg:w-[50%]">
            <input
              type="url"
              placeholder="Paste in the long url here..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="w-full text-center p-4 border border-[#2e4457] rounded mt-4"
            />
          </label>
          <button
            disabled={loading}
            className="p-3 bg-[#005AE2] rounded-lg mt-2 text-white flex">
            Create
            {loading ? <LoadingSpinner /> : null}
          </button>
          <p className="mt-2 text-[0.7rem]">
            By clicking Create, I agree with the terms of service, privacy
            policy, and use of cookies.
          </p>
        </form>

        {qrCodeImage && (
          <>
            <Image
              src={qrCodeImage}
              alt="qrCode"
              width={150}
              height={150}></Image>
            <p>{title}</p>
          </>
        )}
        {downloadLink && (
          <a href={downloadLink} download>
            Download QR Code
          </a>
        )}

        <div className="mt-6">
          <h1 className="text-lg font-bold">Your Files</h1>
          {files.length === 0 ? (
            <p>You are yet to create any QR Codes</p>
          ) : (
            <ul className="">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="justify-between items-center mt-3 flex flex-col lg:flex-row border-2 shadow-lg p-3 rounded">
                  <div className="flex flex-col space-y-2 lg:items-start">
                    <p className="text-xl font-bold text-center">{file.name}</p>
                    <Image
                      src={file.downloadUrl}
                      alt="qrcode"
                      width={150}
                      height={150}></Image>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={file.downloadUrl}
                      target="_blank"
                      download
                      className="p-2 bg-slate-200 rounded-lg font-semibold hover:bg-[#2e4457] hover:text-white">
                      View
                    </Link>
                    <button
                      onClick={() =>
                        download(file.downloadUrl, `${file.name}.png`)
                      }
                      className="border p-2 rounded hover:bg-slate-100">
                      Download
                    </button>
                  </div>
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
