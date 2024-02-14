import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import AppHeader from "components/AppHeader";
import AppImage from "components/Common/AppImage";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import sideBg from "/public/assets/auth/auth_bg.png";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const AuthLayout = ({
	appHeaderBg,
	pageTitle,
	pageDescription,
	children,
	overflow,
	autoHeight,
	pageImage,
}) => {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	const path = router.asPath;
	useEffect(() => {
		if (currentUser.user_id) router.push("/home");
	}, [currentUser, router]);

	return (
		<Box sx={{ maxWidth: "100%", overflow: overflow || "hidden" }}>
			{/* <Head>
				<title>
					{(pageTitle && `${pageTitle} - Calpad`) || "Calpad"}
				</title>
				<meta
					name="description"
					content={pageDescription || "Calpad"}
				/>
				<meta name="theme-color" content="#000000" />

				<meta name="image" content={pageImage || "/icon.svg"} />

				<meta
					// name="og:image"
					property="og:image"
					content={pageImage || "/icon.svg"}
				/>
				<meta
					// name="og:title"
					property="og:title"
					content={`${pageTitle} - Calpad`}
				/>
				<meta
					// name="og:image"
					property="og:image"
					content={pageImage || "/icon.svg"}
				/>
				<meta
					// name="og:site_name"
					property="og:site_name"
					content={`Calpad`}
				/>
				<meta
					// name="og:image:width"
					property="og:image:width"
					content="1200"
				/>
				<meta
					// name="og:image:height"
					property="og:image:height"
					content="600"
				/>

				<meta
					// name="og:description"
					property="og:description"
					content={pageDescription}
				/> */}
			{/* <meta
					name="og:url"
					property="og:url"
					content={`https://calpad.io/${path}`}
				/> */}
			{/* 
				<meta
					// name="twitter:image"
					property="twitter:image"
					content={pageImage}
				/>
				<meta
					// name="twitter:title"
					property="twitter:title"
					content={`${pageTitle} - Calpad`}
				/>
				<meta
					// name="twitter:description"
					property="twitter:description"
					content={pageDescription}
				/> */}
			{/* <meta
					name="twitter:url"
					property="twitter:url"
					content={`https://calpad.io/${path}`}
				/> */}

			{/* <link rel="icon" href="/icon.svg" />
			</Head> */}

			<Box sx={{}}>
				<Grid container sx={{ maxHeight: !autoHeight && "100vh" }}>
					<Grid item md={7}>
						<Box
							sx={{
								paddingTop: "64px",
								paddingLeft: "96px",
								maxWidth: "600px",
								margin: "auto",
							}}
						>
							<AppImage
								src="/icon.svg"
								width="40"
								height="40"
								onClick={() => router.push("/")}
								sx={{ cursor: "pointer" }}
							/>
							<Box sx={{ paddingTop: "64px" }}>{children}</Box>
						</Box>
					</Grid>
					<Grid item md={5} sx={{ position: "sticky", top: "0px" }}>
						<AppImage src={sideBg} alt="" width="650" priority />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default AuthLayout;
