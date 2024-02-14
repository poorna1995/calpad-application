import { styled } from "@mui/material";
import Link from "next/link";
import React from "react";

const StyledLink = styled(Link)(({ theme }) => ({
	cursor: "pointer",
	// marginRight: "16px",
	fontFamily: theme.typography.fontFamily,
	...theme,
}));

const AppLink = ({ children, ...props }) => {
	return (
		// <Link {...props}>
		<StyledLink sx={props.sx} {...props}>
			{children}
		</StyledLink>
		// </Link>
	);
};

export default AppLink;
