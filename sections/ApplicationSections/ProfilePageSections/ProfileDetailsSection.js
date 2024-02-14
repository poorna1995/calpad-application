import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardDescription from "components/Common/Typography/BodyText/CardDescription";
import CardTitle from "components/Common/Typography/HeadingText/CardTitle";
import TextInput from "components/Common/Inputs/TextInput";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, CALENDAR } from "constants/API_URLS";
import {
	fetchSyncedCalendarsStart,
	fetchUserDataStart,
	signInUser,
} from "redux/user/userSlice";
import GoogleMeetComponent from "components/GoogleMeetComponent";
import ImagesUpload from "components/Common/ImageUpload";
import { handleApiCalls } from "redux/slots/slots.helpers";
import appFetch from "utils/appFetch";
import { useSnackbar } from "notistack";
import isValidImageSrc from "utils/isValidImageSrc";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import { setSectionLoading } from "redux/views/viewsSlice";
import AppLink from "components/Common/AppLink";
import useLocalStorage from "customHooks/useLocalStorage";
import CopyToClipboard from "react-copy-to-clipboard";
import SocialMediaLinksInput from "components/Common/Inputs/TextInput/SocialMediaLinksInput";
import { SiFacebook, SiLinkedin, SiTwitter } from "react-icons/si";
import { MdAdd } from "react-icons/md";
import FacebookIcon from "svg-icons/SocialIcons/FacebookIcon";
import TwitterIcon from "svg-icons/SocialIcons/TwitterIcon";
import LinkedInIcon from "svg-icons/SocialIcons/LinkedInIcon";
import DribbleIcon from "svg-icons/SocialIcons/DribbleIcon";
import InstagramIcon from "svg-icons/SocialIcons/InstagramIcon";
import MediumIcon from "svg-icons/SocialIcons/MediumIcon";
import URLS from "constants/Social_URLS";
import validator from "validator";

const mapState = ({ user, views }) => ({
	currentUser: user.currentUser,
	profile: user.userProfileData,
	isLoading: views.sectionLoading,
	// syncedCalendars: user.syncedCalendars,
});

const socialNetworksList = [
	{
		icon: FacebookIcon,
		title: "facebook",
	},
	{ icon: TwitterIcon, title: "twitter" },
	{
		icon: LinkedInIcon,
		title: "linkedin",
	},
	{ icon: DribbleIcon, title: "dribble" },
	{
		icon: InstagramIcon,
		title: "instagram",
	},
	{ icon: MediumIcon, title: "medium" },
];

const ProfileDetailsSection = (props) => {
	const { currentUser, isLoading, profile } = useSelector(mapState);
	// const window = props.window;
	// const [profile, setProfile] = useLocalStorage("user_data");

	const socialLinksFromBackend =
		(Array.isArray(profile.social_media_links) &&
			profile.social_media_links) ||
		[];
	const listToShow = socialNetworksList.filter(
		({ title }) =>
			!socialLinksFromBackend.some(
				({ media_type }) => media_type === title,
			),
	);

	const fullName = profile?.fullname;
	const description = profile?.description;
	const USER_ID = profile?.user_id;
	const username = profile?.username;
	const [socialUserName, setSocialUserName] = useState("");
	const [mediaType, setMediaType] = useState(listToShow[0]?.title || "");
	useEffect(() => {
		setMediaType(listToShow[0]?.title || "");
	}, [listToShow]);
	const { enqueueSnackbar } = useSnackbar();
	const [myFullName, setMyFullName] = useState(fullName);
	const [myDescription, setMyDescription] = useState(description);
	const [userName, setUserName] = useState(username);
	const [images, setImages] = useState([]);

	const [helper, setHelper] = useState({});
	const dispatch = useDispatch();
	useEffect(() => {
		setMyFullName(fullName);
		setMyDescription(description);
		setUserName(username || "");
	}, []);

	const handleImageSelection = (e) => {
		setImages(e);
	};

	const socialUrl = getSocialURL(mediaType, socialUserName);
	function getSocialURL(mediaType, userName) {
		let baseURL = URLS[mediaType];

		let url = `${baseURL}/${userName}`;
		return url;
	}
	const getUserName = (mediaType, url) => {
		let baseURL = URLS[mediaType];
		let username = url.split(`${baseURL}/`)[1];
		return username;
	};

	let socialMediaLinksList =
		socialUserName === "" && !socialUserName.includes(" ")
			? [...profile.social_media_links]
			: [
					{ media_type: mediaType, url: socialUrl },
					...profile.social_media_links,
			  ];
	const handleUpdateUserProfile = (e, imageUrl = "") => {
		let data = {
			fullname: myFullName,
			user_id: USER_ID,
			image_url: imageUrl,
			username: userName,
			description: myDescription.slice(0, 200),
			social_media_links: socialMediaLinksList,
		};
		handleApiCalls(AUTH.UPDATE_PROFILE, data)
			.then((json) => {
				dispatch(
					fetchUserDataStart({
						url: AUTH.FETCH_PROFILE,
						data: { user_id: USER_ID },
					}),
				);
				setSocialUserName("");
				enqueueSnackbar("Successfully updated profile!", {
					variant: "success",
				});
			})
			.catch((error) => {
				enqueueSnackbar(error.message || "Error in updating profile", {
					variant: "error",
				});
			});
	};

	const handleProfilePictureUpload = (e, file) => {
		const formData = new FormData();
		// setDisabled(true);

		formData.append("file", file);
		formData.append("file_path", "calpad-files/images");
		const url = AUTH.FILE_UPLOAD;
		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(setSectionLoading(false));

				if (json.status === "success") {
					enqueueSnackbar(json?.message, {
						variant: "success",
					});
					console.log({ json });
					let imgUrl = `https://${json.file_url}`;
					handleUpdateUserProfile(e, imgUrl);
					dispatch(signInUser({ ...currentUser, image_url: imgUrl }));
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
				dispatch(setSectionLoading(false));

				enqueueSnackbar("Cannot complete action", {
					variant: "error",
				});
			});
	};
	const onSubmit = (e) => {
		// setLoading(true);
		dispatch(setSectionLoading(true));
		if (images.length > 0 && images[0].file) {
			handleProfilePictureUpload(e, images[0]?.file);
		} else {
			handleUpdateUserProfile(e);
		}
	};

	const profileImageURL = isValidImageSrc(currentUser.image_url);
	// console.log({ profileImageURL });
	const currentpath = process.env.NEXT_PUBLIC_WEBISTE_URL;
	//  `https://calpad.vercel.app`;
	// `https://calpad.io`;
	const publicURL = `${currentpath}/${username}`;
	const handleCopyButtonClicked = () => {
		enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
	};

	const handleCheckUserNameExists = (e) => {
		let url = AUTH.CHECK_USER_EXIST;
		let data = { username: e.target.value };
		if (userName.includes(" ") || userName === "") return;
		appFetch(url, data)
			.then((json) => {
				if (json.status === "success") {
					setHelper({
						message: "Username is available",
						status: json.status,
					});
				}
				if (json.status === "failure") {
					setHelper({
						message: "Username is not available",
						status: json.status,
					});
				}
			})
			.catch((error) => console.error(error));
	};
	const handleFocusAndBlur = () => {
		if (userName === "" || userName === undefined) setHelper({});
		if (userName.includes(" "))
			setHelper({
				message: "Don't add space in username",
				status: "failure",
			});
		if (helper.status === "failure") return;
		if (helper.status === "success") return;
	};

	/**
	 * Social media links logic
	 * if one media is added we will show only the other medias to be added
	 *
	 *
	 *
	 */

	const handleAddAnotherLink = () => {
		let data = {
			social_media_links: socialMediaLinksList,
			user_id: USER_ID,
		};

		handleApiCalls(AUTH.UPDATE_PROFILE, data)
			.then((json) => {
				dispatch(
					fetchUserDataStart({
						url: AUTH.FETCH_PROFILE,
						data: { user_id: USER_ID },
					}),
				);
				setSocialUserName("");
				enqueueSnackbar("Successfully updated profile!", {
					variant: "success",
				});
			})
			.catch((error) => {
				enqueueSnackbar(error.message || "Error in updating profile", {
					variant: "error",
				});
			});
	};

	const [socialMediaInputs, setSocialMediaInputs] = useState([""]);
	console.log({ listToShow, socialNetworksList, socialLinksFromBackend });

	console.log({ socialMediaLinksList });
	return (
		<Box>
			{isLoading && <SectionLoader />}
			<Grid container>
				<Grid item md={6}>
					{/* Profile Picture Section */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							marginTop: "16px",
						}}
					>
						<ImagesUpload
							images={images}
							onChange={handleImageSelection}
							image_url={profileImageURL}
						/>
						{/* <AppImage src={placeholder} width="100" height="100" /> */}
						<Box sx={{ paddingLeft: "32px" }}>
							<CardTitle
								sx={{
									color: (theme) =>
										theme.palette.primary.main,
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
					{/* Name and Description Section */}
					<Stack sx={{ maxWidth: "400px", paddingBottom: "24px" }}>
						<TextInput
							label="Full Name"
							value={myFullName}
							onChange={(e) => setMyFullName(e.target.value)}
						/>
						<TextInput
							label="Username"
							value={userName}
							// onBlur={handleCheckUserNameExists}
							onKeyUp={handleCheckUserNameExists}
							onFocus={() => setHelper({})}
							onBlur={handleFocusAndBlur}
							helperText={helper.message}
							error={helper.status === "failure"}
							onChange={(e) => setUserName(e.target.value)}
						/>
						<TextInput
							multiline
							minRows={4}
							maxRows={4}
							label={
								`About you
							`
								// ,${myDescription.length} / 200
							}
							value={myDescription}
							helperText={"Maximum 200 characters allowed"}
							onChange={(e) => setMyDescription(e.target.value)}
						/>
					</Stack>
					{/* Social media Links */}
					{/* <Stack
						sx={{
							maxWidth: "400px",
							marginBottom: "16px",
							marginTop: "24px",
						}}
					>
						<CardTitle
							sx={{ fontSize: "12px", lineHeight: "15px" }}
						>
							Social media links
						</CardTitle>
						<CardDescription
							sx={{ fontSize: "10px", lineHeight: "12px" }}
						>
							Display your social media links on your profile
						</CardDescription>

						{socialLinksFromBackend.map((item, index) => (
							<SocialMediaLinksInput
								mediaTypeDisabled
								disabled
								key={index}
								username={getUserName(
									item.media_type,
									item.url,
								)}
								setUsername={setSocialUserName}
								mediaType={item.media_type}
								// setMediaType={setMediaType}
								options={socialNetworksList}
							/>
						))}

						{listToShow.length > 0 && (
							<SocialMediaLinksInput
								key={item}
								username={socialUserName}
								setUsername={setSocialUserName}
								mediaType={mediaType}
								setMediaType={setMediaType}
								options={listToShow}
							/>
						)}

						<Box>
							{listToShow.length !== 0 && (
								<Button
									sx={{
										textTransform: "capitalize",
										marginTop: "16px",
										width: "auto",
									}}
									startIcon={<MdAdd />}
									onClick={handleAddAnotherLink}
								>
									Add Social Media links
								</Button>
							)}
						</Box>
					</Stack> */}
					<PrimaryButton
						onClick={onSubmit}
						disabled={
							helper.status === "failure" ||
							userName.includes(" ") ||
							myDescription.length > 200
						}
					>
						Save Changes
					</PrimaryButton>
					<Button
						sx={{ textTransform: "capitalize", marginLeft: "16px" }}
					>
						Discard{" "}
					</Button>
				</Grid>
				<Grid
					item
					md={6}
					sx={{
						borderLeft: "1px solid rgba(0,0,0,0.1)",
						paddingLeft: "32px",
					}}
				>
					{username && (
						<Box
							sx={{
								fontWeight: 600,
								paddingTop: "16px",
								maxWidth: "400px",
							}}
						>
							<p>Profile URL : </p>
							<Box
								sx={{
									padding: "4px",
									background: "#F6F6F6",
									borderRadius: "10px",
									fontSize: "14px",
									// cursor: "pointer",
									fontWeight: 600,
									lineHeight: "30px",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									border: "1px solid #E8E8E8",
									paddingLeft: "16px",
								}}
							>
								<span>
									<AppLink
										href={`/${username}`}
										target="_blank"
										sx={{
											"&:hover": {
												textDecoration: "underline",
											},
										}}
									>
										{publicURL}
									</AppLink>
								</span>{" "}
								<CopyToClipboard text={publicURL}>
									<PrimaryButton
										sx={{ borderRadius: "10px" }}
										onClick={handleCopyButtonClicked}
									>
										Copy
									</PrimaryButton>
								</CopyToClipboard>
							</Box>
						</Box>
					)}

					<GoogleMeetComponent
						containerStyles={{
							paddingTop: "16px",
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ProfileDetailsSection;
