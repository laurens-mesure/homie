import { ReactNode } from "react";

export function Alert({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-2 rounded-md mt-auto shadow-2xl text-neutral-900 sticky bottom-0 top-0 self-start bg-gray-300">
      {children}
    </div>
  );
}
