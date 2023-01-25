import { ArrowPathIcon } from "@heroicons/react/24/outline";

import { reScan } from "../functions/requestScan";

export function Refresh() {
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
