import { FormEvent, useEffect, useRef, useState } from "react";

import { useMacStore } from "../stores/macStore";

export function Join() {
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setStore } = useMacStore();

  useEffect(() => {
    if (!localStorage.getItem("saves")) {
      setOpen(true);
    }
  }, [setOpen]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!containerRef.current) return;

    const formData = new FormData(e.currentTarget);
    const deviceName = formData.get("device_name");

    // eslint-disable-next-line
    // @ts-ignore
    const socket = window.socket as WebSocket;

    socket.send(JSON.stringify({ name: "join", deviceName }));

    const animate = containerRef.current.animate(
      {
        opacity: 0,
      },
      { duration: 300, fill: "forwards" }
    );

    animate.onfinish = () => setOpen(false);
    animate.play();
    setStore({ seedLoading: true });
  }

  function hanldeClose() {
    setOpen(false);
  }

  return open ? (
    <div
      className="fixed top-0 left-0 z-10 grid h-full w-full place-items-center bg-neutral-900/50 backdrop-blur-lg"
      ref={containerRef}
    >
      <div className="relative flex min-w-[40vw] flex-col rounded-lg border border-neutral-800 bg-neutral-900 p-5">
        <p
          className="absolute top-2 right-3 rounded-sm bg-neutral-300/20 px-1.5 font-mono"
          onClick={hanldeClose}
        >
          X
        </p>
        <p className="mb-10 text-center text-xl font-bold">Who are you? 💡</p>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-5 w-full rounded-md border border-neutral-700 bg-transparent px-3 py-2 outline-none focus:border-indigo-500"
            name="device_name"
            placeholder="Laurens 🐕"
            type="text"
            required
          />
          <button
            className="w-full self-center rounded-md bg-indigo-800 px-5 py-2 text-center text-lg font-semibold text-gray-200"
            type="submit"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  ) : null;
}
