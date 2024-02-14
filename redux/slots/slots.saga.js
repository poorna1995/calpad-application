import { all, call, put, takeLatest } from "redux-saga/effects";
import { setSectionLoading } from "redux/views/viewsSlice";
import { fetchCalendarView, handleApiCalls } from "./slots.helpers";
import { fetchSlotsStart, setSlots } from "./slotsSlice";

export function* fetchSlots({ payload: { url, data } }) {
	try {
		yield put(setSectionLoading(true));

		const userData = yield fetchCalendarView(data.user_id, data.email);
		// console.log({ userData }, "inside saga");
		yield put(setSlots(userData));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}
export function* onFetchSlotsStart() {
	yield takeLatest(fetchSlotsStart.type, fetchSlots);
}
export default function* slotsSagas() {
	yield all([call(onFetchSlotsStart)]);
}
