"use client";

import LinkList from "../components/linkList";
import Error from "../components/error";
import Axios from "axios";
import {
  useQueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const getData = async () => {
  return (await Axios.get("/api/list/")).data;
};

export default function Remove() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["links"],
    queryFn: getData,
  });

  if (isPending) return "Loading...";
  if (error) return <Error />;

  return (
    <div>
      <LinkList data={data.data} size={data.size} />
    </div>
  );
}
