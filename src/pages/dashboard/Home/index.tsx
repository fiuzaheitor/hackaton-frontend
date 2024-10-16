import React, {useState} from "react";
import './styles.scss'
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/Button";
import { DashboardTask } from "../../../components/DashboardTask";
import { useGetGestationsByUser, useGetKidsByMom, useGetUsers } from "../../../utils/Queries";
import { useMutation } from "@apollo/client";
import { M_CREATE_CONSULTATION, M_CREATE_GESTATION, M_CREATE_KID, M_UPDATE_CONSULTATION } from "../../../graphql/Mutations";
import {ChevronDown, Filter, PlusSquare} from 'react-feather'
import { FilterItem } from "../../../components/FilterItem";

export const Home: React.FC = () => {
    const dashboardItems = '123';
    const auth = JSON.parse(getCookie('_bu_l') as string)
    const [viewFilter, setViewFilter] = useState<Boolean>(true)
    const [selectedFilter, setSelectedFilter] = useState<string>('')

    const {data: dataUserGestations, loading: loadingUserGestations, error: errorUserGestations} = useGetGestationsByUser(auth?.ui)

    const {data: dataUsers} = useGetUsers()
    console.log(auth?.ui)
    const {data: dataUserKids, loading: loadingUserKids, error: errorUserKids} = useGetKidsByMom(auth?.ui)

    const [createGestation] = useMutation(M_CREATE_GESTATION)

    const CreateGestation = async () => {
        try {
            const newGestation = createGestation({
                variables: {
                    data: {
                        userId: auth?.ui,
                        description: "Gestação...",
                        week: 0,
                        isFinished: false
                    }
                }
            }).then((res) => {
                console.log(res)
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const [createKid] = useMutation(M_CREATE_KID)

    const CreateKid = async () => {
        try {
            const newKid = createKid({
                variables: {
                    data: {
                        mom: auth?.ui,
                        name: "Nome do bebê",
                        birthDate: new Date(),
                    }
                }
            }).then((res) => {
                console.log(res)
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const [createConsultation] = useMutation(M_CREATE_CONSULTATION)

    const CreateConsultation = async (gestationId: any, date: any, week: any) => {
        try {
            const newConsultation = createConsultation({
                variables: {
                    data: {
                        gestation: "614d9b4d8a0f1b001f8e5d8b",
                        date: new Date(),
                        week: 0
                    }
                }
            }).then((res) => {
                console.log(res)
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const [updateConsultation] = useMutation(M_UPDATE_CONSULTATION)

    const UpdateConsultation = async () => {
        try {
            const newConsultation = updateConsultation({
                variables: {
                    id: "614d9b4d8a0f1b001f8e5d8b",
                    data: {
                        gestation: "614d9b4d8a0f1b001f8e5d8b",
                        date: new Date(),
                        week: 0
                    }
                }
            }).then((res) => {
                console.log(res)
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const handleCreateCalendar = () => {
        let currentWeek = dataUserGestations?.gestation[0].week;
        let consultations = new Array<any>();

        while (currentWeek <= 41) {  
            if (currentWeek <= 28){
                consultations.length > 0 ?
                consultations.push(consultations[-1].getTime() + (60 * 60 * 24 * 30 * 1000)) :
                consultations.push(Date.now() + (60 * 60 * 24 * 30 * 1000))
            } 
            else if (currentWeek <= 36){
                consultations.length > 0 ?
                consultations.push(consultations[-1].getTime() + (60 * 60 * 24 * 15 * 1000)) :
                consultations.push(Date.now() + (60 * 60 * 24 * 15 * 1000))
            } 
            else { 
                consultations.length > 0 ?
                consultations.push(consultations[-1].getTime() + (60 * 60 * 24 * 7 * 1000)) :
                consultations.push(Date.now() + (60 * 60 * 24 * 7 * 1000))
            } 
        }

        console.log(consultations)
    }

    // handleCreateCalendar()


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
                                <FilterItem name="Maternidade"/>
                                <FilterItem name="Infantil"/>
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
                        {!dashboardItems?
                        <div className="dashboard__empty">
                            <h2>Não há eventos programados para esse dia!</h2>
                        </div>:
                        <div>
                            <DashboardTask title="Titulo da Task" description="Descrição da task" hour="20" minute="30" date="16/10/2024"/>
                            <DashboardTask title="Titulo da Task" description="Descrição da task" hour="20" minute="30" date="16/10/2024"/>
                            <DashboardTask title="Titulo da Task" description="Descrição da task" hour="20" minute="30" date="16/10/2024"/>
                        </div>}
                            
                    </div>
                </div>
            </div>
        </section>
    )
}

