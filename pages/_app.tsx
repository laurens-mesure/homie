import { useCallback, useEffect } from "react";
import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";
import { v4 as uuidv4 } from "uuid";

import { ProvokeInteraction } from "../components/ProvokeInteraction";
import { useAlertStore } from "../stores/alertStore";
import { Homie, SavedMacs, useMacStore } from "../stores/macStore";

import "../styles/tailwind.css";

type IMac = { name: string; mac: string; createdAt: Date; updatedAt: Date; ghost: boolean };

const poppins = Poppins({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { setStore } = useMacStore();
  const { setStore: setAlertStore } = useAlertStore();

  const socketInit = useCallback(async () => {
    // eslint-disable-next-line
    // @ts-ignore
    if (window?.socket != null) return;
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

    // eslint-disable-next-line
    // @ts-ignore
    window.socket = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ name: "connected" }));
    };

    socket.onmessage = (event) => {
      if (!(event.data instanceof Blob)) return;
      const reader = new FileReader();

      reader.onload = () => {
        const message = JSON.parse(reader.result as string) as
          | {
              name: "scan_result";
              data: IMac[];
            }
          | { name: "joined"; mac: string; deviceName: string }
          | { name: "init_seed" }
          | { name: "seed"; saves: SavedMacs };
        if (message.name === "scan_result") {
          const { data } = message;
          setStore((prev) => {
            const newHomies = data
              .map((device) => {
                const savedDevice = prev.saves.find(({ mac }) => device.mac === mac);

                if (!savedDevice) return null;

                return {
                  name: savedDevice.name,
                  mac: device.mac,
                  ghost: device.ghost,
                  createdAt: new Date(device.createdAt),
                  updatedAt: new Date(device.updatedAt),
                };
              })
              .filter(Boolean) as Homie[];

            newHomies
              .filter((homie) => !prev.homies.find((_homie) => homie.mac === _homie.mac))
              .forEach((homie) => {
                const notification = new Audio("/notification.mp3");
                notification.play();
                setAlertStore((prev) => ({
                  content: [
                    ...(prev.content ?? []),
                    { key: uuidv4(), value: `${homie.name} arrived` },
                  ],
                }));
              });

            return {
              homies: newHomies,
              macs: data.map((device) => device.mac),
            };
          });
        } else if (message.name === "joined") {
          const saves: SavedMacs = JSON.parse(localStorage.getItem("saves") || "[]");
          setStore({
            saves: [...saves, { index: uuidv4(), name: message.name, mac: message.mac }],
          });
        } else if (message.name === "init_seed") {
          const saves: SavedMacs = JSON.parse(localStorage.getItem("saves") || "[]");
          socket.send(JSON.stringify({ name: "seed_resp", saves }));
        } else if (message.name === "seed") {
          localStorage.setItem("saves", JSON.stringify(message.saves));
          setStore({ saves: message.saves });
        }
      };

      reader.readAsText(event.data);
    };
  }, [setAlertStore, setStore]);

  const savesInit = useCallback(() => {
    const saves: SavedMacs = JSON.parse(localStorage.getItem("saves") || "[]");
    setStore({ saves: !saves.length ? [{ index: uuidv4(), name: "", mac: "" }] : saves });
  }, [setStore]);

  useEffect(() => {
    socketInit();
    savesInit();
  }, [savesInit, socketInit]);

  return (
    <main
      className={
        poppins.className +
        "relative grid h-full min-h-screen max-w-full place-items-center bg-neutral-900 text-gray-300"
      }
    >
      <ProvokeInteraction />
      <Component {...pageProps} />
    </main>
  );
}
