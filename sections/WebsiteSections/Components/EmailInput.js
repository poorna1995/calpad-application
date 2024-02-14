import { Box, Input } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import Router from "next/router";
import React from "react";
import { useState } from "react";

import validator from "validator";
const EmailInput = () => {
	const [email, setEmail] = useState("");
	const handleClick = () => {
		Router.push(`/sign-up?email=${email}`);
	};
	const isEmail = validator.isEmail(email);
	return (
		<Box
			sx={{
				background: "white",
				marginTop: "16px",
				border: "1px solid rgba(0,0,0,0.1)",
				maxWidth: "500px",
				display: "flex",
				justifyContent: "space-between",
				flex: 1,
				borderRadius: "10px",
				padding: "4px",
				paddingLeft: "16px",
				"&:hover": {
					border: (theme) =>
						`2px solid ${theme.palette.primary.main}`,
				},
			}}
		>
			<Input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				sx={{
					flex: 1,
					paddingRight: "16px",
					"&.MuiInput-root": {
						borderBottom: "none",
						"&::before": {
							borderBottom: "none",
						},
						"&::after": {
							borderBottom: "none",
						},
						"&:hover:not(.Mui-disabled):before": {
							borderBottom: "none",
						},
					},
				}}
			/>
			<PrimaryButton
				disabled={!isEmail}
				sx={{ borderRadius: "10px" }}
				onClick={handleClick}
			>
				Sign up
			</PrimaryButton>
		</Box>
	);
};

export default EmailInput;
