import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
	textTransform: "initial",
	paddingRight: "24px",
	paddingLeft: "24px",
	height: "48px",
	// fontFamily: "Mulish, sans-serif",
	fontWeight: 600,
	fontSize: "16px",
	lineHeight: "30px",
	borderRadius: "50px",
	// color: "black",
	borderColor: " #07617D",
	border: "1px solid #07617D",
}));

const OutlinedButton = ({ children, ...props }) => {
	return (
		<StyledButton
			variant="outlined"
			sx={{
				...props.sx,
			}}
			{...props}
		>
			{children}
		</StyledButton>
	);
};

export default OutlinedButton;
