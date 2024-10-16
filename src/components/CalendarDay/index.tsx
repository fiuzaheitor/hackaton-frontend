import React from 'react';
import './styles.scss';

export const CalendarDay: React.FC<{ day: number, isCurrentWeek: boolean, isToday: boolean }> = ({ day, isCurrentWeek, isToday }) => {
  return (
    <div className={`calendar-day ${isCurrentWeek ? 'current-week' : ''} ${isToday ? 'today' : ''}`}>
      <div>{day}</div>
    </div>
  );
};
