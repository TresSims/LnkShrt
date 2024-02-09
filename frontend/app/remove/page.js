"use client";

import LinkList from "../components/linkList.js";
import Axios from "axios";
import {
  useQueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export default function Remove() {
  const queryClient = useQueryClient();

  const getData = () => {
    return Axios.get("/api/list/").then((response) => response.data);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["links"],
    queryFn: getData,
  });

  if (isPending) return "Loading...";
  if (error)
    return (
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
    );

  return (
    <div>
      <LinkList data={data["data"]} size={parseInt(data["size"])} />{" "}
    </div>
  );
}
