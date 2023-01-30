import React, { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

export function ProvokeInteraction() {
  const [visible, setVisible] = useState<boolean>(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseMove);
    };
  }, []);

  function handleMouseMove(e: MouseEvent) {
    if (!buttonRef.current) return;

    buttonRef.current.animate(
      {
        left: `${e.clientX}px`,
      },
      { duration: 300, fill: "forwards" }
    );
  }

  return visible ? (
    <button
      className="absolute top-5 left-5 z-10 rounded-md bg-neutral-800/50 p-5 text-green-500"
      onClick={() => setVisible(false)}
      ref={buttonRef}
    >
      <CheckIcon height={24} width={24} />
    </button>
  ) : null;
}
