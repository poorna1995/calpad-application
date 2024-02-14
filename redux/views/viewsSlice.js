import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sectionLoading: false,
};

export const viewsSlice = createSlice({
	name: "views",
	initialState,
	reducers: {
		setSectionLoading(state, action) {
			state.sectionLoading = action.payload;
		},
		setPageRoute() {},
	},
});

// Action creators are generated for each case reducer function
export const { setSectionLoading, setPageRoute } = viewsSlice.actions;

export default viewsSlice.reducer;
