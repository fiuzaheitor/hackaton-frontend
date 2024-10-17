import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";
import { X } from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../Input";

export const PopupTextWithoutInputs: React.FC<{
  title?: string;
  description?: string;
  onClick?: any;
  showPopup?: boolean;
  setShowPopup?: any;
}> = ({ title, description, onClick, showPopup, setShowPopup }) => {
  const handleConfirm = () => {
    setShowPopup(!showPopup);
    onClick(false);
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
          <p>{description}</p>
          <Button
            type="button"
            text="Confirmar"
            onClick={() => handleConfirm()}
          />
        </div>
      </div>
    </div>
  );
};

export const PopupInitialWeekGenerateSchedule: React.FC<{
  title?: string;
  onClick: any;
  dateInput?: boolean;
  showPopup?: boolean;
  setShowPopup?: any;
}> = ({ title, onClick, dateInput, showPopup, setShowPopup }) => {
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

export const PopupCompleteConsultationWithDate: React.FC<{
  title?: string;
  onClick: any;
  consultationId: string;
  showPopup?: boolean;
  setShowPopup?: any;
}> = ({ title, onClick, consultationId, showPopup, setShowPopup }) => {
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

export const PopupFinishGestationGenerateKid: React.FC<{
  title?: string;
  onClick: any;
  showPopup?: boolean;
  setShowPopup?: any;
}> = ({ title, onClick, showPopup, setShowPopup }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    setShowPopup(!showPopup);
    onClick(true, value);
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
            <Input
              placeholder="Nome da criança"
              label="Nome da criança"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button type="button" text="Confirmar" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
