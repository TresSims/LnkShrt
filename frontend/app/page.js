"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Shortener from "./components/shortener";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-10/12 m-5">
        <p className="text-lg">Input a link to shorten</p>
        <br />
        <Shortener />
      </div>
    </QueryClientProvider>
  );
}
