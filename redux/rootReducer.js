import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "./user/userSlice";
import viewsSlice from "./views/viewsSlice";
import slotsSlice from "./slots/slotsSlice";
import bookingsSlice from "./bookings/bookingsSlice";
import homePageSlice from "./homePageData/homePageSlice";

export const rootReducer = combineReducers({
	user: userSlice,
	views: viewsSlice,
	slotsData: slotsSlice,
	bookings: bookingsSlice,
	homePageData: homePageSlice,
});

const configStorage = {
	key: "root",
	storage,
	whitelist: ["user", "bookings"],
};

export default persistReducer(configStorage, rootReducer);
