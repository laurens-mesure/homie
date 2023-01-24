import { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { useMacStore } from "../stores/macStore";

export function AddRows() {
  const { macs, saves, setStore } = useMacStore();
  const allMacs = Array.from(new Set([...macs, ...saves.map((save) => save.mac)]));

  function saveMac(e: FormEvent<HTMLFormElement>, uuid?: string) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString();
    const mac = data.get("mac")?.toString();

    if (name == null || !mac || mac === "") return;

    const uniqueSaves = new Map(saves.map((save) => [save.index, save]));

    if (name === "" && uuid) {
      uniqueSaves.delete(uuid);
    } else {
      const newUuid = uuidv4();
      uniqueSaves.set(newUuid, { name, mac, index: newUuid });
    }

    localStorage.setItem("saves", JSON.stringify(Array.from(uniqueSaves.values())));
    setStore({ saves: Array.from(uniqueSaves.values()) });
  }

  return (
    <ol className="w-full">
      {saves.map((save) => (
        <li className="h-[5vh] border-b border-gray-300 px-5 first:border-y" key={save.index}>
          <form className="flex h-full w-full flex-row" onBlur={(e) => saveMac(e, save.index)}>
            <input
              autoComplete="off"
              className="h-full w-full border border-transparent bg-transparent text-lg text-gray-300 outline-none placeholder:opacity-20"
              defaultValue={save.name}
              name="name"
              placeholder={"Some random name 🎄"}
            />
            <MacAddresses allMacs={allMacs} defaultValue={save.mac} />
          </form>
        </li>
      ))}
    </ol>
  );
}

export function MacAddresses({
  allMacs,
  defaultValue,
}: {
  allMacs: string[];
  defaultValue?: string;
}) {
  return (
    <select
      className="w-1/4 bg-transparent text-gray-300 hover:text-yellow-600"
      defaultValue={defaultValue}
      name="mac"
    >
      {allMacs.map((mac) => (
        <option key={mac} value={mac}>
          {mac}
        </option>
      ))}
    </select>
  );
}
