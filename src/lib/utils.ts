export function formatDateToMonthYear(dateStr: string): string {
  const date = new Date(dateStr);

  const monthNames = [
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

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export function formatTo12HourTime(dateStr) {
  const date = new Date(dateStr);

  // Get hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour format
  hours = hours % 12 || 12; // Converts 0 to 12 for midnight

  // Format minutes as "00" if it's single digit
  const minutesStr = minutes.toString().padStart(2, "0");

  return `${hours}:${minutesStr} ${ampm}`;
}

export function formatDateToYYYYMMDD(date) {
  date = new Date(date);
  const year = date?.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
