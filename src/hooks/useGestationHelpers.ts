export const handleWeekend = (date: any) => {
  let day = new Date(date).getDay();
  if (day === 0) return date + 60 * 60 * 24 * 1 * 1000;
  if (day === 6) return date - 60 * 60 * 24 * 1 * 1000;
  return date;
};

export const calculateNextConsultationDate = (
  currentWeek: number,
  lastConsultationDate: number,
) => {
  let intervalDays = currentWeek <= 28 ? 30 : currentWeek <= 36 ? 15 : 7;
  return handleWeekend(
    lastConsultationDate + 60 * 60 * 24 * intervalDays * 1000,
  );
};

export const formatDate = (date: any) => {
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  return `${date.getDate().toString().padStart(2, "0")} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
};
