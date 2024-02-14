import { Box, Grid, Stack } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React from "react";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import scheduleImage from "public/assets/website/schedule.png";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useRouter } from "next/router";

const featureStyle = {
	fontWeight: 700,
	fontSize: "16px",
	lineHeight: "30px",
	color: "#F9A828",
	letterSpacing: " 6.5px",
};

const ScheduleSection = () => {
	const router = useRouter();
	return (
		<Grid
			container
			sx={{
				background: (theme) => theme.palette.primary.main,
				paddingTop: "64px",
				paddingBottom: "64px",
				paddingRight: "64px",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<Grid item md={6}>
				<AppImage
					src={scheduleImage}
					height="800"
					sx={{
						height: {
							md: "800px",
							sm: "520px",
						},
						width: {
							md: "auto",
							sm: "80vw",
						},
					}}
				/>
			</Grid>
			<Grid item md={5} sx={{ padding: "64px", paddingLeft: "0px" }}>
				<Stack>
					<SectionTitleText sx={featureStyle}>
						FEATURES
					</SectionTitleText>
					<SectionTitleText
						sx={{
							fontWeight: 700,
							fontSize: "40px",
							lineHeight: "60px",
							color: "white",
							marginBottom: "16px",
						}}
					>
						Schedule your meetings quickly, with just a few simple
						clicks.
					</SectionTitleText>
					<DescriptionText
						sx={{
							fontWeight: 500,
							fontSize: "16px",
							lineHeight: " 38px",
							color: " white",
							opacity: 0.8,
						}}
					>
						You can easily schedule your meetings with just a few
						clicks. You don’t have to go through the hassle of
						sending emails back and forth, trying to find free times
						that work for both parties. This saves you time because
						it eliminates the back-and-forth process.
					</DescriptionText>
					<div style={{ paddingTop: "32px" }}>
						<OutlinedButton
							sx={{
								background: "white",
								"&:hover": { background: "white" },
							}}
							onClick={() => router.push("/sign-up")}
						>
							Sign up for free
						</OutlinedButton>
					</div>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default ScheduleSection;
