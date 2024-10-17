// components/DashboardTasks.tsx
import React, {useEffect, useState} from "react";
import { DashboardTask } from "../DashboardTask";

interface DashboardTasksProps {
  tasks: any[];
  type: "Maternidade" | "Infantil";
  selectedFilter: string;
  onClick: (id: string) => void;
}

export const DashboardTasks: React.FC<DashboardTasksProps> = ({
  tasks,
  type,
  selectedFilter,
  onClick,
}) => {
  return (
    <div>
      {tasks && tasks
        .filter((task: any) => {
            if (type==="Maternidade") {
                return new Date(task.date).toDateString() === selectedFilter
            }
            if (type==="Infantil") {
                const dayInMillis = 24 * 60 * 60 * 1000; // Um dia em milissegundos
                const selectedDateTime = new Date(selectedFilter).setHours(0, 0, 0, 0); // Zera horas para comparação de datas
                const applicationDateTime = new Date(task.applicationDate).setHours(0, 0, 0, 0); // Zera horas para data de aplicação

                const nextDay = applicationDateTime + 3 * dayInMillis; // 3 dias após a data de aplicação
                const lastDay = applicationDateTime - 3 * dayInMillis; // 3 dias antes da data de aplicação

                // Verifica se o selectedDateTime está entre lastDay e nextDay
                if (selectedDateTime >= lastDay && selectedDateTime <= nextDay) {
                // O dia selecionado está dentro do intervalo de 3 dias antes ou depois
                return true;
                }
            }
        })
        .map((task: any) => {
          return (
            <DashboardTask
              key={task.id}
              title={type === "Maternidade" ? "Consulta" : "Vacina"}
              id={task.id}
              description={
                type === "Maternidade"
                  ? `Consulta da ${task.week}º semana de pré-natal.`
                  : `${task?.vaccineTemplate?.name} - ${task?.description}`
              }
              isFinished={task.isFinished}
              onClick={() => onClick(task.id)}
              date={type==="Infantil"?new Date(task.applicationDate).toLocaleDateString():new Date(task.date).toLocaleDateString()}
              showCheckbox={
                tasks?.filter((item: any) => !item.isFinished)[0].id === task.id
              }
            />
          );
        })}
    </div>
  );
};
