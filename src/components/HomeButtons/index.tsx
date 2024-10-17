// components/HomeButtons.tsx
import React from "react";
import Button from "../Button";
import { AlertTriangle, PlusCircle, PlusSquare, Download } from "react-feather";
import "./styles.scss";

interface HomeButtonsProps {
  currentScheduleSelection: string;
  dataUserGestations: any;
  setIsOpenPopupStartSchedule: (state: boolean) => void;
  setIsOpenPopupLostBaby: (state: boolean) => void;
  setIsOpenPopupGenerateKid: (state: boolean) => void;
}

export const HomeButtons: React.FC<HomeButtonsProps> = ({
  currentScheduleSelection,
  dataUserGestations,
  setIsOpenPopupStartSchedule,
  setIsOpenPopupLostBaby,
  setIsOpenPopupGenerateKid,
}) => {
  return (
    <div className="home__buttons">
      {currentScheduleSelection === "Maternidade" && (
        <>
          {dataUserGestations?.gestationsByMom.length == 0 ? (
            <Button
              text="Iniciar"
              type="button"
              Icon={<PlusSquare color="#fff" />}
              onClick={() => setIsOpenPopupStartSchedule(true)}
            />
          ) : (
            <div className="buttons__with__gestation">
              <Button
                text="Perdi"
                type="button"
                Icon={<AlertTriangle color="#fff" />}
                onClick={() => setIsOpenPopupLostBaby(true)}
              />
              <Button
                text="Nasceu"
                type="button"
                Icon={<PlusCircle color="#fff" />}
                onClick={() => setIsOpenPopupGenerateKid(true)}
              />
            </div>
          )}
        </>
      )}

      {currentScheduleSelection === "Infantil" && (
        <Button
          text="Exportar"
          type="button"
          Icon={<Download color="#fff" />}
          onClick={() => {}}
        />
      )}
    </div>
  );
};
