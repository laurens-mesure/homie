import { useCallback, useEffect } from "react";
import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { io } from "socket.io-client";

import { useMacStore } from "../stores/macStore";

import "../styles/tailwind.css";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export type IScanRes = { name: string; ip: string; mac: string };
export type SavedMacs = { name: string; mac: string }[];

export default function App({ Component, pageProps }: AppProps) {
  const { homies, macs, saves, setStore } = useMacStore();

  const socketInit = useCallback(async () => {
    await fetch("/api/socket");
    const socket = io();

    // eslint-disable-next-line
    // @ts-ignore
    window.socket = socket;

    socket.on("scanResult", (msg) => {
      const results = JSON.parse(msg) as IScanRes[];
      console.debug(`📨 received results`, results);

      setStore({ macs: Array.from(new Set(results.map((res) => res.mac))) });
    });
  }, [setStore]);

  const savesInit = useCallback(() => {
    const saves: SavedMacs = JSON.parse(localStorage.getItem("saves") || "[]");
    setStore({ saves });
  }, [setStore]);

  useEffect(() => {
    socketInit();
    savesInit();
  }, [savesInit, socketInit]);

  useEffect(() => {
    const notHome = saves.map((save) => save.mac).filter((mac) => !homies.includes(mac));
    const newComers = macs.filter((mac) => notHome.includes(mac));

    newComers.forEach((newComer) => {
      // TODO: Alert
      console.log(newComer);
    });
  }, [homies, macs, saves]);

  return (
    <main
      className={
        poppins.className +
        "relative grid h-full min-h-screen max-w-full place-items-center bg-[#16213E] text-gray-300"
      }
    >
      <Component {...pageProps} />
    </main>
  );
}
