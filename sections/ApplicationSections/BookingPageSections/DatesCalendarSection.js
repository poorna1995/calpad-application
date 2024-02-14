import React, { useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar, useDateInput } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { Box } from "@mui/material";

const DatesCalendarSection = () => {
	const [date, setDate] = useState();
	const inputProps = useDateInput({
		date,
		format: "yyyy-MM-dd",
		locale: enGB,
		onDateChange: setDate,
	});
	return (
		<Box
			sx={{
				"& .nice-dates-day": {
					fontWeight: "600",
					color: "black",
					"&::after": {
						borderColor: (theme) => theme.palette.primary.main,
					},
				},
				"& .nice-dates-navigation_current": {
					// fontWeight: "bolder",
				},
				"& .nice-dates-week-header_day": {
					fontWeight: "bolder",
					color: "#373434",
				},
				"& .-disabled": {
					color: "#b4b4b4",
				},
				"& .nice-dates-navigation_next": {
					// position: "absolute",
					// left: "30px",
				},
				"& .nice-dates-navigation_current": {
					textAlign: "left",
					// paddingLeft: "30px",
					// fontSize: "21px",
					// fontWeight: "bold",
				},
				"& .nice-dates-week-header": {
					boxShadow: "none",
				},
				"& .nice-dates-navigation": {
					paddingTop: "15px",
					marginBottom: "11px",
				},

				"& .-slotsAvailable": {
					"& .nice-dates-day_date": {
						background: "rgba(72, 74, 158, 0.1)",
						color: (theme) => theme.palette.primary.main,
						borderRadius: "50%",
						width: "80%",
						height: "80%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					},
					"&::before": {
						left: "10.5%",
						right: "10.5%",
						top: "10.5%",
						bottom: "10.5%",
					},
					"&::after": {
						left: "10.5%",
						right: "10.5%",
						top: "10.5%",
						bottom: "10.5%",
					},
				},
				"& .-selected": {
					"& .nice-dates-day_date": {
						color: "white !important",
					},
					"&::before": {
						backgroundColor: (theme) => theme.palette.primary.main,
					},
				},
			}}
		>
			<DatePickerCalendar
				date={date}
				onDateChange={setDate}
				locale={enGB}

			/>
		</Box>
	);
};

export default DatesCalendarSection;
