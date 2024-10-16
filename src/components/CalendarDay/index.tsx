import React from 'react';
import './styles.scss';

export const CalendarDay: React.FC<{ day: number, isToday: boolean, isEventDay: boolean }> = ({ day, isToday, isEventDay }) => {
  return (
    <div className={`calendar-day ${isToday ? 'today' : ''} ${isEventDay&&"event-day"}`}>
      <div>{day}</div>
    </div>
  );
};
