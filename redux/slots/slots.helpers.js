import { CALENDAR } from "constants/API_URLS";
import appFetch from "utils/appFetch";
import mapAvailableSlots from "utils/mapAvailableSlots";

export const handleApiCalls = (url, data) => {
	return new Promise((resolve, reject) => {
		appFetch(url, data)
			.then((response) => {
				if (response.status === "success") {
					const result = response.result;
					return resolve(result);
				}
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
};

export function fetchCalendarView(user_id, email) {
	const url = CALENDAR.FETCH_CALENDAR_VIEW;
	const data = {
		user_id: user_id,
		email: email,
	};

	const slotPlans = appFetch(url, data)
		.then((json) => {
			if (json.status === "success") {
				const getSlots = mapAvailableSlots(json?.result);
				// console.log("getSlots from the api now", getSlots);
				// dispatch(setSlots(getSlots));

				// function for filtering the result to show events after the current date only
				const result =
					getSlots &&
					getSlots.filter((slot) => {
						const {
							start,
							end,
							title,
							booking_id,
							time_availability,
							object_id,
							session_id,
							source_type,
							timezone,
							date,
						} = slot;

						const currentDate = new Date();

						if (start < currentDate || end < currentDate)
							return null;

						return {
							start: new Date(start),
							end: new Date(end),
							// start,
							// end,
							title,
							booking_id,
							time_availability,
							object_id,
							session_id,
							source_type,
							timezone,
							date,
							...slot,
						};
					});

				return result;
			}
			// console.log("json", json);
			// return json?.result?.slot_plan;
		})
		.catch((err) => console.log(err));

	// console.log("slotPlans", slotPlans);
	return slotPlans;
}
