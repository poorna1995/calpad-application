import { AUTH, SCHEDULE_BOOKING } from "constants/API_URLS";
import BookingsLayout from "layouts/BookingsLayout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBookingData } from "redux/bookings/bookingsSlice";
import BookingSuccessSection from "sections/ApplicationSections/BookingPageSections/BookingSuccessSection";
import appFetch from "utils/appFetch";

export async function getServerSideProps(context) {
	let url = SCHEDULE_BOOKING.FETCH_SCHEULE_BOOKING;
	const bookingId = context.query.bookingId;
	let requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ booking_id: bookingId }),
	};
	// console.log({ context });

	const res = await fetch(url, requestOptions);
	const resJson = await res.json();
	const userId = context.query.username;
	let profileRequestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: userId }),
	};
	// console.log({ context });

	const profileRes = await fetch(AUTH.FETCH_PROFILE, profileRequestOptions);
	const profileResJson = await profileRes.json();

	return {
		props: {
			apiResponse: resJson,
			profileResJson,
		},
	};
}

const BookingSuccessPage = (props) => {
	const router = useRouter();

	const bookingId = router.query.bookingId;
	const dispatch = useDispatch();
	const bookingData = props.apiResponse.result;
	const profileData = props.profileResJson.result;
	// const handleFetchBookingStatus = () => {
	// 	appFetch(SCHEDULE_BOOKING.FETCH_SCHEULE_BOOKING, {
	// 		booking_id: bookingId,
	// 	}).then((json) => {
	// 		dispatch(setBookingData(json.result));
	// 		// console.log({ json });
	// 	});
	// };
	// useEffect(() => {
	// 	if (bookingId) {
	// 		handleFetchBookingStatus();
	// 	}
	// }, [bookingId]);

	return (
		<>
			<NextSeo title="Booking confirmed!" />
			<BookingSuccessSection
				bookingData={bookingData}
				profileData={profileData}
			/>
		</>
	);
};

BookingSuccessPage.getLayout = function getLayout(page) {
	return <BookingsLayout>{page}</BookingsLayout>;
};
export default BookingSuccessPage;
