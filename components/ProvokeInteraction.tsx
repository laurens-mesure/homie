import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

export function ProvokeInteraction() {
  const [visible, setVisible] = useState<boolean>(true);

  return visible ? (
    <button
      className="absolute bottom-5 right-5 z-10 rounded-md bg-neutral-800/50 p-5 text-green-500"
      onClick={() => setVisible(false)}
    >
      <CheckIcon height={24} width={24} />
    </button>
  ) : null;
}
