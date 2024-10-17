// components/DashboardTasks.tsx
import React from "react";
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
      {tasks
        .filter((task: any) =>
          new Date(task.date).toDateString() === selectedFilter,
        )
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
              date={new Date(task.date).toLocaleDateString()}
              showCheckbox={
                tasks.filter((item: any) => !item.isFinished)[0].id === task.id
              }
            />
          );
        })}
    </div>
  );
};
