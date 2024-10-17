import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";
import { Check, Trash, Edit2 } from "react-feather";
import { PopupWeek } from "../PopUpWeek";
import { CheckboxItem } from "../CheckboxItem";

interface DashboardTaskProps {
  title: string;
  description: string;
  date: string;
}

export const DashboardTask: React.FC<DashboardTaskProps> = ({
  title,
  description,
  date,
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
        <h2>Manhã</h2>
        <span>{date}</span>
      </div>
      <div className="task__info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="task__func">
        <CheckboxItem
          name="Concluído"
          onChange={() => {
            setConfirm(!confirm);
            setShowPopup(confirm);
          }}
        />
      </div>
    </div>
  );
};
