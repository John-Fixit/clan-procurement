import {
  parseISO,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export const durationDiff = (TIME_REQUESTED, TIME_TREATED) => {
  // Parse the date strings
  const requested = parseISO(TIME_REQUESTED.replace(" ", "T"));
  const treated = parseISO(TIME_TREATED.replace(" ", "T"));

  // Calculate differences for each unit
  const totalMonths = differenceInMonths(treated, requested);
  const months = totalMonths;

  // Get remaining time after months
  const afterMonths = new Date(requested);
  afterMonths.setMonth(afterMonths.getMonth() + totalMonths);

  const totalDays = differenceInDays(treated, afterMonths);
  const days = totalDays;

  // Get remaining time after days
  const afterDays = new Date(afterMonths);
  afterDays.setDate(afterDays.getDate() + totalDays);

  const totalHours = differenceInHours(treated, afterDays);
  const hours = totalHours;

  // Get remaining time after hours
  const afterHours = new Date(afterDays);
  afterHours.setHours(afterHours.getHours() + totalHours);

  const totalMinutes = differenceInMinutes(treated, afterHours);
  const minutes = totalMinutes;

  // Get remaining time after minutes
  const afterMinutes = new Date(afterHours);
  afterMinutes.setMinutes(afterMinutes.getMinutes() + totalMinutes);

  const seconds = differenceInSeconds(treated, afterMinutes);

  // Build the formatted string dynamically
  let formattedDuration = "";
  if (months > 0) {
    formattedDuration += ` ${months} month${months > 1 ? "s" : ""} `;
  }
  if (days > 0) {
    formattedDuration += ` ${days} day${days > 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    formattedDuration += ` ${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    formattedDuration += ` ${minutes} min${minutes > 1 ? "s" : ""}`;
  }
  if (seconds > 0) {
    formattedDuration += ` ${seconds} sec${seconds > 1 ? "s" : ""}`;
  }
  return formattedDuration ? formattedDuration.trim() : "Immediate";
};
