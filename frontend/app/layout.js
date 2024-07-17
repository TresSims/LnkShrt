import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import QueryRoot from "./components/QueryRoot";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LnkShrt",
  description: "Yet another link shortener",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryRoot>
          <div className="flex w-screen h-screen justify-center place-items-center p-4">
            <div className="bg-slate-900 lg:w-8/12 w-full h-full lg:h-auto max-h-full rounded-md flex flex-col overflow-hidden">
              {" "}
              <div className="flex flex-row place-content-between text-xs lg:text-lg font-black text-orange-500">
                <div className="flex flex-row ">
                  <Link
                    href="/"
                    className="m-0 p-5 no-underline bg-gradient-to-t to-50% from-blue-500 hover:from-blue-400 active:from-blue-600 border-r-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="/manage"
                    className="m-0 p-5 no-underline bg-gradient-to-t to-50% from-blue-500 hover:from-blue-400 active:from-blue-600 border-r-2"
                  >
                    Link List
                  </Link>
                </div>
                <div className="flex">
                  <Link
                    href="/login"
                    className="m-0 p-5 no-underline bg-gradient-to-t to-50% from-blue-500 hover:from-blue-400 active:from-blue-600 border-l-2"
                  >
                    Account
                  </Link>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-center place-items-center bottom-0 w-full">
                <h1 className="text-xl lg:text-5xl py-50">LnkShrt_</h1>
                <h2 className="collapse lg:visible italic text-slate-700">
                  Yet another link shortener
                </h2>
                {children}
              </div>
            </div>
          </div>
        </QueryRoot>
      </body>
    </html>
  );
}
