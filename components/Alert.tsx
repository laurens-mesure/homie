import { ReactNode } from "react";

export function Alert({ children }: { children: ReactNode }) {
  return (
    <div className="p-5 rounded-md shadow-2xl bg-[#0f0c1d] sticky top-10 bottom-10 mx-auto min-w-[20vw]">
      {children}
      <div className="absolute -top-1 -right-1 h-3 w-3">
        <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75 top-0 right-0"></span>
        <span className="absolute h-full w-full rounded-full bg-red-500 top-0 right-0"></span>
      </div>
    </div>
  );
}
