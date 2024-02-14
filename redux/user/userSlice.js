import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: {},
	userProfileData: {},
	syncedCalendars: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signInUserStart() {},
		signUpUserStart() {},
		signOutUserStart() {},
		signInUser(state, action) {
			state.currentUser = action.payload;
			window.localStorage.setItem(
				"currentUser",
				JSON.stringify(action.payload),
			);
		},
		signOutUser(state, action) {
			state.currentUser = {};
			window.localStorage.removeItem("currentUser");
		},
		fetchUserDataStart() {},
		setUserData(state, action) {
			state.userProfileData = action.payload;
			window.localStorage.setItem(
				"user_data",
				JSON.stringify(action.payload),
			);
		},
		fetchSyncedCalendarsStart() {},
		setSyncedCalendars(state, action) {
			state.syncedCalendars = action.payload;
		},
		setCalendarTimezone(state, action) {
			state.currentUser.timezone = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	signInUser,
	signOutUser,
	signInUserStart,
	signOutUserStart,
	signUpUserStart,
	setUserData,
	fetchSyncedCalendarsStart,
	setSyncedCalendars,
	setCalendarTimezone,
	fetchUserDataStart,
} = userSlice.actions;

export default userSlice.reducer;
