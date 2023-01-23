import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export function Refresh() {
  function reScan() {
    // @ts-ignore
    if (!window?.socket) return;

    // @ts-ignore
    const socket = window!.socket as Socket<DefaultEventsMap, DefaultEventsMap>;

    console.log("emitting...");

    socket.emit("scan", "just a message");
  }

  return (
    <button
      className="p-5 bg-gray-500 rounded-md sticky top-5 right-5 bottom-5 self-start ml-auto"
      onClick={reScan}
      type="button"
    >
      <ArrowPathIcon width={24} height={24} />
    </button>
  );
}
