import moment from "moment";

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

export function inSameMonth(date1: Date, date2: Date): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function inSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

export function getLastSixMonthNames(): string[] {
  const today = new Date();
  const result = [];
  for (var i = 5; i >= 0; i -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    result.push(month[date.getMonth()]);
  }
  return result;
}

export function getLastSixMonthYearAndMonth(): string[] {
  const today = new Date();
  const result = [];
  for (var i = 5; i >= 0; i -= 1) {
    let month = today.getMonth() - i;
    let year = today.getFullYear();
    const date = moment.utc();
    date.set("year", year);
    date.set("month", month);
    date.set("date", 1);
    date.startOf("day");
    result.push(date.format("YYYY-MM"));
  }
  return result;
}
