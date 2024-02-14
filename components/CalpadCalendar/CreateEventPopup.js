import React from "react";

import {
	Container,
	Dialog,
	DialogTitle,
	Grid,
	Modal,
	Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useState } from "react";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useDispatch, useSelector } from "react-redux";
// import { setSlot, setSlots } from "store/calendarSlots/calendarSlotsSlice";
import { format } from "date-fns";
// import authFetch from "utils/authFetch";
import { useEffect } from "react";
// import { differenceInMinutes } from "date-fns/";
// import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
// import fetchSlotPlan from "../../utils/fetchSlotPlan";
import FormSelectInput from "components/Common/Inputs/SelectInput";
// import HivepathBaseDialog from "components/Common/Dialog/HivepathBaseDialog";
import timedata from "./timedata";
// import fetchCalendarView from "../../utils/fetchCalendarView";
// import { CALENDAR_SERVICES } from "constants/API_URLS";
import BaseDialog from "components/Common/Dialog";
import appFetch from "utils/appFetch";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AUTH, CALENDAR } from "constants/API_URLS";
import { fetchSlotsStart } from "redux/slots/slotsSlice";

const mapState = ({ user, slotsData }) => ({
	currentUser: user.currentUser,
	calendarTimezone: user.currentUser.timezone,
	slot: slotsData.slot,
	syncedEmails: user.syncedCalendars,
});

const CreateEventPopUp = ({ handleClose, open }) => {
	const { currentUser, calendarTimezone, slot, syncedEmails } =
		useSelector(mapState);

	const USER_ID = currentUser.user_id;

	const startTimeAndDate = slot.start;

	const emails = syncedEmails.map((item) => item.email);
	const endTimeAndDate = slot.end;
	const frequencyDefault = {
		label: "Does not repeat",
		value: "once",
	};
	const [frequency, setFrequency] = useState(frequencyDefault);

	// const enqueueSnackbar = useEnquequeSnackbar();
	const from_time = startTimeAndDate && format(startTimeAndDate, "hh:mma");
	const fromWithLabel = {
		label: from_time,
		value: from_time,
	};

	const formattedStartDate =
		startTimeAndDate && format(startTimeAndDate, "eeee, MMMM dd, yyyy ");
	const weekDay = startTimeAndDate && format(startTimeAndDate, "eeee");

	const to_time = endTimeAndDate && format(endTimeAndDate, "hh:mma");
	const toWithLabel = {
		label: to_time,
		value: to_time,
	};

	const [startValue, setStartValue] = useState(fromWithLabel);
	const [endValue, setEndValue] = useState(toWithLabel);
	console.log({ startValue });

	const [endFrequencyDate, setEndFrequencyDate] = useState(endTimeAndDate);

	const endDateFormatted =
		endFrequencyDate && format(endFrequencyDate, "yyyy-MM-dd");
	// console.log({ endFrequencyDate });
	useEffect(() => {
		setStartValue(fromWithLabel);
		setEndValue(toWithLabel);
		setEndFrequencyDate(endTimeAndDate);
		setFrequency(frequencyDefault);
	}, [slot.start, slot.end]);
	// console.log({ startValue, endValue });

	// const startTimeAndDate = new Date(slot.start);
	// const endTimeAndDate = new Date(slot.end);
	const dispatch = useDispatch();

	const from_date =
		startTimeAndDate && format(startTimeAndDate, "yyyy-LL-dd");
	const to_date = endTimeAndDate && format(endTimeAndDate, "yyyy-LL-dd");
	const frequencyValue = frequency.value;

	const updateSlot = (e) => {
		e.preventDefault();

		try {
			// if (startTimeAndDate === typeof Date && endTimeAndDate === typeof Date) {
			const schema = {
				type: "one-one",
				user_id: USER_ID,
				from_date: from_date,
				to_date: to_date,
				from_time: startValue.value,
				to_time: endValue.value,
				timezone: calendarTimezone,
				// week_day: weekDay,
				frequency: frequencyValue,
				end_date:
					frequencyValue === "once" ? to_date : endDateFormatted,
			};

			// Backend connection
			const url = CALENDAR.SLOT_PLAN;

			appFetch(url, schema).then((json) => {
				console.log(json);
				if (json.status === "success") {
					const user_id = USER_ID;
					dispatch(
						fetchSlotsStart({
							url: CALENDAR.FETCH_CALENDAR_VIEW,
							data: { user_id, email: emails },
						}),
					);
				} else {
				}
			});
			// }
		} catch (error) {
			console.log(error);
		}

		// Redux store
		// dispatch(setSlot({}));
		// dispatch(addSlotStart([...slots, eventData]));

		handleClose();
	};

	const options = [
		{
			label: "Does not repeat",
			value: "once",
		},
		{
			label: "Everyday",
			value: "daily",
		},
		{
			label: `Every week on ${weekDay}`,
			value: "weekly",
		},
	];
	const timeOptions = timedata.map((item) => {
		return { label: item, value: item };
	});

	return (
		<BaseDialog
			open={open}
			handleClose={handleClose}
			scroll={`body`}
			// onBackdropClick={handleClose}
			sx={{}}
		>
			<DialogTitle
				style={{
					fontSize: "21px",
					fontWeight: "bold",
					marginTop: "-24px",
				}}
			>
				Mark your availability
			</DialogTitle>

			<Container
				// maxWidth="md"

				sx={{
					background: "white",
					top: "30%",
					// position: "absolute",
					left: "10%",
					minWidth: "450px",
					paddingBottom: "64px",
					// minHeight: "300px",
					// padding:'32px'
				}}
			>
				{formattedStartDate && (
					<Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
						{formattedStartDate}
					</Typography>
				)}
				<div>
					<Grid container direction="row" columnSpacing={2}>
						<Grid item xs={6}>
							<FormSelectInput
								placeholder="Add Start Time"
								value={startValue}
								onChange={(e) => setStartValue(e)}
								options={timeOptions}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormSelectInput
								placeholder="Add End Time"
								value={endValue}
								onChange={(e) => setEndValue(e)}
								options={timeOptions}
							/>
						</Grid>
					</Grid>
					{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ paddingTop: "16px" }} direction="row">
              <TimePicker
                label="Add start time"
                value={startTimeAndDate}
                onChange={(newValue) => {
                  setStartTimeAndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Add End time"
                value={endTimeAndDate}
                onChange={(newValue) => {
                  setEndTimeAndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider> */}

					<FormSelectInput
						placeholder="Repeats in"
						value={frequency}
						onChange={(e) => setFrequency(e)}
						options={options}
					/>

					{(frequency.value === "daily" ||
						frequency.value === "weekly") && (
						<div
							style={{
								paddingTop: "16px",
							}}
						>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label="Ends at"
									value={endFrequencyDate}
									onChange={(newValue) => {
										setEndFrequencyDate(newValue);
									}}
									renderInput={(params) => (
										<TextField fullWidth {...params} />
									)}
								/>
							</LocalizationProvider>
						</div>
					)}
				</div>
				<div
					style={{
						display: "flex",
						padding: "8px",
						justifyContent: "center",
						paddingTop: "32px",
					}}
				>
					<PrimaryButton
						// title="Save"
						onClick={updateSlot}
						style={{ marginRight: "8px" }}
					>
						Save
					</PrimaryButton>
				</div>
			</Container>
		</BaseDialog>
	);
};

export default CreateEventPopUp;
