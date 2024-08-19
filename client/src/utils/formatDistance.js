import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";

export const formatDistance = (date) => {
  const now = new Date();
  const parsedDate = new Date(date);

  const timeFormat = "hh:mm a";
  const weekdayFormat = "eee";
  const monthFormat = "MMM";

  const distance = formatDistanceToNow(parsedDate, { addSuffix: true });

  if (isToday(parsedDate)) {
    return format(parsedDate, timeFormat);
  } else if (isYesterday(parsedDate)) {
    return `Yesterday`;
  } else if (distance.includes("days") || distance.includes("month")) {
    return format(parsedDate, weekdayFormat);
  } else if (distance.includes("years")) {
    return format(parsedDate, monthFormat);
  } else {
    return format(parsedDate, timeFormat);
  }
};
