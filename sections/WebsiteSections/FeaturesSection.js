/* eslint-disable react/no-unescaped-entities */
import { Avatar, Box, Container, Grid, Stack } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import AppImage from "components/Common/AppImage";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { MdRefresh } from "react-icons/md";

import calendarImage from "public/assets/website/calendar.png";
import meetingsImage from "public/assets/website/meetings.png";
import { useRouter } from "next/router";
import CalendarIconColored from "svg-icons/AppIcons/CalendarIconColored";
import ClockIconColored from "svg-icons/AppIcons/ClockIconColored";
import SyncIcon from "svg-icons/AppIcons/SyncIcon";

const featureStyle = {
	fontWeight: 700,
	fontSize: "16px",
	lineHeight: "30px",
	color: "#F9A828",
	letterSpacing: " 6.5px",
};
const listItemTitleStyle = {
	fontWeight: 700,
	fontSize: " 24px",
	lineHeight: " 30px",
	color: " #161523",
	marginBottom: "16px",
};
const FeaturesSection = () => {
	const router = useRouter();
	const handleSignUpClick = () => {
		router.push("/sign-up");
	};
	return (
		<div>
			<Box
				sx={{
					maxWidth: "800px",
					margin: "auto",
					textAlign: "center",
					marginTop: "64px",
				}}
			>
				<SectionTitleText sx={featureStyle}>FEATURES</SectionTitleText>
				<SectionTitleText
					sx={{
						fontWeight: 700,
						fontSize: "40px",
						lineHeight: "60px",
						color: "#161523",
					}}
				>
					Schedule your meetings online, with Real-time Availability.
				</SectionTitleText>
			</Box>
			<Grid container>
				<Grid item md={5}>
					<Box
						sx={{
							maxWidth: "500px",
							marginLeft: "auto",
							marginRight: "auto",
							paddingTop: "64px",
						}}
					>
						{data.map((item, index) => {
							const { icon: Icon } = item;
							return (
								<Stack
									key={index}
									direction="row"
									sx={{
										alignItems: "flex-start",
										marginTop: "32px",
									}}
								>
									<div
										style={{
											marginRight: "16px",
											// marginTop: "8px",
										}}
									>
										<Icon />
									</div>
									<div>
										<SectionTitleText
											sx={listItemTitleStyle}
										>
											{item.title}
										</SectionTitleText>
										<DescriptionText>
											{item.description}
										</DescriptionText>
									</div>
								</Stack>
							);
						})}
						<div
							style={{ paddingLeft: "40px", paddingTop: "32px" }}
						>
							<PrimaryButton onClick={handleSignUpClick}>
								Sign up for free
							</PrimaryButton>
						</div>
					</Box>
				</Grid>
				<Grid item md={6}>
					<AppImage
						src={calendarImage}
						height="800"
						sx={{
							height: {
								md: "800px",
							},
							width: {
								sm: "80vw",
								md: "auto",
							},
						}}
					/>
				</Grid>
			</Grid>

			<Grid container sx={{ display: "flex" }}>
				<Grid item md={5}>
					<Stack
						sx={{
							maxWidth: "600px",
							marginLeft: "auto",
							marginRight: "auto",
							paddingTop: "64px",
							paddingLeft: "64px",
						}}
					>
						<SectionTitleText sx={featureStyle}>
							FEATURES
						</SectionTitleText>
						<SectionTitleText
							sx={{
								fontWeight: 700,
								fontSize: "40px",
								lineHeight: "60px",
								color: "#161523",
								marginBottom: "16px",
							}}
						>
							A simple and intuitive way to see all your meetings
							in one place.
						</SectionTitleText>
						<DescriptionText
							sx={{
								fontWeight: 500,
								fontSize: "16px",
								lineHeight: " 38px",
								color: " #161523",
								opacity: 0.8,
							}}
						>
							Calpad lets you see all your meetings with agendas
							in one place, so you never miss one. Calpad's
							intuitive interface and beautiful design are
							designed to get you organized and on schedule,
							allowing you to create a schedule that works for
							you.
							<br /> Calpad is also a digital calendar that helps
							you see all your appointments, meetings and tasks in
							one place.{" "}
						</DescriptionText>
						<div style={{ paddingTop: "32px" }}>
							<PrimaryButton onClick={handleSignUpClick}>
								Sign up for free
							</PrimaryButton>
						</div>
					</Stack>
				</Grid>
				<Grid item md={7}>
					<AppImage
						src={meetingsImage}
						height="800"
						sx={{
							height: {
								md: "800px",
							},
							width: {
								sm: "80vw",
								md: "auto",
							},
						}}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default FeaturesSection;

const data = [
	{
		icon: SyncIcon,
		title: "Google calendar Sync",
		description: `	Calpad lets you easily Schedule a
		meeting in Google Calendar and Calpad
		will sync the appointment with your
		calendar.`,
	},

	{
		icon: CalendarIconColored,
		title: "Flexible availability settings",
		description: `Calpad helps you to avoid missing meetings, allowing you to choose when you want to be available to your customers.`,
	},
	{
		icon: ClockIconColored,
		title: "Timezone support",
		description: `Calpad provides support for multiple timezones, so you can easily schedule your meetings in the local timezone.`,
	},
];
