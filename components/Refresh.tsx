import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

import { reScan } from "../functions/requestScan";
import { useAlertStore } from "../stores/alertStore";

export function Refresh() {
  const { setStore } = useAlertStore();

  return (
    <button
      className="sticky top-5 right-5 bottom-5 ml-auto self-start rounded-md bg-indigo-800 p-5"
      onClick={() => {
        reScan();
        setStore((prev) => ({
          content: [...(prev.content ?? []), { key: uuidv4(), value: "Updating device list" }],
        }));
      }}
      type="button"
    >
      <ArrowPathIcon height={24} width={24} />
    </button>
  );
}
