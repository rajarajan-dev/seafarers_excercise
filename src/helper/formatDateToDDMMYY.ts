export const formatDateToDDMMYY = (isoDate: string): string => {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, "0"); // dd
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // mm (months are 0-based)
  const year = date.getFullYear().toString().slice(-2); // yy

  return `${day}.${month}.${year}`;
};
