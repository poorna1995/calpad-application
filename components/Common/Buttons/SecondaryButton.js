import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
	textTransform: "initial",

	// color: "rgba(11, 57, 72, 1)",
	// borderRadius: "20px",
	paddingRight: "40px",
	paddingLeft: "40px",
	// fontFamily: "Mulish, sans-serif",
	fontWeight: 700,
	fontSize: "18px",
	lineHeight: "28px",
	// height: "48px",
	// borderRadius: "60px",

	// "&:hover": {
	// 	background: "white",
	// },
}));

const SecondaryButton = ({ children, ...props }) => {
	return (
		<StyledButton variant="contained" disableElevation {...props}>
			{children}
		</StyledButton>
	);
};

export default SecondaryButton;
