import { InputLabel, styled, TextField } from "@mui/material";
import React from "react";

const StyledContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-evenly",
	maxWidth: "600px",
	height: "100%",
	width: "100%",
	margin: "auto",
	marginTop: "24px",
}));

const StyledLabel = styled(InputLabel)(({ theme }) => ({
	color: "black",
	margin: theme.spacing(1),
	marginLeft: 0,
	marginBottom: "10px",
	fontSize: "16px",
	fontWeight: 500,
	lineHeight: "19px",
	letterSpacing: "-3%",
}));
const TextInput = ({ title, required, containerStyles, ...props }) => {
	return (
		<StyledContainer style={containerStyles}>
			{title && <StyledLabel required={required}>{title}</StyledLabel>}
			<TextField
				inputProps={{
					sx: {
						paddingTop: "15px",
						paddingBottom: "14px",
						borderRadius: "10px",
					},
				}}
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: "10px",
					},
				}}
				fullWidth
				variant="outlined"
				{...props}
			/>
		</StyledContainer>
	);
};

export default TextInput;
