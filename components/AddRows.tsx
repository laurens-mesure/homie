import { faker } from "@faker-js/faker";

const entries = Array.from(Array(20)).map(() => ({
  name: faker.name.fullName(),
  mac: faker.internet.mac(),
}));

export function AddRows() {
  return (
    <ol className="h-screen overflow-auto w-full">
      {entries.map((key) => (
        <li
          key={key.name}
          className="h-[5vh] border-b first:border-y border-gray-300 px-5"
        >
          <form className="flex flex-row h-full w-full">
            <input
              className="bg-transparent text-gray-300 w-full border h-full border-transparent text-lg outline-none placeholder:opacity-20"
              name="name"
              autoComplete="off"
              placeholder={key.name}
            />
            <MacAddresses />
          </form>
        </li>
      ))}
    </ol>
  );
}

export function MacAddresses() {
  return (
    <select
      className="w-1/4 bg-transparent text-gray-300 hover:text-yellow-600"
      name="mac"
    >
      {entries.map((entry) => (
        <option value={entry.mac}>{entry.mac}</option>
      ))}
    </select>
  );
}
