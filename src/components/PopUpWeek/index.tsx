import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";
import { X } from "react-feather";
import Input from "../Input";

interface PopupProps {
  title?: string;
  onClick: any;
  dateInput?: boolean;
  showPopup?: boolean;
  setShowPopup?: any;
}

export const PopupWeek: React.FC<PopupProps> = ({
  title,
  onClick,
  dateInput,
  showPopup,
  setShowPopup,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    setShowPopup(!showPopup);
    onClick(value);
  };

  return (
    <div className={`popup__overlay`}>
      <div className="popup__content">
        <Button
          type="button"
          Icon={<X />}
          onClick={() => setShowPopup(!showPopup)}
          onlyIcon
        />
        {title && <h2>{title}</h2>}
        <div className="popup__body">
          <div className="popup__input">
            {dateInput ? (
              <Input
                placeholder="Data de consulta"
                label="Data da Consulta"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            ) : (
              <Input
                placeholder="Quantidade de Semanas"
                label="Semana da primeira consulta"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}
          </div>
          <Button type="button" text="Confirmar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
