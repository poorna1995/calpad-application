import { Box, Container, Typography } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import BaseLayout from "layouts/BaseLayout";
import React, { useState } from "react";
import { useEffect } from "react";
import CustomTabsWithBoxShadow from "../CommonSections/CustomTabsWithBoxShadow";
import AccountDetailsSection from "./AccountDetailsSection";
import ProfileDetailsSection from "./ProfileDetailsSection";

const ProfilePageSections = () => {
	const tabsData = [
		{
			label: "Profile Details",
			component: <ProfileDetailsSection />,
		},
		{
			label: "Account Details",
			component: <AccountDetailsSection />,
		},
	];
	const [list, setList] = useState([]);
	useEffect(() => {
		setList(tabsData);
	}, []);

	if (list)
		return (
			<>
				<Box>
					{" "}
					<CustomTabsWithBoxShadow
						sectionTitle={`Edit account`}
						data={list}
					/>
				</Box>
			</>
		);
};

export default ProfilePageSections;
