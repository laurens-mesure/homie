import { ReactNode } from "react";

export default function Home() {
  return (
    <ul className="group/item flex flex-row gap-20">
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
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl text-center uppercase font-black font-sans mb-10 min-w-[15vw]">
      {children}
    </h2>
  );
}

function CardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="relative text-center opacity-0 group-hover/item:opacity-100 translate-y-5 group-hover/item:translate-y-0 transition-all duration-150">
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
