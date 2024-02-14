import React from "react";

// images
import webLinkImage from "public/assets/website/web-link.png";
import syncingImage from "public/assets/website/syncing.png";
import linkSocialPlatformsImage from "public/assets/website/link-social-platforms.png";
import { Box } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import AppImage from "components/Common/AppImage";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
const MoreFeaturesSection = () => {
	const data = [
		{
			image: webLinkImage,
			title: "Dedicated website Link",
			description:
				"Get a custom URL  with your Unique username and share it to your social media and contacts.",
		},
		{
			image: linkSocialPlatformsImage,
			title: "Link Social Platforms",
			description:
				"Link your social platforms for your audience to connect with you.",
		},
		{
			image: syncingImage,
			title: "No Syncing Hassle",
			description:
				"We sync all your meetings with you Google calendar so you don’t have to worry about missing any of your Meetings.",
		},
	];
	return (
		<Box sx={{ padding: "64px" }}>
			<SectionTitleText
				sx={{
					fontWeight: 700,
					fontSize: "40px",
					lineHeight: "60px",
					textAlign: "center",
					color: "#161523",
				}}
			>
				Some More Features...
			</SectionTitleText>
			{data.map((item, index) => {
				return (
					<Box
						key={index}
						sx={{
							maxWidth: "1000px",
							margin: "auto",
							paddingTop: "64px",
						}}
					>
						<BaseCard
							sx={{
								background: "#161523",
								textAlign: "center",
								paddingBottom: "48px",
							}}
						>
							<AppImage src={item.image} height="350" />

							<SectionTitleText
								sx={{
									color: "white",
									fontWeight: 700,
									fontSize: "32px",
									lineHeight: "30px",
									marginBottom: "32px",
									marginTop: "32px",
								}}
							>
								{item.title}
							</SectionTitleText>
							<DescriptionText
								sx={{
									color: "white",
									fontWeight: 500,
									fontSize: " 16px",
									lineHeight: "30px",
									maxWidth: "600px",
									margin: "auto",
								}}
							>
								{item.description}
							</DescriptionText>
						</BaseCard>
					</Box>
				);
			})}
		</Box>
	);
};

export default MoreFeaturesSection;
