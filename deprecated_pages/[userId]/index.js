import SectionLoader from "components/Common/Feedback/SectionLoader";
import { AUTH, SCHEDULE_BOOKING } from "constants/API_URLS";
import BookingsLayout from "layouts/BookingsLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleApiCalls } from "redux/slots/slots.helpers";
import { setSchedules } from "redux/slots/slotsSlice";
import { fetchUserDataStart, setUserData } from "redux/user/userSlice";
import BookingPageSections from "sections/ApplicationSections/BookingPageSections";
import ProfilePageSections from "sections/ApplicationSections/ProfilePageSections";
import appFetch from "utils/appFetch";

const mapState = ({ user, views }) => ({
	currentUser: user.currentUser,
	isLoading: views.sectionLoading,
});

export async function getServerSideProps(context) {
	let url = AUTH.FETCH_PROFILE;
	const userId = context.query.userId;
	let requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_id: userId }),
	};
	// console.log({ context });

	const res = await fetch(url, requestOptions);
	const resJson = await res.json();

	return {
		props: {
			apiResponse: resJson,
		},
	};
}

const ApplicationPage = (props) => {
	console.log({ props });
	const { currentUser, isLoading } = useSelector(mapState);
	const router = useRouter();
	const userId = router.query.userId;
	const currentUserID = currentUser.user_id;
	const dispatch = useDispatch();
	// console.log({ router });

	const userData = props.apiResponse.result;

	const pageTitle = userData.fullname;
	const pageDescription = userData.description;
	const pageImage = userData.image_url;
	const path = router.asPath;
	const fetchProfile = async () => {
		dispatch(
			fetchUserDataStart({
				url: AUTH.FETCH_PROFILE,
				data: { user_id: userId },
			}),
		);
		fetchSlots();
		// handleApiCalls(AUTH.FETCH_PROFILE, {
		// 	user_id: userId,
		// }).then((json) => {
		// 	dispatch(setUserData(json));
		// 	fetchSlots();
		// });
	};
	const fetchSlots = () => {
		appFetch(SCHEDULE_BOOKING.FETCH_SLOTS, { owner_id: userId }).then(
			(json) => {
				dispatch(setSchedules(json.result));
				// console.log(json);
			},
		);
	};

	useEffect(() => {
		if (userId) fetchProfile();
	}, [userId, router]);

	if (userData) {
		if (userId) {
			if (userId === currentUserID) {
				return (
					<>
						<Head>
							<title>
								{(pageTitle && `${pageTitle} - Calpad`) ||
									"Calpad"}
							</title>
							<meta
								name="description"
								content={pageDescription || "Calpad"}
							/>
							<meta name="theme-color" content="#000000" />

							<meta name="image" content={pageImage} />

							<meta
								name="og:image"
								property="og:image"
								content={pageImage}
							/>
							<meta
								name="og:title"
								property="og:title"
								content={`${pageTitle} - Calpad`}
							/>
							<meta
								name="og:image"
								property="og:image"
								content={pageImage}
							/>
							<meta
								name="og:site_name"
								property="og:site_name"
								content={`Calpad`}
							/>
							<meta
								name="og:image:width"
								property="og:image:width"
								content="1200"
							/>
							<meta
								name="og:image:height"
								property="og:image:height"
								content="600"
							/>

							<meta
								name="og:description"
								property="og:description"
								content={pageDescription}
							/>
							<meta
								name="og:url"
								property="og:url"
								content={`https://calpad.io/${path}`}
							/>

							<meta
								name="twitter:image"
								property="twitter:image"
								content={pageImage}
							/>
							<meta
								name="twitter:title"
								property="twitter:title"
								content={`${pageTitle} - Calpad`}
							/>
							<meta
								name="twitter:description"
								property="twitter:description"
								content={pageDescription}
							/>
							<meta
								name="twitter:url"
								property="twitter:url"
								content={`https://calpad.io/${path}`}
							/>

							<link rel="icon" href="/icon.svg" />
						</Head>
						<ProfilePageSections />
					</>
				);
			}
		}
		return (
			<>
				<Head>
					<title>
						{(pageTitle && `${pageTitle} - Calpad`) || "Calpad"}
					</title>
					<meta
						name="description"
						content={pageDescription || "Calpad"}
					/>
					<meta name="theme-color" content="#000000" />

					<meta name="image" content={pageImage} />

					<meta
						name="og:image"
						property="og:image"
						content={pageImage}
					/>
					<meta
						name="og:title"
						property="og:title"
						content={`${pageTitle} - Calpad`}
					/>
					<meta
						name="og:image"
						property="og:image"
						content={pageImage}
					/>
					<meta
						name="og:site_name"
						property="og:site_name"
						content={`Calpad`}
					/>
					<meta
						name="og:image:width"
						property="og:image:width"
						content="1200"
					/>
					<meta
						name="og:image:height"
						property="og:image:height"
						content="600"
					/>

					<meta
						name="og:description"
						property="og:description"
						content={pageDescription}
					/>
					<meta
						name="og:url"
						property="og:url"
						content={`https://calpad.io/${path}`}
					/>

					<meta
						name="twitter:image"
						property="twitter:image"
						content={pageImage}
					/>
					<meta
						name="twitter:title"
						property="twitter:title"
						content={`${pageTitle} - Calpad`}
					/>
					<meta
						name="twitter:description"
						property="twitter:description"
						content={pageDescription}
					/>
					<meta
						name="twitter:url"
						property="twitter:url"
						content={`https://calpad.io/${path}`}
					/>

					<link rel="icon" href="/icon.svg" />
				</Head>
				<BookingPageSections userData={userData} />
			</>
		);
	}
};

ApplicationPage.getLayout = function getLayout(page) {
	return <BookingsLayout>{page}</BookingsLayout>;
};

export default ApplicationPage;
