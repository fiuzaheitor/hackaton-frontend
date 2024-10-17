import React, {useState} from "react";
import './styles.scss';
import Button from "../Button";
import {X} from 'react-feather'
import Input from "../Input";

interface PopupProps {
    show: boolean;
    title?: string;
    onClick?: () => void;
    dateInput?: boolean;
}

export const Popup: React.FC<PopupProps> = ({ show, title, onClick, dateInput}) => {
    const [value, setValue] = useState(0)
    

    return (
        <div className="popup__overlay">
            <div className="popup__content">
                <Button type="button" Icon={<X/>} onClick={onClick} onlyIcon/>
                {title && <h2>{title}</h2>}
                <div className="popup__body">
                    <div className="popup__input">
                        {dateInput?<Input placeholder="Data de consulta" label="Data da Consulta" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}/>
                        :<Input placeholder="Quantidade de Semanas" label="Semana da primeira consulta" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}/>}
                    </div>
                    <Button type="button" text="Confirmar" onClick={onClick}/>
                </div>
            </div>
        </div>
    );
};
