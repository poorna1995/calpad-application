// Add saga code here to sync data from the backend and manage state of the application

import Router from "next/router";
import { takeLatest, call, all, put } from "redux-saga/effects";
import { handleApiCalls } from "redux/slots/slots.helpers";

import { setPageRoute, setSectionLoading } from "redux/views/viewsSlice";
import { handleAuthApiCalls } from "./user.helper";
import {
	fetchSyncedCalendarsStart,
	fetchUserDataStart,
	setSyncedCalendars,
	setUserData,
	signInUser,
	signInUserStart,
	signUpUserStart,
} from "./userSlice";
export function* signUpUserCalled({ payload: { url, data } }) {
	try {
		yield put(setSectionLoading(true));
		const userData = yield handleAuthApiCalls(url, data);
		// console.log({ userData }, "inside saga");
		yield put(signInUser(userData.user_data));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}

export function* onSignUpUserStart() {
	yield takeLatest(signUpUserStart.type, signUpUserCalled);
}
export function* signInUserCalled({ payload: { url, data, path } }) {
	try {
		yield put(setSectionLoading(true));
		const userData = yield handleAuthApiCalls(url, data);
		// console.log({ userData }, "inside saga");
		yield put(signInUser(userData));
		const changeRoute = Router.push(path);
		yield put(setPageRoute(changeRoute));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}

export function* onSignInUserStart() {
	yield takeLatest(signInUserStart.type, signInUserCalled);
}

export function* fetchUserProfile({ payload: { url, data } }) {
	try {
		yield put(setSectionLoading(true));
		const userData = yield handleApiCalls(url, data);
		// console.log({ userData }, "inside saga");
		yield put(setUserData(userData));
		yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}
export function* onFetchUserProfileStart() {
	yield takeLatest(fetchUserDataStart.type, fetchUserProfile);
}
export function* fetchSyncedCalendars({ payload: { url, data } }) {
	try {
		yield put(setSectionLoading(true));
		const userData = yield handleApiCalls(url, data);
		// console.log({ userData }, "inside saga");
		yield put(setSyncedCalendars(userData));
	yield put(setSectionLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}

export function* onFetchSyncedCalendarsStart() {
	yield takeLatest(fetchSyncedCalendarsStart.type, fetchSyncedCalendars);
}
export default function* userSagas() {
	yield all([
		call(onSignUpUserStart),
		call(onSignInUserStart),
		call(onFetchSyncedCalendarsStart),
		call(onFetchUserProfileStart)
	]);
}
