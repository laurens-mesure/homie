import { FormEvent } from "react";

import { SavedMacs } from "../pages/_app";
import { useMacStore } from "../stores/macStore";

export function AddRows() {
  const { macs, saves } = useMacStore();
  const freeMacs = macs.filter((mac) => !saves.find((savedMac) => savedMac.mac === mac));
  const allMacs = Array.from(new Set([...macs, ...saves.map((save) => save.mac)]));

  function saveMac(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString();
    const mac = data.get("mac")?.toString();

    console.log(name, mac);

    if (name == null || !mac || mac === "") return;

    const saves: SavedMacs = JSON.parse(localStorage.getItem("saves") || "[]");

    if (name === "") {
      return localStorage.setItem(
        "saves",
        JSON.stringify(saves.filter((save) => save.mac !== mac))
      );
    }

    saves.push({ name, mac });
    localStorage.setItem("saves", JSON.stringify(saves));
  }

  return (
    <ol className="w-full">
      {saves.map((save) => (
        <li className="h-[5vh] border-b border-gray-300 px-5 first:border-y" key={save.mac}>
          <form className="flex h-full w-full flex-row" onBlur={saveMac}>
            <input
              autoComplete="off"
              className="h-full w-full border border-transparent bg-transparent text-lg text-gray-300 outline-none placeholder:opacity-20"
              defaultValue={save.name}
              name="name"
              placeholder={"Some random name 🎄"}
            />
            <MacAddresses allMacs={allMacs} />
          </form>
        </li>
      ))}
      {freeMacs.map((mac) => (
        <li className="h-[5vh] border-b border-gray-300 px-5 first:border-y" key={mac}>
          <form className="flex h-full w-full flex-row" onBlur={saveMac}>
            <input
              autoComplete="off"
              className="h-full w-full border border-transparent bg-transparent text-lg text-gray-300 outline-none placeholder:opacity-20"
              name="name"
              placeholder={"Some random name 🎄"}
            />
            <MacAddresses allMacs={allMacs} />
          </form>
        </li>
      ))}
    </ol>
  );
}

export function MacAddresses({ allMacs }: { allMacs: string[] }) {
  return (
    <select className="w-1/4 bg-transparent text-gray-300 hover:text-yellow-600" name="mac">
      {allMacs.map((mac) => (
        <option key={mac} value={mac}>
          {mac}
        </option>
      ))}
    </select>
  );
}
