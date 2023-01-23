import { ReactNode } from "react";
import { Alert } from "./Alert";
import { Refresh } from "./Refresh";

export function PeopleCards() {
  return (
    <div className="relative h-screen flex flex-col w-full">
      <Refresh />
      <Alert>
        <h2 className="text-center text-gray-300 font-bold">Dad arrived!</h2>
      </Alert>
      <h1 className="text-white font-bold text-center text-6xl py-[20vh]">
        Who's home?
      </h1>
      <ul className="group flex flex-row gap-20 flex-wrap w-full justify-around">
        <Card>
          <CardTitle>Mom</CardTitle>
          <CardDescription>Arrived at 16:43</CardDescription>
        </Card>

        <Card>
          <CardTitle>Dad</CardTitle>
          <CardDescription>Arrived at 18:43</CardDescription>
        </Card>

        <Card>
          <CardTitle>Simba 🐕</CardTitle>
          <CardDescription>Arrived at 18:43</CardDescription>
        </Card>
      </ul>
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl text-center uppercase font-black font-sans mb-4 min-w-[15vw]">
      {children}
    </h2>
  );
}

function CardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="relative text-center opacity-0 group-hover:opacity-100 translate-y-5 ease-in-out group-hover:translate-y-0 transition-all duration-150">
      {children}
    </p>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-2xl bg-[#D5CEA3] p-10 text-neutral-800 font-bold shadow-2xl cursor-default">
      {children}
    </li>
  );
}
