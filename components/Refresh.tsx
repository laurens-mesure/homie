import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io-client";

export function Refresh() {
  function reScan() {
    // eslint-disable-next-line
    // @ts-ignore
    if (!window?.socket) return;

    // eslint-disable-next-line
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const socket = window!.socket as Socket<DefaultEventsMap, DefaultEventsMap>;

    socket.emit("scan");
  }

  return (
    <button
      className="sticky top-5 right-5 bottom-5 ml-auto self-start rounded-md bg-sky-900 p-5"
      onClick={reScan}
      type="button"
    >
      <ArrowPathIcon height={24} width={24} />
    </button>
  );
}
