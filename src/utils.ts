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
