// pages/Home.tsx
import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Header } from "../../../components/Header";
import { Calendar } from "../../../components/Calendar";
import { getCookie } from "../../../utils/cookies";
import { calculateNextConsultationDate } from "../../../hooks/useGestationHelpers";
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

  const handleCreateCalendarAfterInitialConsultation = async (
    week: any,
    description: any,
  ) => {
    const gestation = await createGestationMutation(
      auth?.ui,
      description,
      Number(week),
    );

    let currentWeek = Number(week);
    let consultations: any = [];

    if (currentWeek === undefined) {
      console.error("Gestação não encontrada.");
      return;
    }

    while (currentWeek < 41) {
      currentWeek += currentWeek <= 28 ? 4 : currentWeek <= 36 ? 2 : 1;

      const lastConsultationDate =
        consultations.length > 0
          ? consultations[consultations.length - 1].date
          : Date.now();

      const nextDate = calculateNextConsultationDate(
        currentWeek,
        lastConsultationDate,
      );

      consultations.push({
        date: nextDate,
        week: currentWeek,
      });
    }

    consultations.map((consultation: any) => {
      createConsultationMutation(
        gestation,
        consultation?.date,
        consultation?.week,
      );
    });

    sendMessage(
      "Oi, mamãe!\n\nParabéns por ter agendado a sua primeira consulta pré-natal antes da 12ª semana! Essa etapa é fundamental para cuidar da sua saúde e do seu bebê. Durante essa consulta, você realizará exames importantes, receberá orientações sobre nutrição e cuidados essenciais, e poderá esclarecer todas as suas dúvidas.\n\nAo comparecer, você está dando um passo crucial para garantir um acompanhamento adequado do desenvolvimento fetal e para monitorar condições importantes, como diabetes gestacional e hipertensão. O diagnóstico precoce de qualquer problema de saúde pode facilitar o tratamento e evitar complicações futuras.\n\nAlém disso, essa consulta é uma oportunidade valiosa para se informar sobre vacinas e exames recomendados no início da gestação, como a ultrassonografia. Continue assim, cuidando de você e do seu pequeno! Estamos aqui para apoiar você em cada etapa da sua jornada!",
      dataUser?.user?.phone,
    );
  };

  const handleUpdateCalendarAfterFinishConsultation = (
    consultationId: string,
    date: Date,
  ) => {
    const consultations =
      dataConsultationsByGestation?.consultationsByGestation.filter(
        (consultation: any) => !consultation.isFinished,
      );

    const selectedConsultation = consultations.find(
      (consultation: any) => consultation.id === consultationId,
    );

    if (selectedConsultation) {
      const newDate = date.getTime();
      const currentDate = new Date(selectedConsultation.date).getTime();
      const dateDifference = newDate - currentDate; // Calcula a diferença em milissegundos

      // Atualiza a consulta selecionada e marca como finalizada
      updateConsultationMutation(consultationId, {
        date: newDate,
        isFinished: true,
      })
        .then(() => {
          // Atualiza as consultas subsequentes com a diferença
          consultations.map((consultation: any, index: number) => {
            if (consultation.id !== consultationId) {
              const previousDate = new Date(
                consultations[index].date,
              ).getTime();

              const updatedDate = previousDate + dateDifference;

              updateConsultationMutation(consultation.id, {
                date: updatedDate,
              });
            }
          });
        })
        .catch((error: any) => {
          console.error("Erro ao atualizar a consulta:", error.message);
        });
    }
  };

  const handleFinishGestation = async (hasBorn: any, kidName?: any) => {
    const gestationId = await dataUserGestations?.gestationsByMom[0]?.id;

    if (gestationId && hasBorn) {
      try {
        const kid: any = await createKidMutation(
          auth?.ui,
          kidName,
          new Date().getTime(),
        );

        if (kid) {
          const vaccineCard = await createVaccineCardMutation(kid?.id);

          dataVaccineTemplates?.vaccineTemplates?.map(
            (vaccineTemplate: any) => {
              console.log(vaccineTemplate);
              createVaccineMutation({
                vaccineCard: vaccineCard,
                vaccineTemplate: vaccineTemplate.id,
                description: vaccineTemplate.description,
                applicationDate:
                  kid?.birthDate +
                  vaccineTemplate.applicationDate * 86400 * 1000,
                isFinished: false,
              });
            },
          );
        } else {
          console.error("Error: Kid creation returned undefined.");
        }
      } catch (error) {
        console.error("Error creating kid or vaccine card:", error);
      }
    }

    updateGestationMutation(gestationId, {
      isFinished: true,
    });
  };

  useEffect(() => {
    if (dataUserGestations?.gestationsByMom[0] !== undefined) {
      const gestation = dataUserGestations?.gestationsByMom[0];

      const createdAtTimestamp =
        typeof gestation.createdAt === "string"
          ? new Date(gestation.createdAt).getTime()
          : gestation.createdAt;

      if (createdAtTimestamp > Date.now() + 60 * 60 * 24 * 7 * 1000) {
        updateGestationMutation(gestation.id, { week: gestation.week + 1 });
      }
    }
  }, [dataUserGestations]);

  return (
    <section className="container">
      <Header />
      {isOpenPopupStartSchedule && (
        <PopupInitialWeekGenerateSchedule
          showPopup={isOpenPopupStartSchedule}
          setShowPopup={setIsOpenPopupStartSchedule}
          onClick={handleCreateCalendarAfterInitialConsultation}
          title="Confirme suas informações!"
        />
      )}
      {selectedConsultation && (
        <PopupCompleteConsultationWithDate
          showPopup={selectedConsultation != null}
          setShowPopup={setSelectedConsultation}
          consultationId={selectedConsultation}
          title="Data de comparecimento"
          onClick={handleUpdateCalendarAfterFinishConsultation} // Agora passa a função corrigida
        />
      )}
      {isOpenPopupLostBaby && (
        <PopupTextWithoutInputs
          showPopup={isOpenPopupLostBaby}
          setShowPopup={setIsOpenPopupLostBaby}
          title="Perdeu o bebê?"
          description="Querida mamãe,
            
            Sabemos que nada que possamos dizer pode aliviar a dor que você está sentindo agora. Perder um bebê é uma experiência profundamente dolorosa e única, e não há maneira certa ou errada de vivenciar esse momento. Permita-se sentir e processar tudo no seu próprio tempo.

            Você não está sozinha. Muitas mães passaram por isso e encontraram força em pedir ajuda e se cercar de apoio. Conversar com pessoas próximas ou buscar o auxílio de profissionais pode ser um passo importante para atravessar esse momento.

            Se precisar conversar com alguém ou buscar apoio emocional, você pode sempre procurar o Centro de Valorização da Vida (CVV), ligue para 188 (disponível 24h por dia, todos os dias da semana).
            Não hesite em procurar ajuda. Lembre-se de que cuidar de você mesma é fundamental, e você merece todo o carinho e apoio neste momento.

            Estamos aqui com você, e esperamos que o tempo traga serenidade para o seu coração."
          onClick={handleFinishGestation}
        />
      )}
      {isOpenPopupGenerateKid && (
        <PopupFinishGestationGenerateKid
          showPopup={isOpenPopupGenerateKid}
          setShowPopup={setIsOpenPopupGenerateKid}
          title="Seu bebê nasceu!"
          onClick={handleFinishGestation}
        />
      )}
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
                tasks={dataConsultationsByGestation?.consultationsByGestation}
                type="Maternidade"
                selectedFilter={selectedFilter}
                onClick={setSelectedConsultation}
              />
            ) : (
              <DashboardTasks
                tasks={dataVaccinesByVaccineCard?.vaccinesByVaccineCard}
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
