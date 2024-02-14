import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sessions: [],
};

export const homePageSlice = createSlice({
	name: "home",
	initialState,
	reducers: {
		fetchSessionsListStart() {},
		setSessionsList(state, action) {
			state.sessions = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { fetchSessionsListStart, setSessionsList } =
	homePageSlice.actions;

export default homePageSlice.reducer;
