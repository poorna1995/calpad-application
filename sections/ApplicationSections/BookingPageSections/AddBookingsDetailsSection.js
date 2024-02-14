import { Box, Button, Stack } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { SCHEDULE_BOOKING } from "constants/API_URLS";
import useLocalStorage from "customHooks/useLocalStorage";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setBookingData } from "redux/bookings/bookingsSlice";
import appFetch from "utils/appFetch";
import validator from "validator";

const mapState = ({ bookings, user }) => ({
	bookingData: bookings.bookingData,
	currentUser: user.currentUser,
});

const AddBookingsDetailsSection = () => {
	const { currentUser, bookingData } = useSelector(mapState);
	const router = useRouter();
	const userName = router.query.username;
	const fromTime = router.query.from_time;
	const fromDate = router.query.date;
	const toTime = router.query.to_time;
	const timezone = router.query.timezone;
	const userFullname = router.query.fullname;
	const userEmail = router.query.email;

	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [booking_data, set_booking_data] = useState(bookingData);
	const [email, setEmail] = useState(userEmail || "");
	const [fullName, setFullName] = useState(userFullname || "");
	const [sessionDescription, setSessionDescription] = useState("");

	const isEmail = validator.isEmail(email);
	// console.log({ isEmail, email, fullName });

	useEffect(() => {
		set_booking_data(bookingData);
		setEmail(userEmail || "");
		setFullName(userFullname || "");
	}, [bookingData, userEmail, userFullname]);

	/**
	 * data structure for booking session
	 * {
    "owner_email":"sudhin.m@hivepath.io",
    "owner_name":"sudhin",
    "from_date": "2022-11-21",
    "from_time": "10:00PM",
    "timezone": "Asia/Calcutta",
    "to_date": "2022-11-21",
    "to_time": "10:30PM",
    "requestor_email":"tst4291@gmail.com",
    "description":"blah blah",
    "duration":30,
    "phone":"5645511",
    "owner_id":"138879893541828765",
    "requestor_name":"test"
}
	 */

	const handleBookingConfirm = () => {
		const data = {
			...bookingData,
			requestor_email: email,
			description: sessionDescription,
			phone: "",
			requestor_name: fullName,
			requestor_id: currentUser.user_id || "",
		};

		appFetch(SCHEDULE_BOOKING.SCHEDULE_BOOKING, data)
			.then((json) => {
				if (json.status === "success") {
					let bookingId = json.schedule_data.booking_id;

					dispatch(setBookingData(json.schedule_data));
					// set_booking_data(json.schedule_data);
					router.push(`/${userName}/booking/${bookingId}/success`);

					return enqueueSnackbar(json.message, {
						variant: "success",
					});
				}
				return enqueueSnackbar(json.message, { variant: "error" });
			})
			.catch((error) => {
				enqueueSnackbar(error.message, { variant: "error" });
			});
	};
	// console.log({ fullName, email });

	return (
		<Box sx={{ paddingLeft: "32px" }}>
			<Button
				onClick={() => router.back()}
				sx={{
					textTransform: "inherit",
					paddingLeft: "24px",
					paddingRight: "24px",
				}}
				startIcon={
					<FaChevronLeft
						style={{
							fontWeight: 400,
							fontSize: "14px",
						}}
					/>
				}
			>
				Go back
			</Button>
			<Box sx={{ paddingBottom: "16px" }}>
				<SectionTitleText>Selected Slot</SectionTitleText>
				<DescriptionText>
					Booking Date :{" "}
					<b>
						{fromDate} {fromTime} - {toTime} ({timezone})
					</b>
				</DescriptionText>
			</Box>

			<SectionTitleText>Provide Booking Details</SectionTitleText>

			<Stack sx={{ maxWidth: "500px" }}>
				<TextInput
					label={"Full name"}
					placeholder="Full name"
					autoComplete="off"
					value={fullName}
					// defaultValue={}
					onChange={(e) => setFullName(e.target.value)}
				/>
				<TextInput
					label={"Email"}
					type="email"
					autoComplete="email"
					value={email}
					helperText={!isEmail && "Enter a valid email"}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<TextInput
					label={"What would you like the call to be about?"}
					autoComplete="off"
					value={sessionDescription}
					onChange={(e) => setSessionDescription(e.target.value)}
					multiline
					minRows={4}
					maxRows={4}
				/>
			</Stack>
			<Box
				sx={{
					justifyContent: "flex-end",
					display: "flex",
					maxWidth: "500px",
					marginTop: "16px",
				}}
			>
				<PrimaryButton
					disabled={!isEmail}
					onClick={handleBookingConfirm}
				>
					Create Booking
				</PrimaryButton>
			</Box>
		</Box>
	);
};

export default AddBookingsDetailsSection;
