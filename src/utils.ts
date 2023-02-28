export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount) {
  const numberFormat = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  return numberFormat.format(amount);
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  let dateFormat = new Intl.DateTimeFormat("de", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    // hour: "2-digit",
    // hour12: false,
    // minute: "2-digit",
    // timeZone: "Europe/Berlin",
    // timeZoneName: "short",
  });
  return dateFormat.format(date);
}

const month = [
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

export function getMonthString(date: Date) {
  return `${month[date.getMonth()]} ${date.getFullYear()}`;
}

export function previousMonth(date: Date) {
  let newMonth = date.getMonth() - 1;
  let newYear = date.getFullYear();
  if (newMonth === -1) {
    newMonth = 11;
    newYear--;
  }
  return new Date(newYear, newMonth, 15);
}

export function nextMonth(date: Date) {
  let newMonth = date.getMonth() + 1;
  let newYear = date.getFullYear();
  if (newMonth === 12) {
    newMonth = 0;
    newYear++;
  }
  return new Date(newYear, newMonth, 15);
}

export function dateToString(date: Date): string {
  return date.toISOString().substring(0, 10);
}
