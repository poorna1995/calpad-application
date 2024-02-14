const API_URLS = {
	AUTH: {
		REGISTER: `https://auth-calpad.hivepath.io/api/registration`,
		LOGIN: `https://auth-calpad.hivepath.io/api/login`,
		LOGOUT: `https://auth-calpad.hivepath.io/api/logout`,
		VERIFY_TOKEN: `https://auth-calpad.hivepath.io/api/verifyLoginToken`,
		CHECK_USER_EXIST: `https://auth-calpad.hivepath.io/api/checkUserExist`,
		FORGOT_PASSWORD: `https://auth-calpad.hivepath.io/api/forgotPassword`,
		RESET_PASSWORD: `https://auth-calpad.hivepath.io/api/resetPassword`,
		FETCH_PROFILE: `https://auth-calpad.hivepath.io/api/fetchProfile`,
		UPDATE_PROFILE: `https://auth-calpad.hivepath.io/api/updateProfile`,
		FILE_UPLOAD: `https://auth-calpad.hivepath.io/api/fileUpload`,
	},

	CALENDAR: {
		SYNC_GOOGLE: `https://schedule-calpad.hivepath.io/api/syncGoogle`,
		RESYNC_GOOGLE: `https://schedule-calpad.hivepath.io/api/resyncGoogle`,
		FETCH_SYNCED_CALENDAR: `https://schedule-calpad.hivepath.io/api/fetchSyncedCalendar`,
		DESYNC_GOOGLE: `https://schedule-calpad.hivepath.io/api/desyncGoogle`,
		FETCH_CALENDAR_VIEW: `https://schedule-calpad.hivepath.io/api/fetchCalendarView`,
		SLOT_PLAN: `https://schedule-calpad.hivepath.io/api/slotPlan`,
		DELETE_SLOT_PLAN: `https://schedule-calpad.hivepath.io/api/deleteSlotPlan`,
	},
	SCHEDULE_BOOKING: {
		FETCH_SLOTS: `https://schedule-calpad.hivepath.io/api/fetchSlots`,
		SCHEDULE_BOOKING: `https://schedule-calpad.hivepath.io/api/scheduleBooking`,
		FETCH_SCHEULE_BOOKING: `https://schedule-calpad.hivepath.io/api/fetchScheduleBooking`,
		AGGREGATE_SESSION: `https://schedule-calpad.hivepath.io/api/aggregateSession`,
		APPROVE_BOOKING: `https://schedule-calpad.hivepath.io/api/approveBooking`,
	},
};

export const { AUTH, CALENDAR, SCHEDULE_BOOKING } = API_URLS;
export default API_URLS;
