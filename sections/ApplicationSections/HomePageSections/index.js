import { Box, Container, Typography } from "@mui/material";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import CustomTabsWithBoxShadow from "sections/ApplicationSections/CommonSections/CustomTabsWithBoxShadow";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useEffect } from "react";
import MeetingCard from "./MeetingCard";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { SCHEDULE_BOOKING } from "constants/API_URLS";
import {
	fetchSessionsListStart,
	setSessionsList,
} from "redux/homePageData/homePageSlice";
import lodash from "lodash";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import noResultImage from "public/assets/app/placeholder/no-result.png";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import Router from "next/router";

const mapState = ({ homePageData, user, views }) => ({
	sessions: homePageData.sessions,
	currentUser: user.currentUser,
	isLoading: views.sectionLoading,
});

const HomePageSections = () => {
	const { sessions, currentUser, isLoading } = useSelector(mapState);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser.user_id) {
			fetchSessions();
		}
	}, [currentUser.user_id]);
	const fetchSessions = () => {
		dispatch(
			fetchSessionsListStart({
				url: SCHEDULE_BOOKING.AGGREGATE_SESSION,
				data: {
					user_id: currentUser.user_id,
					email: currentUser.email,
				},
			}),
		);

		// appFetch(SCHEDULE_BOOKING.AGGREGATE_SESSION, {
		// 	user_id: currentUser.user_id,
		// }).then((json) => {
		// 	dispatch(setSessionsList(json.result));
		// 	// console.log({ json });
		// });
	};
	const groupedByStatus = lodash.groupBy(sessions, "booking_status");
	// const
	console.log({ groupedByStatus });
	const pendingSessions = groupedByStatus["pending"];

	const upcomingSessions = groupedByStatus["approved"];
	const cancelledSessions = groupedByStatus["cancelled"];

	const tabsData = [
		{
			label: "Upcoming",
			component: (
				<Box>
					{Array.isArray(upcomingSessions) &&
					upcomingSessions.length > 0 ? (
						<>
							{upcomingSessions.map((item, index) => {
								return (
									<MeetingCard
										key={index}
										data={item}
										// meetingStatus="approved"
									></MeetingCard>
								);
							})}
						</>
					) : (
						<NoResultFound />
					)}
				</Box>
			),
		},
		{
			label: "Pending",
			component: (
				<Box>
					{Array.isArray(pendingSessions) &&
					pendingSessions.length > 0 ? (
						<>
							{pendingSessions.map((item, index) => {
								return (
									<MeetingCard
										key={index}
										data={item}
									></MeetingCard>
								);
							})}
						</>
					) : (
						<NoResultFound />
					)}
				</Box>
			),
		},
		{
			label: "Cancelled",
			component: (
				<Box>
					{Array.isArray(cancelledSessions) &&
					cancelledSessions.length > 0 ? (
						<>
							{cancelledSessions.map((item, index) => {
								return (
									<MeetingCard
										key={index}
										data={item}
										// meetingStatus="requested"
									></MeetingCard>
								);
							})}
						</>
					) : (
						<NoResultFound />
					)}
				</Box>
			),
		},
	];

	return (
		<Box>
			{isLoading && <SectionLoader />}
			<CustomTabsWithBoxShadow
				data={tabsData}
				sectionTitle={`Your meetings`}
			/>
		</Box>
	);
};

export default HomePageSections;

const NoResultFound = () => (
	<Box sx={{ display: "grid", placeItems: "center" }}>
		<AppImage src={noResultImage} height="300" />
		<SectionTitleText sx={{ marginTop: "32px" }}>
			No Result Found
		</SectionTitleText>
		<PrimaryButton
			sx={{
				marginTop: "16px",
				paddingRight: "40px",
				paddingLeft: "40px",
			}}
			onClick={() => Router.push("/calendar")}
		>
			Add dates
		</PrimaryButton>
	</Box>
);
