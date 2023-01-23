import { ReactNode } from "react";
import { AddRows } from "../components/AddRows";
import { PeopleCards } from "../components/PeopleCards";

export default function Home() {
  return (
    <>
      <PeopleCards />
      <AddRows />
    </>
  );
}
