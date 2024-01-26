"use client";

import Image from "next/image";
import React, { useState } from "react";
import Axios from "axios";

export default function Home() {
  const [shortLink, setShortLink] = useState("");
  const [longLink, setLongLink] = useState("https://tres-sims.com/");
  const [readyToSubmit, setReadyToSubmit] = useState(true);
  const [requestError, setRequestError] = useState(false);

  let validateURL = (e) => {
    setLongLink(e.target.value);

    try {
      new URL(longLink);
      setReadyToSubmit(true);
    } catch (err) {
      setReadyToSubmit(false);
    }
  };

  let getShortLink = (e) => {
    Axios.post("/api/", {
      params: {
        link: longLink,
      },
    })
      .then(function (response) {
        setRequestError(false);

        setShortLink(
          window.location.origin + "/api/?link=" + response.data["id"]
        );
      })
      .catch(function (err) {
        console.log(err);
        setRequestError(true);
      });
  };

  return (
    <>
      <div className="bg-slate-900 w-8/12 p-5 rounded-md flex flex-col justify-center place-items-center">
        <h1 className="text-5xl py-50 my-5">LnkShrt_</h1>
        <h2 className="text-2xl italic text-slate-700">
          Yet another link shortener
        </h2>

        <div className="w-10/12 m-5">
          <p className="text-lg">Input a link to shorten</p>
          <br />
          <div className="flex flex-row space-around">
            <input
              type="text"
              title="Pleasea input a valud URL"
              name="link"
              required
              className="flex-grow rounded-full px-5 p-2 text-black"
              onChange={(e) => validateURL(e)}
              value={longLink}
            />
            <button
              disabled={!readyToSubmit}
              onClick={getShortLink}
              className="w-2/12 ms-10 bg-orange-500 disabled:bg-gray-200 hover:bg-amber-500 active:bg-amber-400 text-lg font-black rounded-full"
            >
              Shrtn It
            </button>
          </div>
          {shortLink && (
            <div className="py-5 flex flex-row justify-center place-items-center">
              <button
                onClick={() => navigator.clipboard.writeText(shortLink)}
                className="flex flex-row place-items-center bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white p-2 rounded-full"
              >
                <p className="text-xl text-white px-5 font-black">
                  {shortLink}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                  <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                </svg>
              </button>
            </div>
          )}
          {requestError && (
            <div className="text-red-500 py-5 flex flex-row justify-center place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Something went Wrong! Try again later.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
