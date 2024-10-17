import React, {useState} from "react";
import './styles.scss';
import Button from "../Button";
import {X} from 'react-feather'
import Input from "../Input";

interface PopupProps {
    title?: string;
    onClick?: any;
    dateInput?: boolean;
    showPopup?: boolean;
    setShowPopup?: any;
    alert?: boolean;
    alertMessage?: string;
}

export const Popup: React.FC<PopupProps> = ({ title, onClick, dateInput, showPopup, setShowPopup, alert, alertMessage}) => {
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        setShowPopup(!showPopup)
        onClick(value)
    }
    
    return (
        <div className={`popup__overlay`}>
            <div className="popup__content">
                <Button type="button" Icon={<X/>} onClick={() => setShowPopup(!showPopup)} onlyIcon/>
                {title && <h2>{title}</h2>}
                <div className="popup__body">
                    {alert?
                    <div className="popup__alert">
                        {alertMessage}
                    </div>:
                    <div>
                        <div className="popup__input">
                            {dateInput?<Input placeholder="Data de consulta" label="Data da Consulta" type="number" value={value} onChange={(e) => setValue(e.target.value)}/>
                            :<Input placeholder="Quantidade de Semanas" label="Semana da primeira consulta" type="number" value={value} onChange={(e) => setValue(e.target.value)}/>}
                        </div>
                        <Button type="button" text="Confirmar" onClick={handleSubmit}/>
                    </div>}
                </div>
            </div>
        </div>
    );
};
