"use client";

import { useState, Suspense } from "react";
import LinkList from "../components/linkList.js";
import Loading from "./loading";
import Axios from "axios";

export default function Remove() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(3);

  const incrementPage = () => {
    let newPage = page + 1;
    if (newPage > maxPage) {
      newPage = maxPage;
    }
    setPage(newPage);
  };

  const decrementPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = 1;
    }
    setPage(newPage);
  };

  return (
    <dir>
      <dir className="table text-white w-full rounded-md">
        <div className="table-header-group text-lg font-black">
          <div className="table-row">
            <div className="table-cell border-b-2 p-2">Short Link</div>
            <div className="table-cell border-b-2 p-2">Long Link</div>
            <div className="table-cell border-b-2 p-2">Copy Link</div>
            <div className="table-cell border-b-2 p-2">Remove Link</div>
          </div>
        </div>
        <div className="table-row-group ">
          <Suspense fallback={<Loading />}>
            <LinkList page={page} />
          </Suspense>
        </div>
      </dir>
      <div className="flex flex-row justify-between">
        <button
          onClick={decrementPage}
          className="bg-blue-500 rounded-full text-white font-black py-2 px-4"
        >
          Previous Page
        </button>
        <button
          onClick={incrementPage}
          className="bg-blue-500 rounded-full text-white font-black py-2 px-4 "
        >
          Next Page
        </button>
      </div>
    </dir>
  );
}
