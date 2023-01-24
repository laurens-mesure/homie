import { useMacStore } from "../stores/macStore";

export function AddRows() {
  const { macs } = useMacStore();

  return (
    <ol className="w-full">
      {macs.map((mac) => (
        <li
          key={mac}
          className="h-[5vh] border-b first:border-y border-gray-300 px-5"
        >
          <form className="flex flex-row h-full w-full">
            <input
              className="bg-transparent text-gray-300 w-full border h-full border-transparent text-lg outline-none placeholder:opacity-20"
              name="name"
              autoComplete="off"
              placeholder={"Some random name 🎄"}
            />
            <MacAddresses />
          </form>
        </li>
      ))}
    </ol>
  );
}

export function MacAddresses() {
  const { macs } = useMacStore();

  return (
    <select
      className="w-1/4 bg-transparent text-gray-300 hover:text-yellow-600"
      name="mac"
    >
      {macs.map((mac) => (
        <option key={mac} value={mac}>
          {mac}
        </option>
      ))}
    </select>
  );
}
