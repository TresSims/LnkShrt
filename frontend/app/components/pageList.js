import Axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function PageList({ currentPage, goToPage, setMaxPage }) {
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["links"],
    queryFn: () =>
      Axios.get("/api/list/", {
        params: {
          page: 1,
          length: 1,
        },
      }).then((response) => response.data),
  });

  if (isPending) return "Loading...";
  if (error) return "";

  let pages = parseInt(data["size"] / 5);
  if (data["size"] % 5 > 0) {
    pages += 1;
  }
  setMaxPage(setMaxPage);
  const arr = new Array(pages).fill(0);

  return (
    <div className="flex flex-row text-orange-500 text-sm font-black">
      {arr.map((x, i) => {
        if (i == currentPage - 1) {
          return (
            <button
              // onClick={goToPage(i + 1)}
              key={i}
              className="bg-white rounded-full w-10 h-10 mx-2"
            >
              {i + 1}
            </button>
          );
        } else {
          return (
            <button
              // onClick={goToPage(i + 1)}
              key={i}
              className="rounded-full border-2 w-10 h-10 mx-2"
            >
              {i + 1}
            </button>
          );
        }
      })}
    </div>
  );
}
