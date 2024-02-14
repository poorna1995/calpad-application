import {
	Autocomplete,
	InputAdornment,
	MenuItem,
	TextField,
	Menu,
	InputLabel,
} from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//   import { setCalendarTimezone } from "store/slots/slots.actions";
import timezones from "timezones-list";

import Select, { components } from "react-select";
import { fetchUserDataStart, setCalendarTimezone } from "redux/user/userSlice";
import { handleApiCalls } from "redux/slots/slots.helpers";
import { AUTH } from "constants/API_URLS";

const mapState = ({ user }) => ({
	calendarTimezone: user.currentUser.timezone,
	currentUser: user.currentUser,
});

const removeUnderscore = function (str = "") {
	return str.replace(/[_]/gi, " ");
};

const SelectTimezone = ({ title, ...props }) => {
	const { calendarTimezone, currentUser } = useSelector(mapState);
	const USER_ID = currentUser.user_id;
	const [timezone, setTimezone] = React.useState(
		calendarTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
	);
	// console.log(calendarTimezone);
	useEffect(() => {
		if (calendarTimezone) return setTimezone(calendarTimezone);
		setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, [calendarTimezone]);

	const initialTimezoneValue = {
		label: removeUnderscore(calendarTimezone),
		value: calendarTimezone,
	};

	// console.log(initialTimezoneValue);
	const [timezoneValue, setTimezoneValue] =
		React.useState(initialTimezoneValue);

	const ref = React.createRef();

	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		// console.log("event in input", event);
		setTimezoneValue(newValue);
		if (newValue?.value) {
			setTimezone(newValue?.value);
			dispatch(setCalendarTimezone(newValue?.value));
			// handleUpdateUserProfile(event, newValue?.value);
		}
		// console.log({ newValue, event });
	};
	const handleUpdateUserProfile = (e, timezone) => {
		let data = {
			user_id: USER_ID,
			timezone,
		};
		handleApiCalls(AUTH.UPDATE_PROFILE, data).then(() => {
			dispatch(
				fetchUserDataStart({
					url: AUTH.FETCH_PROFILE,
					data: { user_id: USER_ID },
				}),
			);
		});
	};

	const asiaCalcutta = {
		label: "Asia/Calcutta",
		tzCode: "Asia/Calcutta",
		name: "(GMT+05:30) Mumbai, Delhi, Bengaluru, Kolkata, Chennai",
		utc: "+05:30",
	};
	const newList = [...timezones, asiaCalcutta];
	// console.log(newList);
	const options = newList
		.map((item) => {
			const { label, name, tzCode, utc } = item;

			return {
				label: removeUnderscore(tzCode),
				value: tzCode,
				name: name,
				utc: utc,
			};
		})
		.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

	useEffect(() => {
		dispatch(setCalendarTimezone(timezone));
	}, [timezone, dispatch]);
	// console.log({ options });

	return (
		<div style={{ zIndex: "100" }}>
			{/* {title && (
				<InputLabel sx={{ fontWeight: 600, marginBottom: "8px" }}>
					{title}
				</InputLabel>
			)} */}
			{/* <Select
				{...props}
				ref={ref}
				value={initialTimezoneValue}
				onChange={handleChange}
				styles={customStyles}
				closeMenuOnSelect
				options={options}
				placeholder="Select Timezone"
				theme={(theme) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: "#484A9E",
					},
					borderColor: theme.primary,
					borderRadius: "10px",
				})}
			/> */}
			<Autocomplete
				options={options}
				getOptionLabel={(option) => option.label}
				id="controlled-input-timezone"
				value={initialTimezoneValue}
				onChange={(event, newValue) => handleChange(event, newValue)}
				selectOnFocus
				clearIcon={false}
				sx={{
					"div .MuiOutlinedInput-root": {
						borderRadius: "10px",
					},
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Select Timezone"
						variant="outlined"
					/>
				)}
			/>
		</div>
	);
};

export default SelectTimezone;
// let options = [
//   {
//     value: "America/New_York",
//     label: "America/New_York",
//   },
//   {
//     value: "Europe/Paris",
//     label: "Europe/Paris",
//   },
//   {
//     value: "Asia/Calcutta",
//     label: "Asia/Calcutta",
//   },
//   {
//     label: "Asia/Kolkata",
//     value: "Asia/Kolkata",
//   },
// ];
