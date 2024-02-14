import React, { useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
	DatePicker,
	LocalizationProvider,
	StaticDatePicker,
} from "@mui/x-date-pickers";

import { Box, styled, TextField } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import SelectTimezone from "components/Common/Inputs/SelectInput/SelectTimezone";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import lodash from "lodash";
import getTimeBasedOnTimezone from "utils/timeConversionUtils/getTimeBasedonTimezone";
import { enUS } from "date-fns/locale";
import locale from "date-fns/locale/en-US";
import changeTimezone from "utils/changeTimeZone";
import { useState } from "react";

// const StyledDatePicker = styled(StaticDatePicker)(({ theme, ...props }) => ({
// 	...props,
// 	backgroundColor: theme.palette.primary.main,
// 	color: theme.palette.common.white,
// 	"&:hover, &:focus": {
// 		backgroundColor: "blue",
// 	},
// }));

const mapState = ({ slotsData, user }) => ({
	schedules: slotsData.schedules,
	currentUser: user.currentUser,
});

const MuiDateCalendarSection = ({ slotsData }) => {
	const { currentUser } = useSelector(mapState);
	const calendarTimezone = currentUser.timezone;
	const schedules = slotsData;
	const router = useRouter();
	const userId = router.query.username;
	const date = router.query.date;
	const [value, setValue] = React.useState(date || null);

	useEffect(() => {
		if (!value) {
			setValue(date);
		}
	}, [date, value]);
	console.log({ value });
	const onChange = (e) => {
		setValue(e);
		const date = format(e, "yyyy-MM-dd");
		router.replace(`/${userId}?date=${date}`);
	};
	// const scheduleDates = schedules.map((item) => {
	// 	const { from_date } = item;
	// 	const date = getTimeBasedOnTimezone(
	// 		from_date,
	// 		"00:00AM",
	// 		calendarTimezone,
	// 	);
	// 	const formattedDate = format(date, "yyyy-MM-dd");

	// 	// new Date(from_date);
	// 	return { ...item, date, from_date: formattedDate };
	// });
	const groupByDate = lodash.groupBy(schedules, "from_date");

	// console.log({ scheduleDates, groupByDate });

	function disableWeekends(date) {
		const formattedDate = format(date, "yyyy-MM-dd");

		if (
			groupByFromDate[formattedDate] &&
			groupByFromDate[formattedDate].length > 0
		) {
			return false;
		}

		return true;
		// date.getDay() === 0 || date.getDay() === 6;
	}

	const groupByFromDate = lodash.groupBy(schedules, "from_date");

	const currentDate = new Date();
	const changeCurrentTime = changeTimezone(currentDate, enUS, "UTC");

	const formatCurrentDate = format(changeCurrentTime, "yyyy-MM-dd");
	const formatCurrentTime = format(changeCurrentTime, "hh:mma");
	const getCurrentTimeFromTimezone = getTimeBasedOnTimezone(
		formatCurrentDate,
		formatCurrentTime,
		calendarTimezone,
	);
	const formattedCurrentTimeBasedOnTimezone = format(
		getCurrentTimeFromTimezone,
		"yyyy-MM-dd, hh:mm a",
	);
	console.log({ groupByFromDate, groupByDate });
	// console.log({ value, path });

	if (locale && locale.options) {
		locale.options.weekStartsOn = 1;
	}
	return (
		<Box>
			<SectionTitleText sx={{ paddingLeft: "16px" }}>
				Select a Date
				<br />
				{/* Current Date and Time:{formattedCurrentTimeBasedOnTimezone} */}
			</SectionTitleText>{" "}
			<LocalizationProvider
				dateAdapter={AdapterDateFns}
				adapterLocale={locale}
			>
				<StaticDatePicker
					displayStaticWrapperAs="desktop"
					openTo="day"
					value={value}
					onChange={onChange}
					minDate={getCurrentTimeFromTimezone}
					renderInput={(params) => <TextField {...params} />}
					showDaysOutsideCurrentMonth={true}
					shouldDisableDate={disableWeekends}
					// disablePast
					disableOpenPicker
					views={["day"]}
					dayOfWeekFormatter={(day) => day.toUpperCase()}
				/>{" "}
			</LocalizationProvider>
			<div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
				<SelectTimezone title={"Select Timezone"} />
			</div>
		</Box>
	);
};

export default MuiDateCalendarSection;
