import { Box, Stack } from "@mui/material";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useState } from "react";
import validator from "validator";
const CreateAccountSection = () => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const handleButtonClick = () => {
		router.replace(`/sign-up?email=${email}`);
	};

	const isEmail = validator.isEmail(email);
	return (
		<Box>
			<SectionTitleText>Create account</SectionTitleText>{" "}
			<Stack
				sx={{
					maxWidth: "400px",
					marginTop: "16px",
					marginBottom: "32px",
				}}
			>
				<OutlinedButton
					sx={{ marginBottom: "16px" }}
					onClick={() => handleButtonClick()}
				>
					Sign up with Google
				</OutlinedButton>

				{/* <OutlinedButton onClick={() => handleButtonClick()}>
					Sign up with Facebook
				</OutlinedButton> */}
			</Stack>
			<Box sx={{ textAlign: "center", maxWidth: "400px" }}>Or</Box>
			<Stack sx={{ maxWidth: "400px" }}>
				<TextInput
					placeholder="Enter email"
					label={"Enter Email"}
					required
					value={email}
					errorText={"Please enter a valid email"}
					onChange={(e) => setEmail(e.target.value)}
					containerStyles={{
						marginBottom: "16px",
					}}
				/>
				<PrimaryButton
					onClick={() => handleButtonClick()}
					sx={{ marginBottom: "16px" }}
					disabled={!isEmail}
				>
					Sign up with Email
				</PrimaryButton>
			</Stack>
			<DescriptionText>
				Already have an account?{" "}
				<AppLink href="/login" sx={{ color: "#4849ae" }}>
					Log in
				</AppLink>
			</DescriptionText>
		</Box>
	);
};

export default CreateAccountSection;
