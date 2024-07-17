"use client";

import Shortener from "./components/shortener";

export default function Home() {
  return (
    <div className="w-10/12 m-5">
      <p className="text-md lg:text-lg">Input a link to shorten</p>
      <br />
      <Shortener />
    </div>
  );
}
