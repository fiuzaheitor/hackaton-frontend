import React, { useState } from "react";
import "./styles.scss";
import {
  useGetConsultations,
  useGetConsultationsByGestation,
  useGetGestationsByUser,
  useGetKidsByMom,
  useGetVaccineCardByKid,
  useGetVaccineTemplates,
} from "../../utils/Queries";
import { CalendarDay } from "../CalendarDay";
import { getCookie } from "../../utils/cookies";
import { set } from "react-datepicker/dist/date_utils";

export const Calendar: React.FC<{ onClick: any; filter: string }> = ({
  onClick,
  filter,
}) => {
  const feather = require("feather-icons");
  const auth = JSON.parse(getCookie("_bu_l") as string);
  const [selectedDay, setSelectedDay] = useState("");

  const {
    data: dataUserGestations,
    loading: loadingUserGestations,
    error: errorUserGestations,
  } = useGetGestationsByUser(auth?.ui);
  const {
    data: dataConsultationsByGestation,
    loading: loadingConsultationsByGestation,
    error: errorConsultationsByGestation,
  } = useGetConsultationsByGestation(
    dataUserGestations?.gestationsByMom?.[0]?.id,
  );

  const {
    data: dataUserKids,
    loading: loadingUserKids,
    error: errorUserKids,
  } = useGetKidsByMom(auth?.ui);

    const {
        data: dataVaccineTemplates,
        loading: loadingVaccineTemplates,
        error: errorVaccineTemplates,
    } = useGetVaccineTemplates();

    const {
        data: dataConsultationsByKid,
        loading: loadingConsultationsByKid,
        error: errorConsultationsByKid,
    } = useGetVaccineCardByKid(dataUserKids?.kidsByMom?.[0]?.id);
    console.log(dataVaccineTemplates);

  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const daysBetween = Math.floor(
      (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
    );
    return Math.ceil((daysBetween + startOfYear.getDay() + 1) / 7);
  };

  const currentWeek = getWeekNumber(currentDate);

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const today = new Date();

    const dayElements = [];

    // Adicionar os dias vazios antes do início do mês
    for (let i = 0; i < firstDay; i++) {
      dayElements.push(<div className="empty-day" key={`empty-${i}`} />);
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day); // Data correta do loop
      const isToday = date.toDateString() === today.toDateString();

      let isEventDay = false;
      if (filter === "Maternidade") {
        dataConsultationsByGestation?.consultationsByGestation.map(
          (consultation: any) => {
            const consultationDate = new Date(consultation.date);
            if (date.toDateString() === consultationDate.toDateString()) {
              isEventDay = true;
            }
          },
        );
      } else if (filter === "Infantil") {
        const birthDate = new Date(dataUserKids.kidsByMom[0].birthDate);
        console.log(birthDate.toDateString())
        console.log(dataUserKids.kidsByMom[0].birthDate);
        console.log(dataVaccineTemplates.vaccineTemplates[10]);
        
      }

      dayElements.push(
        <CalendarDay
          date={date.toDateString()}
          selectedDay={selectedDay===date.toDateString()}
          key={day}
          day={day}
          isToday={isToday}
          isEventDay={isEventDay}
          onClick={(date: any) => {onClick(date); setSelectedDay(date)}}
        />,
      );
    }

    return dayElements;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1,
    );
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>
          {currentDate
            .toLocaleString("default", { month: "long" })
            .substring(0, 1)
            .toUpperCase() +
            currentDate
              .toLocaleString("default", { month: "long" })
              .substring(1, 3) +
            " " +
            currentDate.toLocaleString("default", { year: "numeric" })}
        </h2>
        <div className="header-buttons">
          <button
            onClick={() => changeMonth(-1)}
            dangerouslySetInnerHTML={{
              __html: feather.icons["chevron-left"].toSvg(),
            }}
          ></button>
          <button
            onClick={() => changeMonth(1)}
            dangerouslySetInnerHTML={{
              __html: feather.icons["chevron-right"].toSvg(),
            }}
          ></button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekday">Dom</div>
        <div className="calendar-weekday">Seg</div>
        <div className="calendar-weekday">Ter</div>
        <div className="calendar-weekday">Qua</div>
        <div className="calendar-weekday">Qui</div>
        <div className="calendar-weekday">Sex</div>
        <div className="calendar-weekday">Sáb</div>
        {renderDays()}
      </div>
    </div>
  );
};
