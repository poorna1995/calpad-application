const { format, parseISO } = require("date-fns");
const { utcToZonedTime } = require("date-fns-tz");

const getTimeBasedOnTimezone = (date, from, timezone) => {
  const reformatDate = format(parseISO(date), "LL/dd/yyyy");

  const fromWithSpace = `${from.substring(0, 5)} ${from.substring(
    5,
    from.length
  )}`;

  const res = new Date(`${reformatDate} ${fromWithSpace} UTC`);

  const action_date = date && from && res;
  const fromTime = action_date && utcToZonedTime(action_date, timezone);
  return fromTime;
};

export default getTimeBasedOnTimezone;
