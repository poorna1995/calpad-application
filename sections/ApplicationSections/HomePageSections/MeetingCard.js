import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import CardTitle from "components/Common/Typography/HeadingText/CardTitle";
import { SCHEDULE_BOOKING } from "constants/API_URLS";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import React from "react";
import {
	MdCalendarViewMonth,
	MdOutlinePermContactCalendar,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessionsListStart } from "redux/homePageData/homePageSlice";
import { setSectionLoading } from "redux/views/viewsSlice";
import CalendarIcon from "svg-icons/AppIcons/CalendarIcon";
import ClockIcon from "svg-icons/AppIcons/ClockIcon";
import appFetch from "utils/appFetch";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";

/**
 * {
    "booked_on": "2022-11-24T07:19:50.991376",
    "booking_id": "6294f07c-6bc8-11ed-8a7a-2fe76570c91b",
    "booking_status": "pending",
    "description": "Test account for testing status update. This is randomly typed message.\n",
    "duration": 30,
    "from_date": "2022-11-29",
    "from_time": "10:00PM",
    "owner_email": "mohit.mehta@hivepath.io",
    "owner_id": "138884070481640640",
    "owner_name": "Mohit Mehta",
    "phone": "1234567890",
    "requestor_email": "mohitstestingapps@gmail.com",
    "requestor_name": "Test account",
    "timezone": "UTC",
    "to_date": "2022-11-29",
    "to_time": "10:30PM",
    "wait_list": 1
}
 */

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const MeetingCard = ({ meetingStatus, data }) => {
	// "from_date": "2022-11-29",
	// "from_time": "10:00PM",
	// "to_date": "2022-11-29",
	// "to_time": "10:30PM",
	// "timezone": "UTC",
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const calendarTimezone = currentUser.timezone;
	// get start date based on timezone
	const startDate =
		data &&
		data.from_date &&
		getTimeBasedOnTimezone(
			data.from_date,
			data.from_time,
			calendarTimezone,
		);

	// new Date(data.from_date);
	const formattedStartDate =
		data.from_date && format(startDate, "EEE, dd MMM, yyyy");
	const from_time = data && data.from_time;
	const to_time = data && data.to_time;

	// get start time
	const startTime =
		data.from_time &&
		getTimeBasedOnTimezone(data.from_date, from_time, calendarTimezone);
	// new Date(
	// 	`${data.from_date} ${from_time.slice(0, 5)} ${from_time.slice(
	// 		5,
	// 		7,
	// 	)} +0`,
	// );
	const formattedStartTime = format(startTime, "hh:mm a");

	// get end time
	const endTime =
		data.to_time &&
		getTimeBasedOnTimezone(data.to_date, data.to_time, calendarTimezone);
	// new Date(
	// 	`${data.to_date} ${to_time.slice(0, 5)} ${to_time.slice(5, 7)} +0`,
	// );
	const formattedEndTime = format(endTime, "hh:mm a");

	//  function to accept session
	const handleAcceptSession = (e, booking_id) => {
		dispatch(setSectionLoading(true));

		appFetch(SCHEDULE_BOOKING.APPROVE_BOOKING, {
			booking_id,
			action: "approve",
		})
			.then((json) => {
				console.log(json);
				dispatch(setSectionLoading(false));

				enqueueSnackbar(json.message, { variant: "info" });
				if (json.status === "success") {
					dispatch(
						fetchSessionsListStart({
							url: SCHEDULE_BOOKING.AGGREGATE_SESSION,
							data: {
								user_id: currentUser.user_id,
							},
						}),
					);
				}
			})
			.catch((error) => {
				dispatch(setSectionLoading(false));

				console.log(error);
			});
	};
	// function to reject session
	const handleCancelButton = (e, booking_id) => {
		dispatch(setSectionLoading(true));
		appFetch(SCHEDULE_BOOKING.APPROVE_BOOKING, {
			booking_id,
			action: "cancel",
		})
			.then((json) => {
				enqueueSnackbar(json.message, { variant: "info" });
				dispatch(setSectionLoading(false));

				// console.log(json);
				if (json.status === "success") {
					dispatch(
						fetchSessionsListStart({
							url: SCHEDULE_BOOKING.AGGREGATE_SESSION,
							data: {
								user_id: currentUser.user_id,
							},
						}),
					);
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(setSectionLoading(false));
			});
	};
	const handleJoinMeeting = (url) => {
		window.open(url, "_blank");
	};
	return (
		<Card
			variant="outlined"
			sx={{
				border: "1px solid #E8E8E8",
				borderRadius: " 20px",
				marginBottom: "16px",
			}}
		>
			{/* show date and time */}
			<Stack
				direction="row"
				sx={{
					borderBottom: "1px solid rgba(0,0,0,0.1)",
					padding: "16px",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						marginRight: "48px",
					}}
				>
					<Avatar sx={{ background: "#07617D", marginRight: "16px" }}>
						<CalendarIcon />
					</Avatar>
					<CardTitle>
						{formattedStartDate || `Mon, 28 Nov, 2022`}
					</CardTitle>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Avatar sx={{ background: "#07617D", marginRight: "16px" }}>
						<ClockIcon />
					</Avatar>
					<CardTitle>
						{formattedStartTime} - {formattedEndTime}
					</CardTitle>
				</Box>
			</Stack>
			{/* more card details:
        User name, call description and message
        
        */}
			<Box sx={{ padding: "16px" }}>
				<CardTitle sx={{ fontSize: "20px" }}>
					{data.owner_id === currentUser.user_id
						? data.requestor_name
						: data.owner_name}
					<span
						style={{
							color: "#363636",
							opacity: 0.7,
							fontSize: "20px",
						}}
					>
						- 1:1 With Me ( {data.duration} Min )
					</span>
				</CardTitle>
				<Typography
					sx={{
						color: "#363636",
						opacity: 0.7,
						fontWeight: 400,
						fontSize: "14px",
						lineHeight: " 30px",
					}}
				>
					What would you like the call to be about?
				</Typography>
				<Typography
					sx={{
						fontWeight: 600,
						fontSize: "14px",
						lineHeight: "30px",
						color: "#363636",
						opacity: 0.9,
					}}
				>
					{data.description}
				</Typography>
			</Box>
			{/* Buttons row
             accept call button / decline button / join meeting button
        */}
			<Box sx={{ padding: "16px" }}>
				{data.booking_status === "approved" && (
					<PrimaryButton
						onClick={() => handleJoinMeeting(data.meeting_link)}
					>
						Join Call
					</PrimaryButton>
				)}
				{data.booking_status === "pending" &&
					data.owner_id === currentUser.user_id && (
						<>
							<PrimaryButton
								sx={{ marginRight: "16px" }}
								onClick={(e) =>
									handleAcceptSession(e, data.booking_id)
								}
							>
								Accept
							</PrimaryButton>
							<Button
								sx={{ textTransform: "capitalize" }}
								onClick={(e) =>
									handleCancelButton(e, data.booking_id)
								}
							>
								Have Other Plans ?
							</Button>
						</>
					)}
				{data.booking_status === "cancelled" && <>Cancelled</>}
			</Box>
		</Card>
	);
};

export default MeetingCard;
