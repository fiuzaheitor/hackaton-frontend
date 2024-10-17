// components/SideFilter.tsx
import React from "react";
import Button from "../Button";
import { ChevronDown } from "react-feather";
import { CheckboxItem } from "../CheckboxItem";
import "./styles.scss";

interface SideFilterProps {
  viewFilter: boolean;
  setViewFilter: (state: boolean) => void;
  currentScheduleSelection: string;
  setCurrentScheduleSelection: (state: string) => void;
}

export const SideFilter: React.FC<SideFilterProps> = ({
  viewFilter,
  setViewFilter,
  currentScheduleSelection,
  setCurrentScheduleSelection,
}) => {
  return (
    <div className="side__filter">
      <div className="filter__header">
        <h2>Calendário</h2>
        <div
          className={`header__buttons ${viewFilter && "header__buttons--open"}`}
        >
          <Button
            onlyIcon
            type="button"
            Icon={<ChevronDown />}
            onClick={() => setViewFilter(!viewFilter)}
          />
        </div>
      </div>
      <div className={`filter__content ${viewFilter && "filter__content--open"}`}>
        <div className="content__item">
          <CheckboxItem
            name="Maternidade"
            checked={currentScheduleSelection === "Maternidade"}
            setChecked={() => setCurrentScheduleSelection("Maternidade")}
          />
          <CheckboxItem
            name="Infantil"
            checked={currentScheduleSelection === "Infantil"}
            setChecked={() => setCurrentScheduleSelection("Infantil")}
          />
        </div>
      </div>
    </div>
  );
};
