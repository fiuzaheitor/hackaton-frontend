import React from 'react'
import './styles.scss'
import Button from '../Button'
import { Check, Trash, Edit2 } from 'react-feather'

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
                <h2>{hour}:{minute}</h2>
                <span>{date}</span>
            </div>
            <div className="task__info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="task__func">
                <Button Icon={<Check/>} type="button" onlyIcon/>
                <Button Icon={<Edit2/>} type="button" onlyIcon/>
                <Button Icon={<Trash/>} type="button" onlyIcon/>
            </div>
        </div>
    )
}
