import { Grid } from "@mui/material";
import { AUTH, SCHEDULE_BOOKING } from "constants/API_URLS";
import BookingsLayout from "layouts/BookingsLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSchedules } from "redux/slots/slotsSlice";
import { fetchUserDataStart } from "redux/user/userSlice";
import AddBookingsDetailsSection from "sections/ApplicationSections/BookingPageSections/AddBookingsDetailsSection";
import UserProfileInfoSection from "sections/ApplicationSections/BookingPageSections/UserProfileInfoSection";
import appFetch from "utils/appFetch";

const mapState = ({ user, views }) => ({
	currentUser: user.currentUser,
	isLoading: views.sectionLoading,
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

	return {
		props: {
			apiResponse: resJson,
		},
	};
}

const BookingDetailsPage = (props) => {
	const { currentUser, isLoading } = useSelector(mapState);
	const router = useRouter();
	const userData = props.apiResponse.result;
	const [profileData, setProfileData] = useState(userData);
	const userId = router.query.username;
	const currentUserID = currentUser.user_id;
	const dispatch = useDispatch();
	// console.log({ router });
	useEffect(() => {
		setProfileData(userData);
	}, []);

	return (
		<>
			<Grid container>
				{profileData && (
					<Grid
						item
						md={4}
						xs={12}
						sx={{
							borderRight: "1px solid rgba(0,0,0,0.1)",
							padding: "8px",
							paddingBottom: "96px",
						}}
					>
						<UserProfileInfoSection userData={profileData} />
					</Grid>
				)}
				<Grid item md={8} xs={12} sx={{ padding: "8px" }}>
					<AddBookingsDetailsSection />
				</Grid>
			</Grid>
		</>
	);
};
BookingDetailsPage.getLayout = function getLayout(page) {
	return <BookingsLayout>{page}</BookingsLayout>;
};

export default BookingDetailsPage;
