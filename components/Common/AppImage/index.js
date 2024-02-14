import { styled } from "@mui/material";
import Image from "next/image";
import React from "react";

const StyledImage = styled(Image)(({ theme }) => ({
	...theme,
}));

const AppImage = ({ src, alt, style, sx, ...props }) => {
	return (
		<StyledImage
			src={src}
			alt={alt || " "}
			sx={sx}
			style={style}
			{...props}
		/>
	);
};

export default AppImage;
