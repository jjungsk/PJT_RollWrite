import { getMonth, getYear } from "date-fns";
import React from "react";

interface Props {
  day: Date;
  setDay: React.Dispatch<React.SetStateAction<Date>>;
}
function DaySelect({ day }: Props) {
  return (
    <div>
      {getYear(day)}
      {getMonth(day)}
    </div>
  );
}

export default DaySelect;
