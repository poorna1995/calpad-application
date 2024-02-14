import { Box, Container, Grid, Stack, TextField } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React from "react";
import footerCardBg from "public/assets/website/footer-card.png";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import TextInput from "components/Common/Inputs/TextInput";
import { useRouter } from "next/router";
import { useState } from "react";

const FooterCardSection = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const path = email ? `/sign-up?email=${email}` : `/sign-up`;
	return (
		<Grid style={{ padding: "64px" }}>
			<Box
				sx={{
					maxWidth: "1200px",
					margin: "auto",
					position: "relative",
				}}
			>
				<AppImage
					src={footerCardBg}
					height="400"
					width="1200"
					sx={{
						maxWidth: {
							md: "1200px",
							xs: "400px",
							sm: "600px",
						},
						maxHeight: {
							md: "400px",
							sm: "300px",
						},
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						top: "20px",
						width: "100%",
					}}
				>
					<Box sx={{ textAlign: "center", maxWidth: "100%" }}>
						<SectionTitleText
							sx={{
								fontWeight: 700,
								fontSize: { md: "48px", sm: "40px" },
								lineHeight: " 60px",
								textAlign: "center",
								color: "#FFFFFF",
							}}
						>
							Create an account to get started
						</SectionTitleText>
						<Stack sx={{ maxWidth: "400px", margin: "auto" }}>
							<TextInput
								placeholder="Enter your email"
								// label="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								sx={{
									// background: "white",
									marginTop: { md: "32px", sm: "8px" },
									// borderRadius: "10px",
									borderBottom: "none",

									"& .MuiOutlinedInput-root": {
										background: "white",
										// borderTopRightRadius: "10px",
										// borderBottomRightRadius: "10px",
										borderRadius: "10px",

										"&::before": {
											borderBottom: "none",
										},
										"&:hover:not(.Mui-disabled):before": {
											borderBottom: "none",
										},
										"&::after": {
											borderBottom: "none",
										},
										"&.Mui-disabled:before": {
											borderBottom: "none",
										},
									},
								}}
							/>
							<OutlinedButton
								sx={{
									borderRadius: "10px",
									background: "white",
									marginTop: { md: "32px", sm: "8px" },
									border: "none",
									"&:hover": {
										background: "white",
										border: "none",
									},
								}}
								onClick={() => router.push(path)}
							>
								Sign up
							</OutlinedButton>
						</Stack>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

export default FooterCardSection;
