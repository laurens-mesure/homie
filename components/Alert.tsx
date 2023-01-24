import { ReactNode } from "react";

export function Alert({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-2 rounded-md mt-auto shadow-2xl text-gray-300 sticky bottom-0 top-0 self-start bg-sky-900">
      {children}
    </div>
  );
}
