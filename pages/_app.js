import { Provider, useSelector } from "react-redux";
import { persistor, store } from "redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import "styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "theme";
import { SnackbarProvider } from "notistack";
import "styles/calendar-styles.css";
import { useRef } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { DefaultSeo, NextSeo } from "next-seo";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import { useEffect } from "react";
import { useState } from "react";
import APP_DATA from "constants/APP_DATA";

function MyApp({ Component, pageProps }) {
	const snackbarRef = useRef();
	const title = "Calpad. A personal calendar manager app.";
	const description = "Login or create new account on calpad. Try now.";
	const pageImage = "/icon.svg";
	const website = APP_DATA.WEBSITE_URL;
	const sitename = "Calpad";
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			{" "}
			<DefaultSeo
				// defaultTitle="Welcome to Calpad"
				title={title}
				titleTemplate="%s - Calpad"
				description={description}
				additionalLinkTags={[
					{
						rel: "icon",
						href: `/icon.svg`,
					},
					{
						rel: "apple-touch-icon",
						sizes: "180x180",
						href: "/apple-touch-icon.png",
					},
					{
						rel: "icon",
						type: "image/png",
						sizes: "32x32",
						href: "/favicon-32x32.png",
					},
					{
						rel: "icon",
						type: "image/png",
						sizes: "16x16",
						href: "/favicon-16x16.png",
					},
					{
						rel: "manifest",
						href: "/site.webmanifest",
					},
					{
						rel: "mask-icon",
						href: "/safari-pinned-tab.svg",
						color: "#5bbad5",
					},
					{
						name: "msapplication-TileColor",
						content: "#da532c",
					},
				]}
				openGraph={{
					title: title,
					description: description,
					type: "website",
					locale: "en_US",
					url: website,
					site_name: "calpad.io",
					images: [
						{
							url: `${APP_DATA.WEBSITE_URL}/assets/website/web-link.png`,
							width: 400,
							height: 300,
							alt: "calpad",
						},
					],
				}}
				twitter={{
					handle: "@calpad",
					site: "@calpad",
					cardType: "summary_large_image",
				}}
				canonical={`${website}`}
			/>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider
						ref={snackbarRef}
						autoHideDuration={3000}
						maxSnack={3}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						preventDuplicate
						variant="success"
					>
						<GoogleOAuthProvider
							clientId={
								process.env
									.NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID
							}
						>
							<CssBaseline />
							{getLayout(<Component {...pageProps} />, pageProps)}
						</GoogleOAuthProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</Provider>
		</>
	);
}

export default MyApp;
