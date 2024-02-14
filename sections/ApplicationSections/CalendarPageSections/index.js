import CalpadCalendar from "components/CalpadCalendar";
import { AUTH, CALENDAR } from "constants/API_URLS";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlotsStart } from "redux/slots/slotsSlice";
import changeTimezone from "utils/changeTimeZone";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";

const mapState = ({ user, slotsData }) => ({
	currentUser: user.currentUser,
	slots: slotsData.slots,
	syncedEmails: user.syncedCalendars,
});
const CalendarPageSections = () => {
	const { currentUser, slots, syncedEmails } = useSelector(mapState);
	const calendarTimezone = currentUser.timezone;
	const USER_ID = currentUser.user_id;
	const dispatch = useDispatch();

	const emails = syncedEmails?.map((item) => item.email) || [];
	console.log({ emails });
	const dates =
		Array.isArray(slots) &&
		slots.length > 0 &&
		slots.map((slot) => {
			const { start, end, email, title } = slot;

			const startTime = changeTimezone(start, enUS, calendarTimezone);
			const endTime = changeTimezone(end, enUS, calendarTimezone);

			// const color = arr3?.filter((arrItem) => {
			// 	if (arrItem.email === email) return arrItem.color;
			// 	return null;
			// });
			// const getcolor = color[0]?.color || "";
			// const getBorder = color[0]?.border || "";
			return {
				// color: getcolor,
				// border: getBorder,
				start: new Date(startTime),
				end: new Date(endTime),
				title: "Available",
				...slot,
			};
		});
	// .filter((item) => {
	// 	const { source_type, availability } = item;
	// 	if (availability === false && source_type === "calpad")
	// 		return null;
	// 	return item;
	// })) ||
	// [];
	console.log({ dates });
	const convertedSessions = (data = [], isHostView = false) => {
		const sessions =
			Array.isArray(data) &&
			data.length > 0 &&
			data.map((item) => {
				const {
					from_date,
					from_time,
					to_date,
					to_time,
					availability,
					title,
				} = item;

				const eventBeginTime = getTimeBasedOnTimezone(
					from_date,
					from_time,
					calendarTimezone,
				);
				const eventFinishTime = getTimeBasedOnTimezone(
					to_date,
					to_time,
					calendarTimezone,
				);
				const formattedStartTime = format(
					eventBeginTime,
					"eee, MMM dd, yyyy",
				);

				const timestamp = new Date();

				// const getCurrentTimeStatus = () => {
				//   if (timestamp > fromTime && timestamp < toTime) return true;
				//   return false;
				// };
				// const myTime = getCurrentTimeStatus();

				return {
					...item,
					start: eventBeginTime,
					end: eventFinishTime,
					formattedDate: formattedStartTime,
					newTimezone: calendarTimezone,
					title: availability ? "Available" : title,
				};
			});
		// 		.filter((item) => {
		// 			const sessionData = item?.session_data;
		// 			const title = item?.session_data?.title;

		// 			if (sessionData || title) return item;
		// 			return null;
		// 		})) ||

		return sessions;
	};
	const sessions = convertedSessions(dates);

	console.log({ sessions });
	useEffect(() => {
		dispatch(
			fetchSlotsStart({
				url: CALENDAR.FETCH_CALENDAR_VIEW,
				data: { user_id: USER_ID, email: emails },
			}),
		);
	}, []);
	return (
		<div>
			<CalpadCalendar events={sessions || []} height="70vh" />
		</div>
	);
};

export default CalendarPageSections;
