/* eslint-disable react/no-unescaped-entities */
import { Stack } from "@mui/material";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import PasswordInput from "components/Common/Inputs/TextInput/PasswordInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { AUTH } from "constants/API_URLS";
import useLocalStorage from "customHooks/useLocalStorage";
import AuthLayout from "layouts/AuthLayout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signInUserStart } from "redux/user/userSlice";
import appFetch from "utils/appFetch";

const mapState = ({ currentUser }) => ({
	currentUser: currentUser,
});

export async function getStaticProps(context) {
	return {
		props: {
			title: "Login",
		}, // will be passed to the page component as props
	};
}
const LoginPage = (props) => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const { currentUser } = useSelector(mapState);
	// const [user, setUser] = useLocalStorage("currentUser", currentUser);
	const router = useRouter();
	const handleButtonClick = () => {
		let data = {
			email,
			password,
		};
		appFetch(AUTH.LOGIN, data)
			.then((json) => {
				if (json.status === "success") {
					dispatch(signInUser(json.user_data));
					// router.push("/");
					enqueueSnackbar(json.message, { variant: "success" });
				} else {
					enqueueSnackbar(json.message, { variant: "error" });
				}
			})
			.catch((err) => {
				enqueueSnackbar(err.message, { variant: "error" });
			});
		// dispatch(signInUserStart({ url: AUTH.LOGIN, data, path: "/home" }));
		//
	};
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const isDisabled = !email || !password;
	const goToHome = () => {
		router.push("/home");
	};
	useEffect(() => {
		if (currentUser && currentUser.email) return goToHome();
	}, [currentUser]);

	const pageTitle = props.title;
	const pageDescription = "Login to Calpad to sync your calendars.";

	return (
		<>
			<NextSeo
				title={pageTitle}
				titleTemplate="%s - Calpad"
				description={pageDescription}
				canonical="https://calpad.io"
				openGraph={{
					url: "https://calpad.io",
					title: pageTitle,
					description: pageDescription,
					// images: ["/icon.svg"],
					siteName: "Calpad ",
				}}
				twitter={{
					handle: "@calpad",
					site: "calpad.io",
					title: pageTitle,
					description: pageDescription,
					// images: ["/icon.svg"],
				}}
			/>
			<SectionTitleText>Log in to your account</SectionTitleText>
			<Stack sx={{ maxWidth: "400px" }} component="form">
				<TextInput
					placeholder="Your Email"
					type="email"
					value={email}
					label="Your email"
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
				/>
				<PasswordInput
					placeholder="Password"
					value={password}
					label="Password"
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
				/>
				<PrimaryButton
					sx={{ marginTop: "16px", marginBottom: "16px" }}
					onClick={() => handleButtonClick()}
					disabled={isDisabled}
				>
					Log in
				</PrimaryButton>
			</Stack>
			<DescriptionText>
				Don't have an account?{" "}
				<AppLink href="/sign-up" sx={{ color: "#4849ae" }}>
					Create account
				</AppLink>
			</DescriptionText>
		</>
	);
};

LoginPage.getLayout = function getLayout(page) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
