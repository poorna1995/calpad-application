import { Box, Container } from "@mui/material";
import AppHeader from "components/AppHeader";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import useLocalStorage from "customHooks/useLocalStorage";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "redux/user/userSlice";

const mapState = ({ user, views }) => ({
	currentUser: user.currentUser,
	isLoading: views.sectionLoading,
});

const BaseLayout = ({
	appHeaderBg,
	pageTitle,
	pageDescription,
	children,
	overflow,
}) => {
	const router = useRouter();
	const [user, setUser] = useLocalStorage("currentUser");

	const { currentUser, isLoading } = useSelector(mapState);
	// console.log({ user, currentUser });
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (currentUser === {} || currentUser === undefined)
	// 		dispatch(signInUser(user));
	// }, [currentUser, user]);
	useEffect(() => {
		if (!currentUser.email) router.push("/login");
	}, [currentUser, router]);

	return (
		<Box sx={{ maxWidth: "100%", overflow: overflow || "hidden" }}>
			<NextSeo title={pageTitle} description={pageDescription} />
			<AppHeader appHeaderBg={appHeaderBg} />
			<Box sx={{ marginTop: "64px" }}>{children}</Box>
		</Box>
	);
};

export default BaseLayout;
