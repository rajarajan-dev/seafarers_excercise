export const formatDateToDDMMYY = (isoDate: string): string => {
  const date = new Date(isoDate);

  const day = date.getDate().toString().padStart(2, "0"); // dd
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // mm (months are 0-based)
  const year = date.getFullYear().toString().slice(-2); // yy

  return `${day}.${month}.${year}`;
};

// Utility to format date as DD.MM.YYYY
export const formatDate = (date?: string) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}.${String(
    d.getMonth() + 1
  ).padStart(2, "0")}.${d.getFullYear()}`;
};
