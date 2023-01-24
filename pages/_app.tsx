import { useCallback, useEffect } from "react";
import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { Homie, IScanRes, SavedMacs, useMacStore } from "../stores/macStore";

import "../styles/tailwind.css";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { macs, setStore } = useMacStore();

  const socketInit = useCallback(async () => {
    await fetch("/api/socket");
    const socket = io();

    // eslint-disable-next-line
    // @ts-ignore
    window.socket = socket;

    socket.on("scanResult", (msg) => {
      const results = JSON.parse(msg) as IScanRes[];
      console.debug(`📨 received results`, results);
      const newMacs = Array.from(new Set(results.map((res) => res.mac)));

      setStore({ macs: newMacs });
    });
  }, [setStore]);

  const savesInit = useCallback(() => {
    const saves: SavedMacs = JSON.parse(localStorage.getItem("saves") || "[]");
    setStore({ saves: !saves.length ? [{ index: uuidv4(), name: "", mac: "" }] : saves });
  }, [setStore]);

  useEffect(() => {
    socketInit();
    savesInit();
  }, [savesInit, socketInit]);

  useEffect(() => {
    setStore(({ homies, saves }) => {
      const homiesMacs = homies.map((homie) => homie.mac);
      const notHome = saves.map((save) => save.mac).filter((mac) => !homiesMacs.includes(mac));
      const newcomers: SavedMacs = saves.filter((save) => notHome.includes(save.mac));

      newcomers.forEach((newcomer) => {
        // TODO: Alert
        console.log(newcomer);
      });

      const newHomies: Homie[] = [
        ...homies,
        ...newcomers.map((newcomer) => ({
          name: newcomer.name,
          timestamp: new Date(),
          mac: newcomer.mac,
        })),
      ];

      return { homies: newHomies };
    });
  }, [macs, setStore]);

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
