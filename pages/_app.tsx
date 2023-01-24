import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useMacStore } from "../stores/macStore";

import "../styles/tailwind.css";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export type IScanRes = { name: string; ip: string; mac: string };

export default function App({ Component, pageProps }: AppProps) {
  const { setStore: setMacs } = useMacStore();

  async function socketInit() {
    await fetch("/api/socket");
    const socket = io();

    // @ts-ignore
    window.socket = socket;

    socket.on("scanResult", (msg) => {
      const results = JSON.parse(msg) as IScanRes[];
      console.debug(`📨 received results`, results);

      setMacs({ macs: Array.from(new Set(results.map((res) => res.mac))) });
    });
  }

  useEffect(() => {
    socketInit();
  }, []);

  return (
    <main
      className={
        poppins.className +
        "relative grid place-items-center h-full min-h-screen max-w-full bg-[#16213E] text-gray-300"
      }
    >
      <Component {...pageProps} />
    </main>
  );
}
