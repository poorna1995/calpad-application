/* eslint-disable react/no-unescaped-entities */
import { Box, Stack } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import PasswordInput from "components/Common/Inputs/TextInput/PasswordInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { AUTH } from "constants/API_URLS";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser, signUpUserStart } from "redux/user/userSlice";
import appFetch from "utils/appFetch";
import validator from "validator";
const EnterSignUpDetailsSection = () => {
	const router = useRouter();
	const routerEmail = router.query.email;
	const [email, setEmail] = useState(routerEmail || "");
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const handleClick = () => {
		const data = {
			email,
			fullname: fullName,
			password,
			image_url: "",
			description: "",
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		};
		appFetch(AUTH.REGISTER, data).then((json) => {
			if (json.status === "success") {
				const userData = json.user_data.user_data;
				dispatch(signInUser(userData));
				// router.push("/sign-up/add-more-details");
				enqueueSnackbar("Registration Successful!");
			} else {
				enqueueSnackbar(`${json.message}: ${json.error_fields.email}`, {
					variant: "error",
				});
			}
		});
		// dispatch(signUpUserStart({ url: AUTH.REGISTER, data }));
		// router.push("/sign-up/add-more-details");
	};
	const isStrongPassword = validator.isStrongPassword(password);
	const isEmail = validator.isEmail(email);
	const isFullName = fullName.length > 2;

	return (
		<Box>
			<SectionTitleText>Let's get you set up</SectionTitleText>
			<Stack sx={{ maxWidth: "400px" }}>
				<TextInput
					placeholder="Your name"
					value={fullName}
					// autoComplete="off"
					label="Your name"
					autoComplete="name"
					onChange={(e) => setFullName(e.target.value)}
				/>
				<TextInput
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type={"email"}
					label="Email"
					autoComplete="off"
				/>
				<PasswordInput
					placeholder="Password"
					value={password}
					label="Password"
					autoComplete="off"
					// error={!isStrongPassword}
					// helperText={
					// 	!isStrongPassword && "Please create a strong password"
					// }
					onChange={(e) => setPassword(e.target.value)}
				/>
				<PrimaryButton
					sx={{ marginTop: "16px", marginBottom: "16px" }}
					onClick={handleClick}
					disabled={!isFullName || !isStrongPassword || !isEmail}
				>
					Continue
				</PrimaryButton>
			</Stack>
		</Box>
	);
};

export default EnterSignUpDetailsSection;
