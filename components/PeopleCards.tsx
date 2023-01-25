import { ReactNode } from "react";
import clsx from "clsx";

import { Homie, useMacStore } from "../stores/macStore";

import { AlertStack } from "./AlertStack";
import { Refresh } from "./Refresh";

export function PeopleCards() {
  const { homies } = useMacStore();

  const _homies = homies.filter((homie) => homie.name !== "");

  return (
    <div className="relative flex h-screen w-full flex-col p-5">
      <Refresh />
      <h1 className="py-[20vh] text-center text-6xl font-bold text-gray-300">Who&apos;s home?</h1>
      <ul className="group flex w-full flex-row flex-wrap justify-around gap-20">
        {!_homies.length && (
          <p className="text-center text-2xl font-bold text-gray-300/40">
            Nobody is home sadface 😢
          </p>
        )}
        {_homies.map((homie) => (
          <Card homie={homie} key={homie.mac}>
            <CardTitle>{homie.name}</CardTitle>
            <CardDescription>
              {homie.ghost
                ? `Last seen at ${homie.updatedAt.toLocaleTimeString()}`
                : `Arrived at ${homie.createdAt.toLocaleTimeString()}`}
            </CardDescription>
          </Card>
        ))}
      </ul>
      <AlertStack />
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="min-w-[15vw] text-center font-sans text-2xl font-black uppercase">{children}</h2>
  );
}

function CardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="relative h-0 translate-y-5 overflow-hidden text-center opacity-0 transition-all duration-150 ease-in-out group-hover:h-6 group-hover:translate-y-0 group-hover:opacity-100">
      {children}
    </p>
  );
}

function Card({ children, homie }: { children: ReactNode; homie: Homie }) {
  return (
    <li
      className={clsx(
        "cursor-default rounded-2xl bg-[#0F3460] p-10 font-bold text-gray-300 transition-opacity duration-300",
        homie.ghost && "opacity-50"
      )}
    >
      {children}
    </li>
  );
}
