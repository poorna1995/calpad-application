import {
	Container,
	Divider,
	Grid,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import footerData from "constant_data/navigation/footerData";
import AppLink from "components/Common/AppLink";

const AppFooter = () => {
	const currentYear = new Date().getFullYear().toString();
	return (
		<Box
			sx={{
				background: "rgba(21, 50, 48, 1)",
				width: "100vw",
				color: "white",
				paddingBottom: "32px",
				marginTop: "32px",
			}}
		>
			<Container>
				<Grid
					container
					spacing={3}
					paddingBottom="32px"
					sx={{
						borderBottom: "1px solid rgba(255,255,255,0.2)",
					}}
				>
					<Grid item md={3}>
						<Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
							{footerData.hivepath.title}
						</Typography>
						<Typography fontSize="12px">
							{footerData.hivepath.description}
						</Typography>
						<Typography fontSize={"12px"}>
							{footerData.hivepath.email}
						</Typography>
					</Grid>
					{footerData.links.map((item, index) => (
						<Grid key={index} item md={2.3}>
							<Typography
								sx={{ fontSize: "20px", fontWeight: 700 }}
							>
								{item.head}
							</Typography>
							<Stack direction={"column"}>
								{Array.isArray(item.data) &&
									item.data.map((listItem, index) => (
										<AppLink
											href={listItem.url}
											key={index}
											sx={{
												marginTop: "12px",
												fontSize: "12px",
											}}
										>
											{listItem.title}
										</AppLink>
									))}
							</Stack>
						</Grid>
					))}
					<Grid item md={2}>
						<Typography
							sx={{
								fontSize: "20px",
								fontWeight: 700,
								marginBottom: "16px",
							}}
						>
							{" "}
							{footerData.socialLinks.title}
						</Typography>
						{footerData.socialLinks.data.map((item, index) => (
							<IconButton
								href="/"
								target="_blank"
								component="a"
								key={index}
								sx={{
									marginRight: "16px",
									background: `rgba(255, 255, 255, 0.1)`,
									padding: `8px`,
									borderRadius: "100%",
									color: "white",
									// fontSize: "12px",
									"&:hover": {
										background: `rgba(255, 255, 255, 0.1)`,
									},
								}}
							>
								{item.icon}{" "}
							</IconButton>
						))}
					</Grid>
				</Grid>

				<Typography align="center" paddingTop="16px">
					© {currentYear} All rights reserved
				</Typography>
			</Container>
		</Box>
	);
};

export default AppFooter;
