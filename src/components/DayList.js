import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let array = props.days.map((day) => {
    const selected = props.value === day.name;
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={selected}
        setDay={() => props.onChange(day.name)}
      />
    );
  });
  return <ul>{array}</ul>;
}