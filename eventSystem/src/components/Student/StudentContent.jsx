import { useState } from "react";
import EventGrid from "./EventGrid";
import EventFilter from "./EventFilter";

export function StudentContent({ event }) {
  return (
    <>
      <div class="flex p-4 flex-col mt-[20px] ml-[30px] w-full gap-3">
          <EventFilter/>
          <EventGrid/>
      </div>
    </>
  );
}
