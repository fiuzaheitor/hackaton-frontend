import React, {useEffect, useState} from "react";
import './styles.scss'
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/Button";
import { DashboardTask } from "../../../components/DashboardTask";
import {ChevronDown, PlusSquare} from 'react-feather'
import { useGetConsultationsByGestation, useGetGestationsByUser, useGetKidsByMom, useGetUsers } from "../../../utils/Queries";
import { useMutation } from "@apollo/client";
import { M_CREATE_CONSULTATION, M_CREATE_GESTATION, M_CREATE_KID, M_UPDATE_CONSULTATION } from "../../../graphql/Mutations";

export const Home: React.FC = () => {
    const auth = JSON.parse(getCookie('_bu_l') as string)
    const [viewFilter, setViewFilter] = useState<Boolean>(true)

    const {data: dataUserGestations, loading: loadingUserGestations, error: errorUserGestations} = useGetGestationsByUser(auth?.ui)
    const {data: dataConsultationsByGestation, loading: loadingConsultationsByGestation, error: errorConsultationsByGestation} = useGetConsultationsByGestation(dataUserGestations?.gestationsByMom[0]?.id)

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
                        gestation: gestationId,
                        date: date,
                        week: week
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
                        week: 1
                    }
                }
            }).then((res) => {
                console.log(res)
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const handleWeekend = (date: any) => {
        let day = new Date(date).getDay()
        if (day === 0) {
            return date + (60 * 60 * 24 * 1 * 1000)
        }
        if (day === 6) {
            return date - (60 * 60 * 24 * 1 * 1000)
        }

        return date
    }

    const calculateNextConsultationDate = (currentWeek: number, lastConsultationDate: number) => {
        let intervalDays;
    
        if (currentWeek <= 28) {
            intervalDays = 30; // 4 semanas
        } else if (currentWeek <= 36) {
            intervalDays = 15; // 2 semanas
        } else {
            intervalDays = 7; // 1 semana
        }
    
        return handleWeekend(lastConsultationDate + (60 * 60 * 24 * intervalDays * 1000));
    };
    
    const handleCreateCalendar = () => {
        let currentWeek = dataUserGestations?.gestationsByMom[0].week;
        let consultations: any = [];
    
        while (currentWeek <= 41) {
            currentWeek += currentWeek <= 28 ? 4 : currentWeek <= 36 ? 2 : 1;
            
            const lastConsultationDate = consultations.length > 0 
                ? consultations[consultations.length - 1].date 
                : Date.now();
            
            const nextDate = calculateNextConsultationDate(currentWeek, lastConsultationDate);
            
            consultations.push({
                "date": nextDate,
                "week": currentWeek
            });
        }
    
        consultations.map((consultation: any) => {
            console.log(new Date(consultation.date).toLocaleDateString());
            CreateConsultation(dataUserGestations?.gestationsByMom[0]?.id, consultation?.date, consultation?.week);
        });
    };
    
    const handleUpdateCalendar = (date: any, consultationId: any) => {
        const consultations = dataConsultationsByGestation?.consultationsByGestation.filter((consultation: any) => !consultation.isFinished);
    
        const selectedConsultation = consultations.find((consultation: any) => consultation.id === consultationId);
        if(selectedConsultation.date !== date) {
            consultations.map((consultation: any) => {
                console.log(new Date(calculateNextConsultationDate(consultation.week, date)));
            });
        }
    };
    

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
                            <Button text="Add" type="button" Icon={<PlusSquare color="#fff"/>} onClick={handleCreateCalendar}/>
                        </div>
                    </div>
                    <div className="home__dashboard">
                        <DashboardTask title="Titulo da Task" description="Descrição da task" hour="20" minute="30" date="16/10/2024"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

