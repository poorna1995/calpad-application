import { Box, Button, Stack, TextField } from "@mui/material";
import SelectTimezone from "components/Common/Inputs/SelectInput/SelectTimezone";
import TextInput from "components/Common/Inputs/TextInput";
import React from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const AccountDetailsSection = () => {
	const { currentUser } = useSelector(mapState);
	const email = currentUser.email;
	return (
		<Box
			sx={{
				maxWidth: "400px",
				height: "50vh",
			}}
		>
			<Stack>
				<SelectTimezone
					title="Select Timezone"
					label={"Select Timezone"}
				/>
				<TextInput placeholder="Email" label="Email" value={email} />
				<TextInput
					placeholder="Password"
					label="Password"
					type={"password"}
				/>
			</Stack>{" "}
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button
					sx={{
						textTransform: "capitalize",
						marginTop: "16px",
						fontWeight: 600,
						fontSize: " 16px",
						lineHeight: "30px",
						width: "auto",
					}}
				>
					Change Password
				</Button>
			</Box>
		</Box>
	);
};

export default AccountDetailsSection;
