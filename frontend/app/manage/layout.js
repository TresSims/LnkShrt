"use client";

export default function RemoveLayout({ children }) {
  return (
    <div className="bg-slate-700 p-2 text-black w-full h-full rounded-md">
      {children}
    </div>
  );
}
