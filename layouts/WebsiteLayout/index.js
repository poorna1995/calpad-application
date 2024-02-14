import { Box } from "@mui/material";
import WebFooter from "components/AppFooter/WebFooter";
import HomeHeader from "components/AppHeader/HomeHeader";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const WebsiteLayout = ({ children, pageTitle, pageDescription }) => {
	const { currentUser } = useSelector(mapState);
	const router = useRouter();
	useEffect(() => {
		if (currentUser.user_id) router.push("/home");
	}, [currentUser]);
	return (
		<Box sx={{ maxWidth: "100%" }}>
			<HomeHeader />
			<Box sx={{ marginTop: "80px" }}>{children}</Box>
			<WebFooter />
		</Box>
	);
};

export default WebsiteLayout;
