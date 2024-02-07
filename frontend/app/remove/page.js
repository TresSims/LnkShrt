"use client";

import { useState } from "react";
import Axios from "axios";

import LinkEdit from "../components/linkEdit";

export default function remove() {
  const [requestError, setRequestError] = useState(false);
  const [page, setPage] = useState(0);

  let getLinkList = (page) => {
    Axios.get("/api/list/", {
      params: {
        page: page,
      },
    })
      .then(function (response) {
        setRequestError(false);
        console.log(response);
      })
      .catch(function (err) {
        setRequestError(true);
        console.log(err);
      });
  };

  getLinkList(page);

  return (
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
    </dir>
  );
}
