import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";
import { X } from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../Input";

interface PopupProps {
  title?: string;
  onClick: any;
  consultationId: string;
  showPopup?: boolean;
  setShowPopup?: any;
}

export const PopupComplete: React.FC<PopupProps> = ({
  title,
  onClick,
  consultationId,
  showPopup,
  setShowPopup,
}) => {
  const [value, setValue] = useState<any>(null);

  const handleSubmit = () => {
    if (value) {
      onClick(consultationId, value); // Passa o ID da consulta e a data selecionada
      setShowPopup(null);
    }
  };

  return (
    <div className={`popup__overlay`}>
      <div className="popup__content">
        <Button
          type="button"
          Icon={<X />}
          onClick={() => setShowPopup(null)}
          onlyIcon
        />
        {title && <h2>{title}</h2>}
        <p>Essa ação é irreversível.</p>
        <div className="popup__body">
          <div className="popup__input">
            <DatePicker
              selected={value}
              onChange={(e) => setValue(e)} 
              dateFormat={"dd/MM/yyyy"}
            />
          </div>
          <Button type="button" text="Confirmar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
