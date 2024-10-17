import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";
import { Check, Trash, Edit2 } from "react-feather";
import { PopupWeek } from "../PopUpWeek";
import { CheckboxItem } from "../CheckboxItem";

interface DashboardTaskProps {
  title: string;
  id: string;
  description: string;
  date: string;
  onClick: any,
  isFinished: boolean
  showCheckbox: boolean
}

export const DashboardTask: React.FC<DashboardTaskProps> = ({
  title,
  id,
  description,
  date,
  onClick,
  isFinished,
    showCheckbox
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  return (
    <div className="dashboard__task">
      {showPopup && (
        <PopupWeek
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          title="Editar Tarefa"
          onClick={() => setShowPopup(!showPopup)}
          dateInput
        />
      )}
      <div className="task__time">
        <h2>Dia todo</h2>
        <span>{date}</span>
      </div>
      <div className="task__info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="task__func">
      {showCheckbox &&
        <CheckboxItem
            name="Concluído"
            onChange={() => onClick(id)}
            checked={isFinished}
            />
        }
        </div>
    </div>
  );
};
