import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleApiCalls } from "redux/slots/slots.helpers";
import { setSectionLoading } from "redux/views/viewsSlice";
import { fetchSessionsListStart, setSessionsList } from "./homePageSlice";

export function* fetchSessionsList({ payload: { url, data } }) {
	try {
		yield put(setSectionLoading(true));

		const sessions = yield handleApiCalls(url, data);
		// console.log({ userData }, "inside saga");
		yield put(setSessionsList(sessions));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}
export function* onFetchSessionsListStart() {
	yield takeLatest(fetchSessionsListStart.type, fetchSessionsList);
}
export default function* homePageSagas() {
	yield all([call(onFetchSessionsListStart)]);
}
