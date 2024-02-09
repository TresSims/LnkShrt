import LinkEdit from "./linkEdit";
import Pagination from "../components/pagination.js";
import Axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function LinkList({ data, size }) {
  const [currentPage, setCurrentPage] = useState(1);

  let pageSize = 5;

  const paginate = (newPage) => {
    setCurrentPage(newPage);
  };

  let numPages = parseInt(size / pageSize);
  if (size % pageSize > 0) {
    numPages += 1;
  }

  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = currentPage * pageSize;
  let pageData = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="table text-white w-full rounded-md">
        <div className="table-header-group text-lg font-black">
          <div className="table-row">
            <div className="table-cell border-b-2 p-2">Short Link</div>
            <div className="table-cell border-b-2 p-2">Long Link</div>
            <div className="table-cell border-b-2 p-2">Copy Link</div>
            <div className="table-cell border-b-2 p-2">Remove Link</div>
          </div>
        </div>
        <div className="table-row-group">
          {pageData.map((link, i) => {
            return <LinkEdit key={i} id={link.id} location={link.link} />;
          })}
        </div>
      </div>
      <Pagination page={currentPage} pageCount={numPages} goToPage={paginate} />
    </>
  );
}
