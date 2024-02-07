import { Inter } from "next/font/google";
import "./globals.css";

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
          <div className="bg-slate-900 w-8/12 p-5 rounded-md flex flex-col justify-center place-items-center">
            <h1 className="text-5xl py-50 my-5">LnkShrt_</h1>
            <h2 className="text-2xl italic text-slate-700">
              Yet another link shortener
            </h2>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
