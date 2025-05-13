export default function formatDate(date: string) {
  const dt = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = dt.toLocaleDateString("en-US", options);
  return formattedDate;
}
