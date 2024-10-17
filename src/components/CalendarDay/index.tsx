import React from "react";
import "./styles.scss";

export const CalendarDay: React.FC<{
  date: any;
  day: number;
  isToday: boolean;
  isEventDay: boolean;
  onClick: any;
  selectedDay: boolean;
}> = ({ date, day, isToday, isEventDay, onClick, selectedDay }) => {
  return (
    <div
      className={`calendar-day ${isToday ? "today" : ""} ${isEventDay && "event-day"} ${selectedDay && "selected"} `}
      onClick={() => onClick(date)}
    >
      <div>{day}</div>
    </div>
  );
};
