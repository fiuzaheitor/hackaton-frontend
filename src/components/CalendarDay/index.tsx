import React from 'react';
import './styles.scss';

export const CalendarDay: React.FC<{ date: any, day: number, isToday: boolean, isEventDay: boolean, onClick: any }> = ({ date, day, isToday, isEventDay, onClick }) => {
  return (
    <div className={`calendar-day ${isToday ? 'today' : ''} ${isEventDay&&"event-day"}`} onClick={() => onClick(date)}>
      <div>{day}</div>
    </div>
  );
};
