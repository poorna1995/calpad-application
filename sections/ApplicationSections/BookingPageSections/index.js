import { Grid } from "@mui/material";
import { format } from "date-fns";
import BookingsLayout from "layouts/BookingsLayout";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import ListOfAvailableSlotsSection from "./ListOfAvailableSlotsSection";
import MuiDateCalendarSection from "./MuiDateCalendarSection";
import UserProfileInfoSection from "./UserProfileInfoSection";
import lodash from "lodash";
const mapState = ({ user, bookings }) => ({
	profileData: user.userProfileData,
	bookingsData: bookings.bookingsData,
	currentUser: user.currentUser,
});
const BookingPageSections = ({ userData, slotsData }) => {
	const { currentUser } = useSelector(mapState);
	const calendarTimezone = currentUser.timezone;
	const [profileData, setProfileData] = useState(userData);

	const scheduleDates = slotsData.map((item) => {
		const { from_date, to_date, from_time, to_time } = item;
		const date = getTimeBasedOnTimezone(
			from_date,
			from_time,
			calendarTimezone,
		);
		const formattedDate = format(date, "yyyy-MM-dd");
		const formattedTime = format(date, "hh:mma");

		const toDate = getTimeBasedOnTimezone(
			to_date,
			to_time,
			calendarTimezone,
		);
		const formattedToDate = format(toDate, "yyyy-MM-dd");
		const formattedToTime = format(toDate, "hh:mma");
		// new Date(from_date);
		return {
			...item,
			date,
			from_date: formattedDate,
			to_date: formattedToDate,
			from_time: formattedTime,
			to_time: formattedToTime,
		};
	});
	const groupByDate = lodash.groupBy(scheduleDates, "from_date");
	const [scheduleData, setSchedulesData] = useState(scheduleDates);

	useEffect(() => {
		setSchedulesData(scheduleDates);
	}, []);
	// console.log({ scheduleDates, groupByDate }, "inside main component");
	useEffect(() => {
		setProfileData(userData);
	}, []);

	const router = useRouter();
	const date = router.query.date;
	// console.log({ userData });
	return (
		<div>
			{/* User Profile section */}
			{/* Calendar for dates selection */}
			{/* List of times available for booking on that day */}
			<Grid container>
				{profileData && (
					<Grid
						item
						md={4}
						xs={12}
						sm={12}
						sx={{
							borderRight: "1px solid rgba(0,0,0,0.1)",
							padding: "8px",
							paddingBottom: "96px",
							paddingRight: "16px",
						}}
					>
						<UserProfileInfoSection userData={profileData} />{" "}
					</Grid>
				)}
				<Grid
					item
					md={4}
					sm={12}
					xs={12}
					sx={{ padding: "8px", paddingBottom: "160px" }}
				>
					<MuiDateCalendarSection slotsData={scheduleData} />
				</Grid>
				{date && (
					<Grid
						item
						md={4}
						sm={12}
						xs={12}
						sx={{
							borderLeft: "1px solid rgba(0,0,0,0.1)",
							padding: "8px",
						}}
					>
						<ListOfAvailableSlotsSection slotsData={scheduleData} />
					</Grid>
				)}
			</Grid>
		</div>
	);
};

export default BookingPageSections;
