export function formatDate(val: string): string {
  const date = new Date(val);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const Suffix = ["th", "st", "nd", "rd"];

  const daySuffix =
    day % 10 <= 3 && day % 100 > 10 ? Suffix[day % 10] : Suffix[0];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${day}${daySuffix} ${months[month]}, ${year}`;

  return formattedDate;
}
