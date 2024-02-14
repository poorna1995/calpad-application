import { format, parseISO } from "date-fns";

function parseDaytime(time) {
  let [hours, minutes] = time
    .substr(0, time.length - 2)
    .split(":")
    .map(Number);
  if (time.includes("PM") && hours !== 12) hours += 12;
  return 1000 /*ms*/ * 60 /*s*/ * (hours * 60 + minutes);
}

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export default function getParsedDayTime(date, time, timezone) {
  //   const d = formatDate(date);
  const reformatDate = format(parseISO(date), "LL/dd/yyyy");

  const fromWithSpace = `${time.substring(0, 5)} ${time.substring(
    5,
    time.length
  )}`;

  const res = new Date(`${reformatDate} ${fromWithSpace} UTC`);

  return res;
}

export const yyyymmdd = (date) => {
  const curDate =
    date.getDate() + "".length > 1 ? date.getDate() : "0" + date.getDate();
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + curDate;
};

export const getMonthYear = (d) => {
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
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return { month: month, year: year, monthNumber: d.getMonth() };
};

export const getTwelveHourFormat = (d) => {
  let zone = d.getHours() > 12 ? "PM" : "AM";
  let hours =
    d.getHours() > 12
      ? d.getHours() - 12
      : (d.getHours() + "").length > 1
      ? d.getHours()
      : "0" + d.getHours();

  let minutes =
    (d.getMinutes() + "").length < 2 ? "0" + d.getMinutes() : d.getMinutes();

  return hours + ":" + minutes + zone;
};
