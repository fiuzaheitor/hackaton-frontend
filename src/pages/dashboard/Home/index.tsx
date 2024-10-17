// pages/Home.tsx
import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";
import { getCookie } from "../../../utils/cookies";
import { useGestationMutations } from "../../../hooks/useGestationMutations";
import {
  useGetConsultationsByGestation,
  useGetGestationsByUser,
  useGetKidsByMom,
  useGetVaccineCardByKid,
  useGetVaccinesByVaccineCard,
  useGetVaccineTemplates,
  useGetUser,
} from "../../../utils/Queries";
import { HomeButtons } from "../../../components/HomeButtons";
import { DashboardTasks } from "../../../components/Dashboard";
import { SideFilter } from "../../../components/SideFilter";
import {
  PopupInitialWeekGenerateSchedule,
  PopupCompleteConsultationWithDate,
  PopupTextWithoutInputs,
  PopupFinishGestationGenerateKid,
} from "../../../components/Popup";
import { sendMessage } from "../../../hooks/useSendMessage";

export const Home: React.FC = () => {
  const [isOpenPopupStartSchedule, setIsOpenPopupStartSchedule] =
    useState(false);
  const [isOpenPopupLostBaby, setIsOpenPopupLostBaby] = useState(false);
  const [isOpenPopupGenerateKid, setIsOpenPopupGenerateKid] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);

  const auth = JSON.parse(getCookie("_bu_l") as string);
  const [viewFilter, setViewFilter] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<any>(
    new Date().toDateString(),
  );
  const [currentScheduleSelection, setCurrentScheduleSelection] =
    useState<any>("Maternidade");

  const {
    createConsultationMutation,
    createGestationMutation,
    createKidMutation,
    createVaccineCardMutation,
    createVaccineMutation,
    updateConsultationMutation,
    updateGestationMutation,
  } = useGestationMutations();

  const { data: dataUserGestations } = useGetGestationsByUser(auth?.ui);
  const { data: dataConsultationsByGestation } = useGetConsultationsByGestation(
    dataUserGestations?.gestationsByMom?.filter(
      (gestation: any) => !gestation.isFinished,
    )[0]?.id,
  );
  const { data: dataUserKids } = useGetKidsByMom(auth?.ui);
  const { data: dataVaccineCardByKid } = useGetVaccineCardByKid(
    dataUserKids?.kidsByMom[0]?.id,
  );
  const { data: dataVaccinesByVaccineCard } = useGetVaccinesByVaccineCard(
    dataVaccineCardByKid?.vaccineCardByKid?.[0]?.id,
  );
  const { data: dataUser } = useGetUser(auth?.ui);
  const { data: dataVaccineTemplates } = useGetVaccineTemplates();

  return (
    <section className="container">
      <Header />
      <div className="container__home">
        <div className="home__side">
          <Calendar onClick={setSelectedFilter} filter={currentScheduleSelection} />
          <SideFilter
            viewFilter={viewFilter}
            setViewFilter={setViewFilter}
            currentScheduleSelection={currentScheduleSelection}
            setCurrentScheduleSelection={setCurrentScheduleSelection}
          />
        </div>
        <div className="home__content">
          <div className="home__title">
            <h1>{new Date(selectedFilter).toLocaleDateString("pt-BR", {
                year: "numeric", // Ano
                month: "long", // Mês por extenso
                day: "numeric", // Dia numérico
            })}</h1>
            <HomeButtons
              currentScheduleSelection={currentScheduleSelection}
              dataUserGestations={dataUserGestations}
              setIsOpenPopupStartSchedule={setIsOpenPopupStartSchedule}
              setIsOpenPopupLostBaby={setIsOpenPopupLostBaby}
              setIsOpenPopupGenerateKid={setIsOpenPopupGenerateKid}
            />
          </div>
          <div className="home__dashboard">
            {currentScheduleSelection === "Maternidade" ? (
              <DashboardTasks
                tasks={dataConsultationsByGestation?.consultationsByGestation || []}
                type="Maternidade"
                selectedFilter={selectedFilter}
                onClick={setSelectedConsultation}
              />
            ) : (
              <DashboardTasks
                tasks={dataVaccinesByVaccineCard?.vaccinesByVaccineCard || []}
                type="Infantil"
                selectedFilter={selectedFilter}
                onClick={setSelectedConsultation}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
