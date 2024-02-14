import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useState } from "react";
import placeholder from "public/assets/app/placeholder/user_image.png";
import TextInput from "components/Common/Inputs/TextInput";
import CardTitle from "components/Common/Typography/HeadingText/CardTitle";
import CardDescription from "components/Common/Typography/BodyText/CardDescription";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "redux/user/userSlice";

import { AUTH } from "constants/API_URLS";
import appFetch from "utils/appFetch";
import ImagesUpload from "components/Common/ImageUpload";
import { useSnackbar } from "notistack";
import GoogleMeetComponent from "components/GoogleMeetComponent";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const AddMoreDetailsSection = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { currentUser } = useSelector(mapState);
	const handleClick = () => {
		router.push("/");
		// dispatch(signInUser());
	};
	const imageUrl =
		currentUser &&
		currentUser.image_url &&
		`https://${currentUser.image_url}`;
	const [myDescription, setMyDescription] = useState("");

	const email = currentUser && currentUser.email;
	const { enqueueSnackbar } = useSnackbar();
	const [images, setImages] = useState([]);
	const handleImageSelected = (e) => {
		// setImages(e.target.files[0]);
		const image = e[0].file;
		console.log(image);
		setImages(e);
	};

	const SCOPES =
		"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

	const CLIENT_ID = "";
	//  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID;
	const responseGoogle = (res) => {
		console.log(res);
		if (res.error) return null;

		// handleSyncCalendar(res.code);
	};
	const handleUpdateProfile = (e, imageUrl) => {
		let url = AUTH.UPDATE_PROFILE;
		let data = {
			email: email,
			fullname: currentUser.fullname,
			description: myDescription,
			image_url: imageUrl,
			timezone: currentUser.timezone,
			user_id: currentUser.user_id,
		};
		appFetch(url, data)
			.then((json) => {
				if (json.status === "success") {
					appFetch(AUTH.FETCH_PROFILE, {
						user_id: currentUser.user_id,
					}).then((res) => {
						if (res.status === "success") {
							dispatch(
								signInUser({
									...currentUser,
									...res.result,
								}),
							);
						}
					});
					// dispatch(signInUser(json.user_data));
					enqueueSnackbar(json.message, { variant: "success" });
					router.push("/");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleProfilePictureUpload = (e, file) => {
		const formData = new FormData();
		// setDisabled(true);

		formData.append("file", file);
		formData.append("file_path", "calpad-files/images");
		const url = `https://auth-calpad.hivepath.io/api/fileUpload`;
		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.status === "success") {
					enqueueSnackbar(json?.message, {
						variant: "success",
					});
					console.log({ json });
					let imgUrl = `https://${json.file_url}`;
					handleUpdateProfile(e, imgUrl);
					// setLoading(false);
				} else {
					enqueueSnackbar(json?.message, {
						variant: "error",
					});
					// setLoading(false);
				}
				//
			})
			.catch((err) => {
				console.error(err);
				// setLoading(false);

				enqueueSnackbar(err.message, {
					variant: "error",
				});
			});
	};
	const onSubmit = (e) => {
		// setLoading(true);
		if (images.length > 0 && images[0].file) {
			handleProfilePictureUpload(e, images[0]?.file);
		} else {
			handleUpdateProfile(e);
		}
	};

	return (
		<Box>
			<SectionTitleText>
				You are nearly there!
				<br />
				Just add few details
			</SectionTitleText>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					marginTop: "32px",
				}}
			>
				{/* <AppImage src={placeholder} width="100" height="100" /> */}

				<ImagesUpload
					images={images}
					onChange={(e) => handleImageSelected(e)}
					image_url={imageUrl}
				/>

				<Box sx={{ paddingLeft: "32px" }}>
					<CardTitle
						sx={{
							color: (theme) => theme.palette.primary.main,
							fontSize: "16px",
						}}
					>
						Change picture
					</CardTitle>
					<CardDescription
						sx={{
							fontSize: "12px",
						}}
					>
						JPG, GIF or PNG. Max size of 5MB.
					</CardDescription>
				</Box>
			</Box>
			<Box sx={{ maxWidth: "400px" }}>
				<TextInput
					multiline
					maxRows={4}
					minRows={4}
					placeholder="Add some description"
					value={myDescription}
					onChange={(e) => setMyDescription(e.target.value)}
				/>
			</Box>
			<Divider sx={{ marginTop: "16px", maxWidth: "400px" }} />
			<Box sx={{ paddingTop: "16px", maxWidth: "400px" }}>
				<GoogleMeetComponent />
				{/* <CardTitle sx={{ fontSize: "16px" }}>
					Add Google Account
				</CardTitle>
				<CardDescription
					sx={{
						fontSize: "10px",
						lineHeight: "12px",
						color: "rgba(54, 54, 54, 0.7)",
					}}
				>
					This will be used to create Meeting Links
				</CardDescription>
				<GoogleLogin
					accessType="offline"
					responseType="code"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					clientId={CLIENT_ID}
					scope={SCOPES}
					prompt="consent"
					render={(renderProps) => (
						<OutlinedButton
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							sx={{
								marginBottom: "24px",
								marginTop: "16px",
								maxWidth: "400px",
								width: "100%",
							}}
						>
							Add Google Account
						</OutlinedButton>
					)}
				/> */}
			</Box>
			<Divider sx={{ marginBottom: "24px", maxWidth: "400px" }} />
			<Stack sx={{ paddingBottom: "64px", maxWidth: "400px" }}>
				<PrimaryButton sx={{ marginBottom: "16px" }} onClick={onSubmit}>
					Complete Setup
				</PrimaryButton>
				<Button
					sx={{
						textTransform: "capitalize",
						"&:hover": {
							background: "none",
						},
					}}
					onClick={handleClick}
				>
					Skip
				</Button>
			</Stack>
		</Box>
	);
};

export default AddMoreDetailsSection;
