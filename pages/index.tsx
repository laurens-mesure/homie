import { AddRows } from "../components/AddRows";
import { Join } from "../components/Join";
import { PeopleCards } from "../components/PeopleCards";

export default function Home() {
  return (
    <>
      <Join />
      <PeopleCards />
      <AddRows />
    </>
  );
}
