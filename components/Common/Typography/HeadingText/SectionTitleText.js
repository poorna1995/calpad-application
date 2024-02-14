import { styled, Typography } from "@mui/material";
import React from "react";

const StyledText = styled(Typography)(({ theme }) => ({
	color: "#363636",
	fontSize: "24px",
	lineHeight: "30px",
	fontWeight: "600",
	// fontFamily: "Manrope, sans-serif",
}));
const SectionTitleText = ({ children, ...props }) => {
	return <StyledText {...props}>{children}</StyledText>;
};

export default SectionTitleText;
