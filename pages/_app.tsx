import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";

import "../styles/tailwind.css";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={
        poppins.className +
        "relative grid place-items-center p-10 h-full min-h-screen max-w-full bg-[#1A120B] text-gray-300"
      }
    >
      <div>
        <h1 className="text-white font-bold text-center text-6xl mb-20">
          Who's home?
        </h1>
        <Component {...pageProps} />
      </div>
    </main>
  );
}
