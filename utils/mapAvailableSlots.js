import { format, parseISO } from "date-fns";
export default function mapAvailableSlots(data = []) {
	const getAvailableSlots = data?.map((item) => {
		//       approval_status
		// availability
		// booking_count
		// booking_requests
		// created_on
		// end_time
		// from_date
		// from_time
		// object_id
		// source_type
		// start_time
		// timezone
		// title
		// to_date
		// to_time
		// type
		// updated_on
		// user_id

		const {
			availability,
			from_date,
			from_time,
			object_id,
			source_type,

			timezone,
			to_date,
			to_time,
		} = item;
		// const {
		//   availability,
		//   booking_id,
		//   object_id,
		//   session_id,
		//   booking_status,
		//   source_type,
		//   from,
		//   to,
		//   title,
		//   timezone,
		//   attendees,
		//   creator,
		//   description,
		//   email,
		//   url,
		// } = t;

		// Reformat date to show on frontend

		const reformatStartDate = format(parseISO(from_date), "LL/dd/yyyy");
		const reformatEndDate = format(parseISO(to_date), "LL/dd/yyyy");
		const fromWithSpace = `${from_time.substring(
			0,
			5,
		)} ${from_time.substring(5, from_time.length)}`;
		const toWithSpace = `${to_time.substring(0, 5)} ${to_time.substring(
			5,
			to_time.length,
		)}`;
		const startDate = `${reformatStartDate} ${fromWithSpace} ${timezone}`;
		// const newDate = new Date(startDate).getUTCHours();

		const endDate = `${reformatEndDate} ${toWithSpace} ${timezone}`;
		const end = new Date(endDate);
		const start = new Date(startDate);

		// console.log(endDate);
		// const startTime = start.toUTCString();
		// const endTime = end.toUTCString();

		// console.log("for every slot from backend", {
		//   availability,
		//   booking_id,
		//   object_id,
		//   session_id,
		//   source_type,
		//   from,
		//   to,
		//   title,
		//   timezone,
		//   date,
		//   startTime,
		//   endTime,
		// });

		// const end = changeTimezone(endDate, enUS, timezone);
		// const start = changeTimezone(startDate, enUS, timezone);
		const eventTitle = availability === true && "Available";
		// ? "Available"
		// : title
		// ? title
		// : "Requested Session";
		return {
			availability,
			object_id,
			source_type,
			title: eventTitle,
			timezone,
			start: start,
			end: end,
			...item,
		};
	});

	// return mapTime;

	//

	const getFlatSlots = getAvailableSlots.flat();
	console.log({ getFlatSlots });
	return getFlatSlots;
}
