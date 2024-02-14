import { Box, Container } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import React from "react";

const WebFooter = () => {
	return (
		<Box
			sx={{
				background: "#F6F6F6",
				paddingTop: "32px",
				paddingBottom: "32px",
			}}
		>
			<Container
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div>
					<AppImage src="/calpad-logo.svg" height="40" width="160" />
				</div>
				<div>
					<AppLink
						href="/home"
						sx={{
							color: "#161523",
							fontWeight: "600",
							marginRight: "32px",
						}}
					>
						Home
					</AppLink>
					<AppLink
						href="/"
						sx={{ color: "#161523", fontWeight: "600" }}
					>
						Privacy Policy
					</AppLink>
				</div>
			</Container>
		</Box>
	);
};

export default WebFooter;
