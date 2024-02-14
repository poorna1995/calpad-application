import { Box } from "@mui/system";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import CardDescription from "components/Common/Typography/BodyText/CardDescription";
import CardTitle from "components/Common/Typography/HeadingText/CardTitle";
import { AUTH, CALENDAR } from "constants/API_URLS";
import React, { useEffect } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { fetchSyncedCalendarsStart } from "redux/user/userSlice";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { IconButton, Stack } from "@mui/material";
import { MdDelete, MdDeleteOutline, MdRemove, MdSync } from "react-icons/md";
import { setSectionLoading } from "redux/views/viewsSlice";
import AppImage from "components/Common/AppImage";
import googleMeetIcon from "public/assets/app/profile/google-meet-icon.svg";
import { useState } from "react";

const mapState = ({ user, views }) => ({
	currentUser: user.currentUser,
	calendars: user.syncedCalendars,
	isLoading: views.sectionLoading,
});

const GoogleMeetComponent = ({ containerStyles, stackStyles }) => {
	const { currentUser, calendars, isLoading } = useSelector(mapState);

	const [syncedCalendars, setMySyncedCalendars] = useState(calendars);
	useEffect(() => {
		setMySyncedCalendars(calendars);
	}, [calendars]);
	const USER_ID = currentUser.user_id;
	const SCOPES =
		"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

	const dispatch = useDispatch();

	const login = useGoogleLogin({
		onSuccess: (res) => responseGoogle(res),
		scope: SCOPES,
		flow: "auth-code",
	});

	const responseGoogle = (res) => {
		// console.log(res);
		if (res.error) return null;

		handleGoogleMeetSync(res.code);
		// handleSyncCalendar(res.code);
	};
	const handleGoogleMeetSync = (code) => {
		const data = {
			user_id: USER_ID,
			code,
			origin: "google",
		};
		appFetch(CALENDAR.SYNC_GOOGLE, data).then((json) => {
			fetchSyncedCalendars();
			// console.log({ json });
		});
	};
	const fetchSyncedCalendars = () => {
		const data = {
			user_id: USER_ID,
		};
		dispatch(
			fetchSyncedCalendarsStart({
				url: CALENDAR.FETCH_SYNCED_CALENDAR,
				data,
			}),
		);
	};
	const handleResyncClick = (e, email) => {
		const data = {
			user_id: USER_ID,
			origin: "google",
			email: email,
		};
		dispatch(setSectionLoading(true));
		appFetch(CALENDAR.RESYNC_GOOGLE, data)
			.then((json) => {
				dispatch(setSectionLoading(false));
				if (json.status === "success") {
					fetchSyncedCalendars();
				}
			})
			.catch((err) => {
				dispatch(setSectionLoading(false));
			});
	};
	const handleDeleteClick = (e, email) => {
		const data = {
			user_id: USER_ID,
			origin: "google",
			email: email,
		};
		dispatch(setSectionLoading(true));

		appFetch(CALENDAR.DESYNC_GOOGLE, data)
			.then((json) => {
				dispatch(setSectionLoading(false));

				if (json.status === "success") {
					fetchSyncedCalendars();
				}
			})
			.catch((err) => {
				dispatch(setSectionLoading(false));
			});
	};
	useEffect(() => {
		fetchSyncedCalendars();
	}, []);

	if (Array.isArray(syncedCalendars)) {
		if (syncedCalendars.length === 0) {
			return (
				<Box
					sx={{
						paddingTop: "6px",
						maxWidth: "400px",
						...containerStyles,
					}}
				>
					<Box sx={{ ...stackStyles }}>
						<Stack sx={{ marginRight: "16px" }}>
							<CardTitle sx={{ fontSize: "16px" }}>
								Add Google Account
							</CardTitle>
							<CardDescription
								sx={{
									fontSize: "10px",
									lineHeight: "12px",
									color: "rgba(54, 54, 54, 0.7)",
									fontWeight: "600",
								}}
							>
								This will be used to create Meeting Links
							</CardDescription>
						</Stack>
						<Stack sx={{ marginTop: "8px" }}>
							<OutlinedButton
								onClick={login}
								sx={{
									// marginBottom: "24px",
									// marginTop: "16px",
									maxWidth: "400px",
									width: "100%",
								}}
							>
								Add Google Account
							</OutlinedButton>
						</Stack>
					</Box>
				</Box>
			);
		}
		if (syncedCalendars.length > 0) {
			return (
				<Box
					sx={{
						paddingTop: "6px",
						maxWidth: "400px",
						...containerStyles,
					}}
				>
					<Stack sx={{ marginRight: "16px" }}>
						<CardTitle sx={{ fontSize: "16px" }}>
							Synced Google Accounts
						</CardTitle>
						<CardDescription
							sx={{
								fontSize: "10px",
								lineHeight: "12px",
								color: "rgba(54, 54, 54, 0.7)",
								fontWeight: "600",
							}}
						>
							This will be used to create Meeting Links
						</CardDescription>
					</Stack>
					<Stack>
						{syncedCalendars.map((item, index) => {
							return (
								<Stack
									key={index}
									direction="row"
									alignItems={"center"}
									sx={{
										background: "#F6F6F6",
										borderRadius: "10px",
										padding: "8px",
										marginTop: "16px",
										justifyContent: "space-between",
										paddingLeft: "12px",
									}}
								>
									<AppImage
										src="/assets/app/profile/google-meet-icon.svg"
										height="30"
										width="30"
									/>
									<DescriptionText
										sx={{
											marginRight: "16px",
											marginLeft: "8px",
											fontWeight: 600,
											fontSize: " 16px",
											lineHeight: "30px",
										}}
									>
										{item.email}{" "}
									</DescriptionText>
									<div>
										<IconButton
											onClick={(e) =>
												handleResyncClick(e, item.email)
											}
											sx={{ color: "black" }}
										>
											<MdSync />
										</IconButton>
										<IconButton
											onClick={(e) =>
												handleDeleteClick(e, item.email)
											}
											sx={{
												color: "#F92828",
											}}
										>
											<MdDeleteOutline />
										</IconButton>
									</div>
								</Stack>
							);
						})}
					</Stack>
				</Box>
			);
		}
	}
	return <div></div>;
};

export default GoogleMeetComponent;
