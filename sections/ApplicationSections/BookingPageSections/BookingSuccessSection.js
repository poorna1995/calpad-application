import { Avatar, Box, Stack } from "@mui/material";
import AppImage from "components/Common/AppImage";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useEffect, useState } from "react";
import profileImg from "public/assets/app/placeholder/user_image.png";
import { FaLinkedinIn, FaMedium, FaTwitter } from "react-icons/fa";
import CalendarIcon from "svg-icons/AppIcons/CalendarIcon";
import CardTitle from "components/Common/Typography/HeadingText/CardTitle";
import ClockIcon from "svg-icons/AppIcons/ClockIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { useRouter } from "next/router";
import appFetch from "utils/appFetch";
import { SCHEDULE_BOOKING } from "constants/API_URLS";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import { useDispatch, useSelector } from "react-redux";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import { format } from "date-fns";
import { setBookingData } from "redux/bookings/bookingsSlice";
import isValidImageSrc from "utils/isValidImageSrc";
import useLocalStorage from "customHooks/useLocalStorage";

/** data for booking success
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
} */

const mapState = ({ user, bookings }) => ({
	currentUser: user.currentUser,
	profileData: user.userProfileData,
	bookingData: bookings.bookingData,
});

const BookingSuccessSection = ({ bookingData, profileData }) => {
	const { currentUser } = useSelector(mapState);

	// const [profileData, setProfile] = useLocalStorage("user_data");
	// const [bookingData, set_booking_data] = useLocalStorage("booking_data");

	const calendarTimezone = currentUser.timezone;
	let fromTime = bookingData && bookingData.from_time;
	let startDate = bookingData && bookingData.from_date;

	let sessionDate =
		startDate &&
		fromTime &&
		getTimeBasedOnTimezone(startDate, fromTime, calendarTimezone);
	let formattedDate = format(sessionDate, "EEE, dd MMM");
	let formattedTime = format(sessionDate, "hh:mm a");
	// console.log({ pageData });
	const imageSrc = isValidImageSrc(profileData.image_url);

	return (
		<Box
			sx={{
				display: "grid",
				placeItems: "center",
				textAlign: "center",
				paddingBottom: "64px",
			}}
		>
			{bookingData && (
				<Box
					sx={{
						margin: "auto",
						maxWidth: "600px",
					}}
				>
					<SectionTitleText
						sx={{
							fontWeight: 600,
							fontSize: "32px",
							lineHeight: "30px",
							color: "#000000",
						}}
					>
						Booking Confirmed!
					</SectionTitleText>
					<Box
						sx={{
							border: "1px solid rgba(0,0,0,0.1)",
							marginTop: "32px",
							padding: "32px",
							borderRadius: "30px",
						}}
					>
						{imageSrc && (
							<Avatar
								sx={{
									height: "150px",
									width: "150px",
									textAlign: "center",
									margin: "auto",
									maxWidth: "400px",
									marginBottom: "16px",
								}}
							>
								<AppImage
									src={imageSrc || profileImg}
									width="150"
									height="150"
								/>
							</Avatar>
						)}
						{bookingData && (
							<SectionTitleText sx={{ marginBottom: "16px" }}>
								{bookingData.owner_name}
							</SectionTitleText>
						)}
						{Array.isArray(profileData.social_media_links) &&
							profileData.social_media_links.length > 0 && (
								<div
									style={{
										display: "flex",
										marginTop: "16px",
										maxWidth: "150px",
										margin: "auto",
										marginBottom: "16px",
									}}
								>
									<Avatar
										sx={{
											...avatarStyle,
											...linkedinStyle,
										}}
									>
										<FaLinkedinIn />
									</Avatar>
									<Avatar
										sx={{ ...avatarStyle, ...twitterStyle }}
									>
										<FaTwitter />
									</Avatar>
									<Avatar
										sx={{ ...avatarStyle, ...mediumStyle }}
									>
										<FaMedium />
									</Avatar>
								</div>
							)}
						<Stack
							direction="row"
							sx={{
								padding: "16px",
								maxWidth: "560px",
								margin: "auto",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									marginRight: "48px",
								}}
							>
								<Avatar
									sx={{
										background: "#07617D",
										marginRight: "16px",
									}}
								>
									<CalendarIcon />
								</Avatar>
								{formattedDate && (
									<CardTitle>
										{" "}
										{formattedDate || `Mon, 01 Nov`}
									</CardTitle>
								)}
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<Avatar
									sx={{
										background: "#07617D",
										marginRight: "16px",
									}}
								>
									<ClockIcon />
								</Avatar>
								{formattedTime && (
									<CardTitle>
										{" "}
										{formattedTime || `08 : 00 AM`} ({" "}
										{bookingData.duration} Min )
									</CardTitle>
								)}
							</Box>
						</Stack>
						<DescriptionText sx={{ textAlign: "center" }}>
							We sent a confirmation and a calendar invitation
							with a link to join the video call to{" "}
							<b>{bookingData.requestor_email}</b>
						</DescriptionText>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default BookingSuccessSection;

const avatarStyle = { marginRight: "16px", background: "#07617D" };
const twitterStyle = { background: "#1D9BF0" };
const mediumStyle = { background: "black" };
const linkedinStyle = { background: "#0A66C2" };
