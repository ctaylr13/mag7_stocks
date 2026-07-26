export const formatPercent = (value: number): string => `${(value * 100).toFixed(2)}%`;

export const formatShortDate = (isoDate: string): string => {
  const [, month, day] = isoDate.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[Number(month) - 1]} ${Number(day)}`;
};
