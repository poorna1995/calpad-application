import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	bookingData: {},
};

export const bookingsSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setBookingData(state, action) {
			state.bookingData = action.payload;
			window.localStorage.setItem(
				"booking_data",
				JSON.stringify(action.payload),
			);
		},
		updateBookingData(state, action) {
			state.bookingData = { ...state.bookingData, ...action.payload };

			window.localStorage.setItem(
				"booking_data",
				JSON.stringify(state.bookingData),
			);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setBookingData, updateBookingData } = bookingsSlice.actions;

export default bookingsSlice.reducer;
