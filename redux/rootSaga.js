import { all, call } from "redux-saga/effects";
import homePageSagas from "./homePageData/homePage.saga";
import slotsSagas from "./slots/slots.saga";
import userSagas from "./user/user.saga";

export default function* rootSaga() {
	yield all([call(userSagas), call(slotsSagas), call(homePageSagas)]);
	// yield all([call(pageDataSagas)]);
}
