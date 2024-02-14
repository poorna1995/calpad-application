import { Container, Grid, Stack } from "@mui/material";
import AppImage from "components/Common/AppImage";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import heroImage from "public/assets/website/hero-image.png";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import EmailInput from "./Components/EmailInput";
const HeroSection = () => {
	return (
		<div style={{ maxWidth: "100%" }}>
			<Container>
				<Grid container alignItems={"center"}>
					<Grid item sx={{ maxWidth: "600px" }}>
						<SectionTitleText
							sx={{
								fontWeight: 700,
								fontSize: "52px",
								lineHeight: " 140.4%",
								/* or 73px */
								color: "#161523",
							}}
						>
							Plan and schedule your meetings the
							<br />
							<span style={{ color: "#F9A828" }}>Simple Way</span>
						</SectionTitleText>
						<DescriptionText>
							Make meeting times efficient and easy with Calpad.
							Let Calpad do the scheduling for you, so you can
							focus on what matters most.
						</DescriptionText>
						<EmailInput />
					</Grid>
					<Grid item>
						<AppImage src={heroImage} height="500" />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default HeroSection;
