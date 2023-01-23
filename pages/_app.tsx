import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { io } from "socket.io-client";

import "../styles/tailwind.css";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

type IScanRes = { name: string; ip: string; mac: string }[];

export default function App({ Component, pageProps }: AppProps) {
  async function socketInit() {
    await fetch("/api/socket");
    const socket = io();

    // @ts-ignore
    window.socket = socket;

    socket.on("connected", (msg) => {
      console.log(msg);
    });

    socket.on("scan", (msg) => {
      console.log("scan", msg);
    });

    socket.on("scanResult", (msg) => {
      const results = JSON.parse(msg) as IScanRes;

      console.log(results);
    });
  }

  useEffect(() => {
    socketInit();
  }, []);

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
