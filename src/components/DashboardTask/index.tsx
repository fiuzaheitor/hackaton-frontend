import React from 'react'
import './styles.scss'
import Button from '../Button'

interface DashboardTaskProps {
    title: string
    description: string
    date: string
    hour: string
    minute: string
}

export const DashboardTask: React.FC<DashboardTaskProps> = ({title, description, date, hour, minute}) => {
    return (
        <div className="dashboard__task">
            <div className="task__time">
                <h2>{hour}:</h2>
                <h2>{minute}</h2>
                <span>{date}</span>
            </div>
            <div className="task__info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="task__func">
                <Button text="Concluir" type="button"/>
                <Button text="Editar" type="button"/>
                <Button text="Excluir" type="button"/>
            </div>
        </div>
    )
}
