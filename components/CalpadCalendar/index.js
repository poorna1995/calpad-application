import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import SPCustomToolbar from "./SPCustomToolbar";
import SPCustomWeekHeader from "./SPCustomWeekHeader";
// import SPWeekEvent from "./SPWeekEvent";
// import SPCustomToolbar from "./SPCustomToolbar";
import { zonedTimeToUtc } from "date-fns-tz";
import { useDispatch, useSelector } from "react-redux";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import CreateEventPopUp from "./CreateEventPopup";
import { setSlotData } from "redux/slots/slotsSlice";
import DeleteEventPopup from "./DeleteEventPopup";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
	"en-US": enUS,
};

let currentDate = new Date();
let currentDay = currentDate.getDay();

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(1, { weekStartsOn: 1 }),
	// : () => startOfWeek(currentDate, { weekStartsOn: currentDay }),
	getDay,
	locales,
});

const customDayPropGetter = (date) => {
	const currentDate = new Date();
	if (date < currentDate)
		return {
			className: "disabled-day",
			style: {
				cursor: "not-allowed",
				background: "rgba(184, 184, 184, 0.1)",
			},
		};
	else return {};
};

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const CalpadCalendar = ({ events = [], height, style, ...calendarProps }) => {
	const calendarRef = React.createRef();
	const { currentUser } = useSelector(mapState);
	const calendarTimezone = currentUser.timezone;
	const dispatch = useDispatch();
	const [openDialog, setOpenDialog] = useState(false);
	const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
	const [eventData, setEventData] = useState({});

	const setEventCellStyling = (event) => {
		if (event.availability) {
			let style = {
				background: "rgba(7, 97, 125, 0.1)",
				borderLeft: "1px solid #07617D",
				color: "#07617D",
				fontWeight: "600",
				fontSize: "14px",
			};
			return { style };
		}

		if (event.availability === false) {
			let style = {
				background: "rgba(71, 198, 89, 0.1)",
				border: "1px solid #47C659",
				color: "#47C659",
				borderLeft: "3px solid #47C659",

				fontWeight: 600,
				fontSize: "14px",
			};
			return { style };
		}
	};

	// console.log("dates", dates);

	let timeRangeFormat = ({ start, end }, culture, local) =>
		`${local.format(start, "p", culture)} – ${local.format(
			end,
			"p",
			culture,
		)}`;

	const formats = {
		weekdayFormat: "EEE",
		// eventTimeRangeFormat:'e'
		timeGutterFormat: "hh a",
		// dayRangeHeaderFormat:'LLL ',

		eventTimeRangeFormat: timeRangeFormat,
	};
	const today = new Date();
	const showTimezone = format(today, "xxxxx");

	const dates = events.map((item) => {
		const { start_date } = item;
		return { ...item };
	});
	console.log({ events });

	const handleSelect = ({ start, end }) => {
		console.log({ start, end });
		const currentDate = new Date();
		const startTime = zonedTimeToUtc(start, calendarTimezone);
		const endTime = zonedTimeToUtc(end, calendarTimezone);
		if (start < currentDate) {
			return null;
		}
		if (start > end) return;

		handleOpenPopup();
		// setData({ start: startTime, end: endTime });
		// console.log(calendarTimezone);
		dispatch(setSlotData({ start, end }));

		// console.log(start, end);
		// console.log("startTime, endTime", startTime, endTime);
	};
	const handleOpenPopup = () => {
		setOpenDialog(true);
	};
	const handleEventSelect = (event) => {
		console.log({ event });
		if (event.booking_id) {
			// handleOpenDrawer();
			// setEventData(event);
			return null;
		}
		if (event.availability === false) return null;
		handleRemoveDialogOpen();
		setEventData(event);
	};
	const handleRemoveDialogOpen = () => {
		setOpenRemoveDialog(true);
	};
	const handleRemoveDialogClose = () => {
		setOpenRemoveDialog(false);
		setEventData({});
	};
	const handleDialogClose = () => {
		setOpenDialog(false);
		dispatch(setSlotData({}));
	};

	return (
		<>
			<DragAndDropCalendar
				ref={calendarRef}
				localizer={localizer}
				// selectable
				// resizable
				formats={formats}
				popup={true}
				events={events}
				selectable
				resizable
				longPressThreshold={1}
				eventPropGetter={setEventCellStyling}
				dayPropGetter={customDayPropGetter}
				onSelectSlot={handleSelect}
				onSelectEvent={handleEventSelect}
				// eventPropGetter={setEventCellStyling}
				// dayPropGetter={customDayPropGetter}
				views={{ week: true }}
				step={30}
				drilldownView={"week"}
				// showMultiDayTimes
				scrollToTime={currentDate.getHours()}
				defaultView={"week"}
				style={{ height: height ? height : "68vh", ...style }}
				components={{
					toolbar: SPCustomToolbar,
					week: {
						header: SPCustomWeekHeader,
					},
					header: {
						dateContentRow: (props) => {
							return (
								<span style={{ visibility: "hidden" }}></span>
							);
						},
					},
					timeGutterHeader: (props) => {
						return (
							<div style={{ paddingTop: "8px" }}>
								<span
									className="rbc-label"
									style={{
										paddingTop: "4px",
										// wordBreak: "break-word",
										// marginRight: "-4px",
										marginLeft: "-6px",
										fontWeight: 700,
									}}
								>
									{/* {"Date"} */}
									GMT
									<br /> {showTimezone}
								</span>
								{/* <br />
						  <span className="rbc-label" style={{ paddingTop: "4px" }}>
							{"Time"}
						  </span>
						  <br /> */}
							</div>
						);
					},
				}}
				{...calendarProps}
			/>

			<CreateEventPopUp
				open={openDialog}
				handleClose={handleDialogClose}
			/>
			<DeleteEventPopup
				open={openRemoveDialog}
				handleClose={handleRemoveDialogClose}
				event={eventData}
			/>
		</>
	);
};

export default CalpadCalendar;
