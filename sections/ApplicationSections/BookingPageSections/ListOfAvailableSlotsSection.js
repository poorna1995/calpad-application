import { Alert, Box, Divider, Stack, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { format, parse, parseISO } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lodash from "lodash";
import { setBookingData } from "redux/bookings/bookingsSlice";
import { current } from "@reduxjs/toolkit";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import changeTimezone from "utils/changeTimeZone";
import { enUS } from "date-fns/locale";
import AppImage from "components/Common/AppImage";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import noSlotsFound from "public/assets/app/placeholder/no-slots.png";
import useLocalStorage from "customHooks/useLocalStorage";

const mapState = ({ slotsData, user, bookings }) => ({
	schedules: slotsData.schedules,
	ownerData: user.userProfileData,
	currentUser: user.currentUser,
});
const ListOfAvailableSlotsSection = ({ slotsData }) => {
	const router = useRouter();
	const { ownerData, currentUser, schedules } = useSelector(mapState);

	// const schedules =
	// slotsData;
	const [booking_data, set_booking_data] = useLocalStorage("booking_data");
	const dispatch = useDispatch();
	const calendarTimezone = currentUser.timezone;
	const date = router.query["date"];
	const userId = router.query.username;
	const newDate = date && new Date(date);
	const formattedDate = newDate && format(newDate, "EEE, dd MMM");
	const [selectedSlot, setSelectedSlot] = useState({});
	// console.log({ newDate, formattedDate });

	const [time, setTime] = useState("");
	const handleClick = (e, time, data) => {
		const formatTime = time.slice(0, 5);
		const amPM = time.slice(5, 7);
		const matchDate = new Date(`${date} ${formatTime} ${amPM} `);
		setTime(time);
		setSelectedSlot(data);
		console.log({ data });
	};
	const scheduleDates = schedules.map((item) => {
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

	const groupedDates = lodash.groupBy(scheduleDates, "from_date");

	const disableButton = currentUser.user_id === ownerData.user_id;
	// console.log({ selectedSlot });
	// useEffect(() => {
	// 	setSelectedSlot(selectedSlot);
	// }, [selectedSlot]);

	const newRoute = currentUser.email
		? `/${userId}/booking-details?date=${date}&&from_time=${selectedSlot.from_time}&&to_time=${selectedSlot.to_time}&&timezone=${currentUser.timezone}&&fullname=${currentUser.fullname}&&email=${currentUser.email}`
		: `/${userId}/booking-details?date=${date}&&from_time=${selectedSlot.from_time}&&to_time=${selectedSlot.to_time}&&timezone=${currentUser.timezone}`;
	const handleConfirmButtonClick = async () => {
		let data = {
			owner_email: ownerData.email,
			owner_name: ownerData.fullname,
			from_date: selectedSlot.from_date,
			from_time: selectedSlot.from_time,
			timezone: currentUser.timezone,
			to_date: selectedSlot.to_date,
			to_time: selectedSlot.to_time,
			duration: 30,
			owner_id: ownerData.user_id,
		};
		dispatch(setBookingData(data));
		set_booking_data(data);
		await router.push(
			newRoute,

			// `/${userId}/booking-details?date=${date}&&from_time=${selectedSlot.from_time}&&to_time=${selectedSlot.to_time}&&timezone=${currentUser.timezone}`,
		);
	};
	const currentTime = new Date();
	const changeCurrentTime = changeTimezone(currentTime, enUS, "UTC");
	const formattedCurrentDate = format(changeCurrentTime, "yyyy-MM-dd");
	const formattedCurrentTime = format(changeCurrentTime, "hh:mma");

	const currentTimeBasedOnTimezone = getTimeBasedOnTimezone(
		formattedCurrentDate,
		formattedCurrentTime,
		calendarTimezone,
	);
	const formattedCurrentTimeBasedOnTimezone = format(
		currentTimeBasedOnTimezone,
		"yyyy-MM-dd, hh:mm a",
	);

	const dataList =
		Array.isArray(groupedDates[date]) &&
		groupedDates[date]
			.map((item) => {
				const {
					from_date,
					from_time,
					to_time,
					to_date,
					timezone,
					waitlist,
				} = item;
				const fromTime = getTimeBasedOnTimezone(
					from_date,
					from_time,
					calendarTimezone,
				);
				const toTime = getTimeBasedOnTimezone(
					to_date,
					to_time,
					calendarTimezone,
				);
				let formattedFromTime = format(fromTime, "hh:mma");
				let formattedToTime = format(toTime, "hh:mma");

				return {
					...item,
					fromTime,
					// from_time: formattedFromTime,
					// to_time: formattedToTime,
					// from_date,
					// to_date,
					timezone,
					fromTime,
					toTime,
					waitlist,
					// ...item,
				};
			})
			.filter((item) => {
				if (item.fromTime < currentTimeBasedOnTimezone) return;
				return item;
			});

	// console.log({ dataList });
	return (
		<Box sx={{ paddingLeft: "16px" }}>
			{/* {disableButton && (
				<Alert severity="warning">
					{" "}
					You cannot book a session with yourself.
				</Alert>
			)} */}
			<Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
				{formattedDate}
			</Typography>
			<Divider />
			<Stack>
				{Array.isArray(dataList) && dataList.length === 0 && (
					<NoSlots />
				)}
				{Array.isArray(dataList) &&
					dataList.length > 0 &&
					dataList.map((item, index) => (
						<div
							key={index}
							style={{
								alignItems: "center",
								display: "flex",
								marginTop: "16px",
								flex: 1,
							}}
						>
							<OutlinedButton
								key={index}
								sx={{
									flex: 1,
									// border: (theme) =>
									// 	time === item.time &&
									// 	`2px solid ${theme.palette.primary.main}`,
									// fontWeight: time === item.time && 700,
								}}
								onClick={(e) =>
									handleClick(e, item.from_time, item)
								}
							>
								{item.from_time}
							</OutlinedButton>
							{time === item.from_time && (
								<PrimaryButton
									sx={{ flex: 1, marginLeft: "8px" }}
									onClick={handleConfirmButtonClick}
									disabled={disableButton}
								>
									{disableButton ? "Cannot book" : " Confirm"}
								</PrimaryButton>
							)}
						</div>
					))}
			</Stack>
		</Box>
	);
};

export default ListOfAvailableSlotsSection;

const NoSlots = () => (
	<Box sx={{ display: "grid", placeItems: "center" }}>
		<AppImage src={noSlotsFound} height="200" />
		<DescriptionText
			sx={{
				fontWeight: 600,
				fontSize: "16px",
				lineHeight: " 30px",
				color: "rgba(54, 54, 54, 0.9)",
				textAlign: "center",
				marginTop: "8px",
			}}
		>
			No Slots Found for this date. Try another dates
		</DescriptionText>
	</Box>
);
