import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import RightArrowIcon from "svg-icons/RightArrowIcon";
import AppImage from "../AppImage";
import OutlinedButton from "../Buttons/OutlinedButton";
import SecondaryButton from "../Buttons/SecondaryButton";

const HeroComponent = ({
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
				height: "100vh",
				width: "100vw",
				// paddingBottom: "64px",
			}}
		>
			<Container
				sx={{
					height: "inherit",
					display: "flex",
					alignItems: "center",
					flex: 1,
					justifyContent: "space-evenly",
					color: "white",
				}}
			>
				<Box sx={{ flex: 0.6, paddingRight: "32px" }}>
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
				</Box>
				<Box
					sx={{
						flex: 0.4,
						overflow: "hidden",
						paddingBottom: "48px",
						// marginBottom: "80px",
						marginTop: "80px",
						// maxHeight: "600px",
						...heroStyle,
					}}
				>
					{heroImage && (
						<AppImage
							className="hero-image"
							// style={{ maxHeight: "400px", height: "400px" }}
							src={heroImage}
						/>
					)}
				</Box>
			</Container>
		</Box>
	);
};

export default HeroComponent;
