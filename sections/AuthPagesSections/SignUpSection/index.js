import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import CreateAccountSection from "./CreateAccountSection";
import EnterSignUpDetailsSection from "./EnterSignUpDetailsSection";

const SignUpSection = () => {
	const router = useRouter();
	// const email = router.query.email;
	return (
		<Box>
			<EnterSignUpDetailsSection />{" "}
		</Box>
	);
};

export default SignUpSection;
