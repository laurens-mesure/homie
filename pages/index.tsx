import { AddRows } from "../components/AddRows";
import { Join } from "../components/Join";
import { PeopleCards } from "../components/PeopleCards";
import { useMacStore } from "../stores/macStore";

export default function Home() {
  const { seedLoading } = useMacStore();

  return (
    <>
      {seedLoading && (
        <div className="grid h-20 w-full place-items-center bg-neutral-800 text-center">
          <p>Seeding... This little maneuver&apos;s gonna cost us 51 years</p>
        </div>
      )}
      <Join />
      <PeopleCards />
      <AddRows />
    </>
  );
}
