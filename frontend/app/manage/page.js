"use client";

import LinkList from "../components/linkList";
import Error from "../components/error";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Pagination from "../components/pagination.js";

const getData = async (page, pageSize) => {
  return (
    await Axios.get("/api/list/", {
      params: { page: page, page_size: pageSize },
    })
  ).data;
};

export default function Remove() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerHeight >= 530 ? 5 : 2);
  const [showDelete, setShowDelete] = useState(window.innerWidth >= 750);

  const paginate = (newPage) => {
    setCurrentPage(newPage);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["links", currentPage, pageSize],
    queryFn: () => {
      return getData(currentPage, pageSize);
    },
  });

  useEffect(() => {
    if (error) {
      if (error.response.status == "404") {
        paginate(currentPage - 1);
      }
    }
  }, [error]);

  useEffect(() => {
    let handleResize = () => {
      setShowDelete(window.innerWidth >= 750);
      setPageSize(window.innerHeight >= 530 ? 5 : 2);
    };

    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      <div className="table text-white w-full rounded-md">
        <div className="table-header-group text-sm lg:text-lg font-black">
          <div className="table-row">
            <div className="table-cell border-b-2 p-2">Short Link</div>
            <div className="table-cell border-b-2 p-2">Long Link</div>
            <div className="table-cell border-b-2 p-2">Copy Link</div>
            {showDelete && (
              <div className="table-cell border-b-2 p-2">Remove Link</div>
            )}
          </div>
        </div>
        {isPending && <p>Loading...</p>}
        {error && <Error />}
        {data && <LinkList data={data} />}
      </div>
      {isPending && <p>Loading...</p>}
      {error && <Error />}
      {data && (
        <Pagination
          page={currentPage}
          entries={data.count}
          pageLength={pageSize}
          goToPage={paginate}
        />
      )}
    </>
  );
}
