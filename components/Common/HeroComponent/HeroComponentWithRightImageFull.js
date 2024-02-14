import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import RightArrowIcon from "svg-icons/RightArrowIcon";
import AppImage from "../AppImage";
import OutlinedButton from "../Buttons/OutlinedButton";
import SecondaryButton from "../Buttons/SecondaryButton";

const HeroComponentWithRightImageFull = ({
	heroBg,
	heroTitle,
	heroDescription,
	heroImage,
	heroStyle,
}) => {
	return (
		<Box
			sx={{
				background: heroBg || "rgba(21, 50, 48, 1)",
				height: "101vh",
				width: "100vw",
				minHeight: "100vh",
				maxHeight: "101vh", // paddingBottom: "64px",
			}}
		>
			<Grid
				container
				sx={{
					alignItems: "center",
					// display: "flex",
					// alignItems: "center",
					// flex: 1,
					// justifyContent: "space-evenly",
					color: "white",
					// marginTop: "-120px",
				}}
			>
				<Grid
					item
					md={6}
					sx={{ maxWidth: "700px", paddingLeft: { md: "160px" } }}
				>
					<Typography
						variant="h3"
						sx={{
							fontSize: "48px",
							lineHeight: "66px",
							fontWeight: "800",

							fontFamily: "Manrope, sans-serif",
						}}
					>
						{heroTitle ||
							`	Create your digital Transformational Journey`}
					</Typography>
					<Typography
						sx={{
							marginTop: "32px",
							marginBottom: "24px",
							maxWidth: "600px",
						}}
					>
						{heroDescription ||
							`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vehicula massa in enim luctus. Rutrum arcu.`}
					</Typography>
					<SecondaryButton
						endIcon={<RightArrowIcon />}
						sx={{
							borderRadius: "60px",
							height: "60px",
						}}
						// sx={{

						// }}
					>
						Get a Qoute
					</SecondaryButton>
				</Grid>
				<Grid
					item
					md={6}
					sx={{
						flex: 0.4,
						// overflow: "hidden",
						// paddingBottom: "64px",
						// paddingTop: "80px",
						// marginBottom: "80px",
						// marginTop: "80px",
						// maxHeight: "600px",
						...heroStyle,
					}}
				>
					{heroImage && (
						<AppImage
							className="hero-image2"
							// style={{ maxHeight: "400px", height: "400px" }}
							src={heroImage}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default HeroComponentWithRightImageFull;
