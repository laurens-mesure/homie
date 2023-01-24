import { ReactNode } from "react";
import { Alert } from "./Alert";
import { Refresh } from "./Refresh";

export function PeopleCards() {
  return (
    <div className="relative h-screen flex flex-col w-full p-5">
      <Refresh />
      <h1 className="text-gray-300 font-bold text-center text-6xl py-[20vh]">
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
      <Alert>
        <h2 className="text-center text-lg font-bold">Dad arrived!</h2>
      </Alert>
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl text-center uppercase font-black font-sans min-w-[15vw]">
      {children}
    </h2>
  );
}

function CardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="relative text-center overflow-hidden h-0 group-hover:h-6 opacity-0 group-hover:opacity-100 translate-y-5 ease-in-out group-hover:translate-y-0 transition-all duration-150">
      {children}
    </p>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-2xl bg-[#0F3460] p-10 text-gray-300 font-bold cursor-default">
      {children}
    </li>
  );
}
