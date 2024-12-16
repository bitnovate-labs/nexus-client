import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with required plugins
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const DATE_FORMAT = {
  display: "DD/MM/YYYY",
  store: "YYYY-MM-DD",
};

export const formatDate = (dateString) => {
  if (!dateString) return null;

  // Parse the date in UTC to avoid timezone issues
  const date = dayjs.utc(dateString);
  if (!date.isValid()) return null;

  // Format in local timezone
  return date.local().format(DATE_FORMAT.display);
};

export const formatDateForServer = (date) => {
  if (!date) return null;

  // If it's already a dayjs object
  if (dayjs.isDayjs(date)) {
    return date.format(DATE_FORMAT.store);
  }

  // Parse the date in UTC
  const parsedDate = dayjs.utc(date);
  if (!parsedDate.isValid()) return null;

  return parsedDate.format(DATE_FORMAT.store);
};

export const createDayjs = (dateString) => {
  if (!dateString) return null;

  // If it's already a dayjs object
  if (dayjs.isDayjs(dateString)) {
    return dateString;
  }

  // Parse the date in UTC and convert to local
  const date = dayjs.utc(dateString).local();
  return date.isValid() ? date : null;
};

export const formatDateTime = (dateString) => {
  return dayjs(dateString)
    .tz("Asia/Kuala_Lumpur")
    .format("DD/MM/YYYY HH:mm:ss");
};
