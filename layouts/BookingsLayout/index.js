import { Box, Container } from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import { useRouter } from "next/router";
import React from "react";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const BookingsLayout = ({
	appHeaderBg,
	pageTitle,
	pageDescription,
	children,
	overflow,
	pageImage,
}) => {
	const router = useRouter();

	return (
		<Box sx={{ maxWidth: "100%", overflow: overflow || "hidden" }}>
			<Box sx={{ textAlign: "center", marginTop: "32px" }}>
				<AppImage
					src={"/icon.svg"}
					width="40"
					height="40"
					sx={{ cursor: "pointer" }}
					onClick={() => router.push("/home")}
				/>
			</Box>
			<Box sx={{ padding: "32px", paddingBottom: "64px" }}>
				<Container>
					<BaseCard sx={{ padding: "32px" }}>{children}</BaseCard>
				</Container>
			</Box>
		</Box>
	);
};

export default BookingsLayout;
