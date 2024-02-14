import { Typography } from "@mui/material";
import React from "react";

const RenderHTML = ({ content }) => {
	return (
		<Typography dangerouslySetInnerHTML={{ __html: content }}></Typography>
	);
};

export default RenderHTML;
