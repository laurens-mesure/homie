import { useCallback, useEffect } from "react";
import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { v4 as uuidv4 } from "uuid";

import { ProvokeInteraction } from "../components/ProvokeInteraction";
import { useAlertStore } from "../stores/alertStore";
import { Homie, SavedMacs, useMacStore } from "../stores/macStore";

import "../styles/tailwind.css";

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { macs, setStore } = useMacStore();
  const { setStore: setAlertStore } = useAlertStore();

  const socketInit = useCallback(async () => {
    // eslint-disable-next-line
    // @ts-ignore
    if (window?.socket != null) return;
    const socket = new WebSocket("ws://localhost:3000");

    // eslint-disable-next-line
    // @ts-ignore
    window.socket = socket;

    socket.onopen = () => {
      socket.send("scan");
    };

    socket.onmessage = (event) => {
      console.log(event.data);
      // const results = JSON.parse(msg) as IScanRes[];
      // console.debug(`📨 received results`, results);
      // const newMacs = Array.from(new Set(results.map((res) => res.mac)));

      // setStore({ macs: newMacs });
    };
  }, []);

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
      const refreshedSavesMacs = saves.filter((save) => macs.includes(save.mac));
      const checkedHomies: Homie[] = homies
        .map((homie) => {
          const isHomieUpdated = refreshedSavesMacs.find(({ mac }) => mac === homie.mac);

          if (isHomieUpdated) return { ...homie, ghost: false, updatedAt: new Date() };

          if (homie.ghost && new Date().getTime() - homie.updatedAt.getTime() > 60 * 60 * 1000) {
            return null;
          }

          return {
            ...homie,
            ghost: true,
            updatedAt: new Date(),
          };
        })
        .filter(Boolean) as Homie[];

      refreshedSavesMacs.forEach((save) => {
        const alreadyUpdated = checkedHomies.find(({ mac }) => save.mac === mac);
        if (!alreadyUpdated) {
          const notification = new Audio("/notification.mp3");
          notification.play();
          setAlertStore((prev) => ({
            content: [...(prev.content ?? []), { key: uuidv4(), value: `${save.name} arrived` }],
          }));
          checkedHomies.push({
            name: save.name,
            mac: save.mac,
            createdAt: new Date(),
            updatedAt: new Date(),
            ghost: false,
          });
        }
      });

      return { homies: checkedHomies };
    });
  }, [macs, setAlertStore, setStore]);

  return (
    <main
      className={
        poppins.className +
        "relative grid h-full min-h-screen max-w-full place-items-center bg-[#16213E] text-gray-300"
      }
    >
      <ProvokeInteraction />
      <Component {...pageProps} />
    </main>
  );
}
