"use client";

import { useState } from "react";
import LinkList from "../components/linkList.js";
import PageList from "../components/pageList.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Remove() {
  let [page, setPage] = useState(1);
  let [maxPage, setMaxPage] = useState(3);

  const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <div className="table text-white w-full rounded-md">
        <div className="table-header-group text-lg font-black">
          <div className="table-row">
            <div className="table-cell border-b-2 p-2">Short Link</div>
            <div className="table-cell border-b-2 p-2">Long Link</div>
            <div className="table-cell border-b-2 p-2">Copy Link</div>
            <div className="table-cell border-b-2 p-2">Remove Link</div>
          </div>
        </div>
        <div className="table-row-group ">
          <LinkList page={page} />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button
          onClick={decrementPage}
          className="w-48 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded-full text-white font-black py-2 px-4"
        >
          Previous Page
        </button>
        <PageList
          currentPage={page}
          goToPage={setPage}
          setMaxPage={setMaxPage}
        />
        <button
          onClick={incrementPage}
          className="w-48 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded-full text-white font-black py-2 px-4 "
        >
          Next Page
        </button>
      </div>
    </QueryClientProvider>
  );
}
