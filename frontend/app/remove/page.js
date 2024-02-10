"use client";

import LinkList from "../components/linkList";
import Error from "../components/error";
import Axios from "axios";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Pagination from "../components/pagination.js";

const getData = async (page, pageSize) => {
  return (
    await Axios.get("/api/list/", {
      params: { page: page, pageSize: page_size },
    })
  ).data;
};

export default function Remove() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 5;

  const paginate = (newPage) => {
    setCurrentPage(newPage);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["links", currentPage, pageSize],
    queryFn: () => {
      return getData(currentPage, pageSize);
    },
  });

  if (isPending) return "Loading...";
  if (error) return <Error />;

  return (
    <div>
      <div className="table text-white w-full rounded-md">
        <div className="table-header-group text-lg font-black">
          <div className="table-row">
            <div className="table-cell border-b-2 p-2">Short Link</div>
            <div className="table-cell border-b-2 p-2">Long Link</div>
            <div className="table-cell border-b-2 p-2">Copy Link</div>
            <div className="table-cell border-b-2 p-2">Remove Link</div>
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
    </div>
  );
}
