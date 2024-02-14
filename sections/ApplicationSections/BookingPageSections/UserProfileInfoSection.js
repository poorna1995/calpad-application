import React from "react";
import profileImg from "public/assets/app/placeholder/user_image.png";
import AppImage from "components/Common/AppImage";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { Avatar, Box, Divider } from "@mui/material";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import ClockIcon from "svg-icons/AppIcons/ClockIcon";
import { MdCameraRoll } from "react-icons/md";
import { FaLinkedinIn, FaMedium, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
import isValidImageSrc from "utils/isValidImageSrc";
import useLocalStorage from "customHooks/useLocalStorage";
import { useEffect } from "react";
import { useState } from "react";

const mapState = ({ user }) => ({
	profileData: user.userProfileData,
});
const UserProfileInfoSection = ({ userData }) => {
	// const { profileData } = useSelector(mapState);
	// const [data, setData] = useLocalStorage("user_data");
	const profileData = userData;
	const imageUrl = isValidImageSrc(profileData?.image_url);
	// console.log({ imageUrl });
	const fullName = profileData?.fullname;
	const description = profileData?.description;
	const socialLinks = profileData?.social_media_links;

	const [imageSrc, setImageSrc] = useState(imageUrl);
	const [userDescription, setUserDescription] = useState(description);
	const [links, setLinks] = useState(socialLinks);
	useEffect(() => {
		setLinks(socialLinks);
		setImageSrc(imageUrl);
		setUserDescription(description);
	}, []);

	return (
		<div>
			<div>
				{imageSrc && (
					<Avatar
						sx={{
							borderRadius: "1000px",
							height: "150px",
							width: "150px",
						}}
					>
						<AppImage
							src={imageSrc}
							height="150"
							width="150"
							priority
						/>
					</Avatar>
				)}
			</div>
			<SectionTitleText>{fullName || `User full name`}</SectionTitleText>
			{userDescription && (
				<>
					<Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
					<DescriptionText
						sx={{ color: "#363636", opacity: 0.5, fontWeight: 500 }}
					>
						{description}
					</DescriptionText>
				</>
			)}
			<Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginTop: "16px",
				}}
			>
				<Avatar sx={avatarStyle}>
					<ClockIcon />
				</Avatar>
				<DescriptionText
					sx={{ opacity: 0.8, color: "#363636", fontWeight: 500 }}
				>
					30 min
				</DescriptionText>
			</div>
			<div
				style={{
					display: "flex",
					// alignItems: "center",
					marginTop: "16px",
				}}
			>
				<Avatar sx={avatarStyle}>
					<MdCameraRoll />
				</Avatar>
				<DescriptionText
					sx={{ opacity: 0.8, color: "#363636", fontWeight: 500 }}
				>
					Meeting details will be provided upon confirmation by{" "}
					{fullName}
				</DescriptionText>
			</div>
			{/* {Array.isArray(links) && links.length > 0 && (
				<>
					<Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
					<DescriptionText
						sx={{
							fontWeight: "500",
							opacity: 0.5,
							color: "#363636",
						}}
					>
						Connect with me
					</DescriptionText>
					<div style={{ display: "flex", marginTop: "16px" }}>
						<Avatar sx={{ ...avatarStyle, ...linkedinStyle }}>
							<FaLinkedinIn />
						</Avatar>
						<Avatar sx={{ ...avatarStyle, ...twitterStyle }}>
							<FaTwitter />
						</Avatar>
						<Avatar sx={{ ...avatarStyle, ...mediumStyle }}>
							<FaMedium />
						</Avatar>
					</div>
				</>
			)} */}
		</div>
	);
};

export default UserProfileInfoSection;

const avatarStyle = { marginRight: "16px", background: "#07617D" };
const twitterStyle = { background: "#1D9BF0" };
const mediumStyle = { background: "black" };
const linkedinStyle = { background: "#0A66C2" };
