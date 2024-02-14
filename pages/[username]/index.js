import { AUTH, SCHEDULE_BOOKING } from "constants/API_URLS";
import APP_DATA from "constants/APP_DATA";
import BookingsLayout from "layouts/BookingsLayout";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSchedules } from "redux/slots/slotsSlice";
import { fetchUserDataStart } from "redux/user/userSlice";
import BookingPageSections from "sections/ApplicationSections/BookingPageSections";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
	profileData: user.userProfileData,
});
export async function getServerSideProps(context) {
	let url = AUTH.FETCH_PROFILE;
	const userId = context.query.username;
	let requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: userId }),
	};
	// console.log({ context });

	const res = await fetch(url, requestOptions);
	const resJson = await res.json();

	const slotReqOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ owner_id: resJson.result.user_id }),
	};
	const slotsRes = await fetch(SCHEDULE_BOOKING.FETCH_SLOTS, slotReqOptions);
	const slotsResJson = await slotsRes.json();

	// console.log(slotsResJson);
	return {
		props: {
			apiResponse: resJson,
			slotsResJson,
		},
	};
}

const BookingPage = (props) => {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	const USER_ID = currentUser.user_id;
	const apiRes = props.apiResponse.result;

	const slotRes = props.slotsResJson.result;

	const [userData, setUserData] = useState(apiRes);
	const [slotsData, setSlotsData] = useState(slotRes);

	useEffect(() => {
		setUserData(apiRes);
		setSlotsData(slotRes);
	}, []);
	const pageTitle = userData.fullname;
	const pageDescription = userData.description;
	const pageImage =
		userData.image_url ||
		`${APP_DATA.WEBSITE_URL}/assets/website/web-link.png`;
	const path = router.asPath;

	const title = pageTitle ? `Book a session with ${pageTitle} ` : "Calpad";
	const description = pageDescription
		? `${pageDescription}`
		: "Book a session on Calpad";
	const sitename = "Calpad";
	const website = APP_DATA.WEBSITE_URL;

	const userId = router.query.username;
	const dispatch = useDispatch();
	// const
	const fetchProfile = async () => {
		dispatch(
			fetchUserDataStart({
				url: AUTH.FETCH_PROFILE,
				data: { username: userId },
			}),
		);
		dispatch(setSchedules(slotRes));

		// fetchSlots();
	};
	// const fetchSlots = () => {
	// 	appFetch(SCHEDULE_BOOKING.FETCH_SLOTS, { owner_id: userId }).then(
	// 		(json) => {
	// 			dispatch(setSchedules(json.result));
	// 			// console.log(json);
	// 		},
	// 	);
	// };

	useEffect(() => {
		if (userId) fetchProfile();
	}, [userId]);

	return (
		<>
			<NextSeo
				title={title}
				description={pageDescription}
				openGraph={{
					title: title,
					description: description.slice(0, 200),
					siteName: sitename,
					url: website,
					images: [
						{
							url: pageImage,
							height: 400,
							width: 300,
							alt: "ProfileImage",
						},
					],
				}}
				twitter={{
					site: sitename,
				}}
			/>
			{userData && slotsData && (
				<BookingPageSections
					userData={userData}
					slotsData={slotsData}
				/>
			)}
		</>
	);
};

BookingPage.getLayout = function getLayout(page) {
	return <BookingsLayout>{page}</BookingsLayout>;
};
export default BookingPage;
