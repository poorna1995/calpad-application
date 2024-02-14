import { Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";

// Header for calendar month view

const SPCustomWeekHeader = ({ date }) => {
	const dateinNum = format(date, "dd");
	const day = format(date, "eee");
	let currentDate = new Date();
	let formatCurrentDate = format(currentDate, "dd MM, yyyy");
	let formattedDate = format(date, "dd MM, yyyy");
	return (
		<div className="rbc-header">
			<Typography
				component="div"
				variant="body1"
				padding="8px"
				sx={{
					textTransform: "uppercase",
					fontSize: "13px",
					fontWeight: "600",
				}}
			>
				<div
					style={{
						// marginBottom: "8px",
						fontSize: "12px",
					}}
				>
					{day}
				</div>

				{formattedDate === formatCurrentDate ? (
					<span
						style={{
							background: "#07617D",
							color: "white",
							borderRadius: "50%",
							padding: "4px",
							// paddingTop: "4px",
							// paddingLeft: "8px",
							// paddingRight: "8px",
							// paddingBottom: "px",
							fontWeight: 600,
							fontSize: "15px",
							// paddingBottom:'8px'
						}}
					>
						{dateinNum}
					</span>
				) : (
					<div style={{ fontSize: "15px" }}>{dateinNum}</div>
				)}
			</Typography>
		</div>
	);
};

export default SPCustomWeekHeader;
