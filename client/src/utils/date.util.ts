export const getFormattedDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const getInputDateFormat = (dateStr: string) => {
  const date = new Date(dateStr);

  return date.toISOString().split("T")[0];
};
