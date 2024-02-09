"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RemoveLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-700 p-2 text-black w-full rounded-md">
        {children}
      </div>
    </QueryClientProvider>
  );
}
