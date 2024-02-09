import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LnkShrt",
  description: "Yet another link shortener",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-screen h-screen justify-center place-items-center">
          <div className="bg-slate-900 w-8/12 rounded-md flex flex-col overflow-hidden">
            <div className="flex flex-row text-lg font-black text-orange-500">
              <Link
                href="/"
                className="m-0 p-5 no-underline bg-gradient-to-t to-50% from-blue-500 hover:from-blue-400 active:from-blue-600 border-r-2"
              >
                Home
              </Link>
              <Link
                href="/remove"
                className="m-0 p-5 no-underline bg-gradient-to-t to-50% from-blue-500 hover:from-blue-400 active:from-blue-600 border-r-2"
              >
                Link List
              </Link>
            </div>
            <div className="flex flex-col p-5 justify-center place-items-center w-full">
              <h1 className="text-5xl py-50 my-5">LnkShrt_</h1>
              <h2 className="text-2xl italic text-slate-700">
                Yet another link shortener
              </h2>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
