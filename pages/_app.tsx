import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { Alert } from "../components/Alert";

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
        "relative grid place-items-center h-full min-h-screen max-w-full bg-[#1A120B] text-gray-300"
      }
    >
      <Component {...pageProps} />
    </main>
  );
}
