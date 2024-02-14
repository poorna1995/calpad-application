import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	slot: {},
	slots: [],
	schedules: [],
	// timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const slotsSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setSlotData(state, action) {
			state.slot = action.payload;
		},
		fetchSlotsStart() {},
		setSlots(state, action) {
			state.slots = action.payload;
		},
		setSchedules(state, action) {
			state.schedules = action.payload;
		},
		// setCalendarTimezone(state, action) {
		// 	state.timezone = action.payload;
		// },
	},
});

// Action creators are generated for each case reducer function
export const {
	setSlotData,
	setSlots,
	fetchSlotsStart,
	setSchedules,
	// setCalendarTimezone,
} = slotsSlice.actions;

export default slotsSlice.reducer;
