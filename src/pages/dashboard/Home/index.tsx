import React, {useEffect, useState} from "react";
import './styles.scss'
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/Button";
import { DashboardTask } from "../../../components/DashboardTask";

import { useGetConsultationsByGestation, useGetGestationsByUser, useGetKidsByMom, useGetUsers } from "../../../utils/Queries";

import { useMutation } from "@apollo/client";
import { M_CREATE_CONSULTATION, M_CREATE_GESTATION, M_CREATE_KID, M_CREATE_VACCINE_CARD, M_UPDATE_CONSULTATION, M_UPDATE_GESTATION } from "../../../graphql/Mutations";
import {ChevronDown, Filter, PlusSquare} from 'react-feather'
import { FilterItem } from "../../../components/FilterItem";

export const Home: React.FC = () => {
    const dashboardItems = '123';
    const auth = JSON.parse(getCookie('_bu_l') as string)
    const [viewFilter, setViewFilter] = useState<Boolean>(true)
    const [selectedFilter, setSelectedFilter] = useState<any>(new Date().toDateString())

    console.log("filtro:" + selectedFilter)

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

    const [updateGestation] = useMutation(M_UPDATE_GESTATION) 

    const UpdateGestation = async (gestationId: any, data: any) => {
        try {
            const newGestation = updateGestation({
                variables: {
                    id: gestationId,
                    data: data
                }
            }).then((res) => {
                console.log(res)
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const [createKid] = useMutation(M_CREATE_KID)

    const CreateKid = async (momId: any, name: any, birthDate: any) => {
        try {
            const newKid = createKid({
                variables: {
                    data: {
                        mom: momId,
                        name: name,
                        birthDate: birthDate,
                    }
                }
            }).then((res) => {
                return res.data.createKid.id
            })
            console.log(newKid)
            return newKid

        } catch (err: any) {
            console.log(err.message)
        }
    }

    const [createVaccineCard] = useMutation(M_CREATE_VACCINE_CARD)

    const CreateVaccineCard = async (kidId: any) => {
        try {
            const newVaccineCard = createVaccineCard({
                variables: {
                    data: {
                        kid: kidId,
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
        let currentWeek = 12
        let consultations: any = [];

        if (currentWeek === undefined) {
            console.error("Gestação não encontrada.");
            return; // Sai da função se não houver gestação
        }
    
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

    const handleFinishGestation = async (gestationId: any, hasBorn: any, kidName: any) => {
        const gestation = dataUserGestations?.gestationsByMom?.find((gestation: any) => gestation.id === gestationId);
        
        if (gestation && hasBorn) {
            try {
                const kid: any = await CreateKid(auth?.ui, kidName, new Date().getTime());

                if (kid) {
                    await CreateVaccineCard(kid);
                } else {
                    console.error("Error: Kid creation returned undefined.");
                }
            } catch (error) {
                console.error("Error creating kid or vaccine card:", error);
            }
        } 
    
        UpdateGestation(gestationId, {
            isFinished: true
        })
    };

    useEffect(() => {
        if(dataConsultationsByGestation){
            dataConsultationsByGestation.consultationsByGestation.map((consultation: any) => {
                console.log(new Date(consultation.date).toLocaleDateString());
            })
        }
    }, [dataConsultationsByGestation])

    useEffect(() => {
        if (dataUserGestations?.gestationsByMom[0] !== undefined) {
            const gestation = dataUserGestations?.gestationsByMom[0];
    
            console.log('Gestação:', gestation); // Log da gestação
            console.log('Created At:', gestation.createdAt); // Log do createdAt
    
            const createdAtTimestamp = typeof gestation.createdAt === 'string' 
                ? new Date(gestation.createdAt).getTime() 
                : gestation.createdAt;
    
            console.log('Created At Timestamp:', createdAtTimestamp); // Log do timestamp convertido
    
            if (createdAtTimestamp > Date.now() + (60 * 60 * 24 * 7 * 1000)) {
                UpdateGestation(gestation.id, { week: gestation.week + 1 });
            }
        }
    }, [dataUserGestations])
    
    const formatDate = (date: any) => {
        const months = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const formattedDate = `${day} de ${month} de ${year}`;

        return formattedDate;
    }

    return (
        <section className="container">
            <Header />
            <div className="container__home">
                <div className="home__side">
                    <Calendar onClick={setSelectedFilter}/>
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
                        <h1>{formatDate(new Date(selectedFilter))}</h1>
                        <div className="home__buttons">
                            <Button text="Add" type="button" Icon={<PlusSquare color="#fff"/>} onClick={handleCreateCalendar}/>
                        </div>
                    </div>
                    <div className="home__dashboard">
                        {dataConsultationsByGestation?.consultationsByGestation.filter((consultation: any) => new Date(consultation.date).toDateString() === selectedFilter).length == 0?
                        <div className="dashboard__empty">
                            <h2>Não há eventos programados para esse dia!</h2>
                        </div>:
                        <div>
                            {
                                dataConsultationsByGestation?.consultationsByGestation.filter((consultation: any) => new Date(consultation.date).toDateString() === selectedFilter).map((consultation: any) => {
                                    return <DashboardTask title="Consulta" description={"Consulta da " + consultation?.week + "º semana de pré-natal." } date={new Date(consultation.date).toLocaleDateString()} />
                                })
                            }
                        </div>}
                            
                    </div>
                </div>
            </div>
        </section>
    )
}

