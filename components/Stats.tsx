import React from "react";

const Stats = () => {
  return (
    <>
      <div className=" text-[#2e4457] flex flex-col lg:flex-row w-[90%] m-auto space-y-6 lg:gap-x-5 mb-6 lg:items-center lg:justify-between">
        <div className="flex flex-col lg:w-2/5 text-xl lg:text-2xl xl:text-3xl font-bold">
          <h3>One Stop</h3>
          <h3>
            Four <span className="text-blue-600"> Possibilities</span>.
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm lg:text-base">
          <div className="flex flex-col">
            <h3 className="font-bold text-base lg:text-xl">3K</h3>
            <p className="text-sm font-semibold">Active users</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base lg:text-xl">100K</h3>
            <p className="text-sm font-semibold">Links & QR codes created</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base lg:text-xl">5M</h3>
            <p className="text-sm font-semibold">
              Clicked and scanned connections
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base lg:text-xl">1K</h3>
            <p className="text-sm font-semibold">App integrations</p>
          </div>
        </div>
      </div>

      <div className="text-[#2e4457] mt-10 md:mt-20 flex flex-col w-[90%] m-auto space-y-6 lg:gap-x-10 mb-6  xl:justify-between">
        <div className="flex flex-col lg:w-3/5 md:mb-6 text-xl lg:text-2xl xl:text-3xl font-bold gap-y-2 md:self-start">
          <h3>Why Choose Chop?</h3>
          <p className="text-[0.9rem] md:text-sm font-normal  text-justify ">
            Chop is the hub of everything that has to do with your link
            management. We shorten your URLs, allow you creating custom ones for
            your personal, business, event usage. Our swift QR code creation,
            management and usage tracking with advance analytics for all of
            these is second to none.{" "}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm lg:text-base gap-y-8">
          <div className="flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 20 20"
              className="p-2 bg-blue-100 mb-2 rounded-full">
              <path
                fill="#005AE2"
                d="M17.74 2.76a4.321 4.321 0 0 1 0 6.1l-1.53 1.52c-1.12 1.12-2.7 1.47-4.14 1.09l2.62-2.61l.76-.77l.76-.76c.84-.84.84-2.2 0-3.04a2.13 2.13 0 0 0-3.04 0l-.77.76l-3.38 3.38c-.37-1.44-.02-3.02 1.1-4.14l1.52-1.53a4.321 4.321 0 0 1 6.1 0zM8.59 13.43l5.34-5.34c.42-.42.42-1.1 0-1.52c-.44-.43-1.13-.39-1.53 0l-5.33 5.34c-.42.42-.42 1.1 0 1.52c.44.43 1.13.39 1.52 0zm-.76 2.29l4.14-4.15c.38 1.44.03 3.02-1.09 4.14l-1.52 1.53a4.321 4.321 0 0 1-6.1 0a4.321 4.321 0 0 1 0-6.1l1.53-1.52c1.12-1.12 2.7-1.47 4.14-1.1l-4.14 4.15c-.85.84-.85 2.2 0 3.05c.84.84 2.2.84 3.04 0z"
              />
            </svg>
            <h3 className="font-bold text-base lg:text-xl">URL Shortening</h3>
            <p className=" text-[0.9rem] md:text-sm  lg:w-1/2">
              Chop allows you to shorten URLs of your business, events. Shorten
              your URL at scale, URL redirects.
            </p>
          </div>
          <div className="flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="p-2 bg-blue-100 mb-2 rounded-full">
              <path
                fill="#005AE2"
                d="m13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 1 1-9.9-9.9l1.415 1.415a5 5 0 0 0 7.07 7.07l.354-.353a5 5 0 0 0 0-7.07l-1.414-1.415L13.06 8.11Zm6.718 6.011l-1.414-1.414a5 5 0 0 0-7.071-7.071l-.354.353a5 5 0 0 0 0 7.071l1.414 1.415l-1.414 1.414l-1.414-1.414a7 7 0 0 1 0-9.9l.353-.353a7 7 0 0 1 9.9 9.9Z"
              />
            </svg>
            <h3 className="font-bold text-base lg:text-xl">Custom Urls</h3>
            <p className="text-[0.9rem] md:text-sm lg:w-1/2">
              With Chop, you can create custom URLs, with the length you want! A
              solution for socials and businesses.
            </p>
          </div>
          <div className="flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="p-2 bg-blue-100 mb-2 rounded-full">
              <path
                fill="#005AE2"
                d="M3 11h2v2H3v-2m8-6h2v4h-2V5m-2 6h4v4h-2v-2H9v-2m6 0h2v2h2v-2h2v2h-2v2h2v4h-2v2h-2v-2h-4v2h-2v-4h4v-2h2v-2h-2v-2m4 8v-4h-2v4h2M15 3h6v6h-6V3m2 2v2h2V5h-2M3 3h6v6H3V3m2 2v2h2V5H5M3 15h6v6H3v-6m2 2v2h2v-2H5Z"
              />
            </svg>
            <h3 className="font-bold text-base lg:text-xl">QR Codes</h3>
            <p className="text-[0.9rem] md:text-sm lg:w-1/2">
              Generate QR codes to your business, events. Bring your audience
              and customers to your doorstep with this scan and go solution.
            </p>
          </div>
          <div className="flex flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#005AE2"
              className="bi bi-graph-up-arrow p-2 bg-blue-100 mb-2 rounded-full"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
              />
            </svg>
            <h3 className="font-bold text-base lg:text-xl">Data Analytics</h3>
            <p className="text-[0.9rem] md:text-sm lg:w-1/2">
              Receive data on the usage of either your shortened URL, custom
              URLs or generated QR codes. Embedded to monitor progress.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
