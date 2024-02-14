import { Stack, Box, Typography, Grid } from "@mui/material";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";
import card_bg_image from "public/assets/card/footer_card_bg.png";
import AppImage from "components/Common/AppImage";
const FooterCard = () => {
	return (
		<Box sx={{ paddingBottom: "64px" }}>
			<BaseCard
				sx={{
					display: "flex",
					flex: "1",
					justifyContent: "space-between",
				}}
			>
				<Grid container alignItems={"center"}>
					<Grid item md={7} sx={{ paddingLeft: "64px" }}>
						<Typography
							sx={{
								fontSize: "42px",
								lineHeight: "60px",
								fontWeight: 800,
								marginBottom: "16px",
							}}
						>
							We create unique & efficient digital solutions
						</Typography>
						<SecondaryButton
							sx={{
								background: "rgba(21, 50, 48, 1)",
								color: "white",
								"&:hover": {
									background: "rgba(21, 50, 48, 1)",
								},
							}}
						>
							Get a Qoute
						</SecondaryButton>
					</Grid>
					<Grid item md={5}>
						<AppImage
							src={card_bg_image}
							style={{
								flex: 0.4,
								height: "300px",
								width: "300px",
							}}
						/>
					</Grid>
				</Grid>
			</BaseCard>
		</Box>
	);
};

export default FooterCard;
