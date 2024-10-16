import React, {useState} from "react";
import './styles.scss'
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/Button";
import { DashboardTask } from "../../../components/DashboardTask";
import {ChevronDown, PlusSquare} from 'react-feather'

export const Home: React.FC = () => {
    const auth = JSON.parse(getCookie('_bu_l') as string)
    const [viewFilter, setViewFilter] = useState<Boolean>(true)

    return (
        <section className="container">
            <Header />
            <div className="container__home">
                <div className="home__side">
                    <Calendar />
                    <div className="side__filter">
                        <div className="filter__header">
                            <h2>Calendário</h2>
                            <div className={`header__buttons ${viewFilter&&"header__buttons--open"}`}>
                                <Button onlyIcon type="button" Icon={<ChevronDown />} onClick={() => setViewFilter(!viewFilter)}/>
                            </div>
                        </div>
                        <div className={`filter__content ${viewFilter&&"filter__content--open"}`}>
                            <div className="content__item">
                                <span>Eventos</span>
                                <span>5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home__content">
                    <div className="home__title">
                        <h1>16 de Outubro de 2024</h1>
                        <div className="home__buttons">
                            <Button text="Add" type="button" Icon={<PlusSquare color="#fff"/>}/>
                        </div>
                    </div>
                    <div className="home__dashboard">
                        <DashboardTask title="Titulo da Task" description="Descrição da task" hour="20" minute="30" date=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}

