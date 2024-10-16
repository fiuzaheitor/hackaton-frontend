import React, {useState} from "react";
import './styles.scss';
import Button from "../Button";
import {X} from 'react-feather'
import Input from "../Input";

interface PopupProps {
    show: boolean;
    title?: string;
    onClick?: () => void;
}

export const Popup: React.FC<PopupProps> = ({ show, title, onClick}) => {
    const [weeks, setWeeks] = useState(0)

    return (
        <div className="popup__overlay">
            <div className="popup__content">
                <Button type="button" onlyIcon Icon={<X />} onClick={onClick}/>
                {title && <h2>{title}</h2>}
                <div className="popup__body">
                    <div className="popup__weeks">
                        <Input placeholder="Quantidade de Semanas" label="Semana da primeira consulta" type="number" value={weeks} onChange={(e) => setWeeks(Number(e.target.value))}/>
                    </div>
                </div>
                <Button type="button" text="Confirmar" onClick={onClick}/>
            </div>
        </div>
    );
};
