import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";

const SectionLoader = ({}) => {
	return (
		<Box
			sx={
				{
					// width: "100%",
					// height: "400px",
					// display: "grid",
					// placeItems: "center",
				}
			}
		>
			<Backdrop
				sx={{ color: "#fff", zIndex: 9999 }}
				open={true}
				// onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Box>
	);
};

export default SectionLoader;
