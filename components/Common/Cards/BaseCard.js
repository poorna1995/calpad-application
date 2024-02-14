import { Card, styled } from "@mui/material";
import React from "react";

const StyledCard = styled(Card)(({ theme }) => ({
	boxShadow: " 0px 4px 30px rgba(0, 0, 0, 0.08)",
	borderRadius: "20px",
	// padding: "24px",
	...theme,
}));

const BaseCard = ({ children, ...props }) => {
	const { sx } = props;
	return <StyledCard {...props}>{children}</StyledCard>;
};

export default BaseCard;
