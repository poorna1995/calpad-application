import { Box, Card, Container } from "@mui/material";
import SectionLoader from "components/Common/Feedback/SectionLoader";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import GoogleMeetComponent from "components/GoogleMeetComponent";
import BaseLayout from "layouts/BaseLayout";
import { NextSeo } from "next-seo";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CalendarPageSections from "sections/ApplicationSections/CalendarPageSections";

const mapState = ({ user, views }) => ({
	user,
	isLoading: views.sectionLoading,
});

export async function getStaticProps(context) {
	return {
		props: {
			title: "Your Calendar",
		},
	};
}

const CalendarPage = (props) => {
	const { user, isLoading } = useSelector(mapState);
	const pageTitle = props.title;

	return (
		<>
			<NextSeo title={pageTitle} />
			{isLoading && <SectionLoader />}
			<Box sx={{ paddingBottom: "0px" }}>
				{" "}
				<Box
					sx={{
						boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
					}}
				>
					<Container
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<SectionTitleText sx={{ paddingBottom: "16px" }}>
							My Calendar
						</SectionTitleText>
						<GoogleMeetComponent
							stackStyles={{
								display: "flex",
								maxWidth: "1000px",
								alignItems: "center",
								justifyContent: "space-between",
							}}
							containerStyles={{
								paddingTop: "0px",
								display: "flex",
								maxWidth: "1000px",
								alignItems: "center",
								justifyContent: "space-between",
								paddingBottom: "16px",
							}}
						/>
					</Container>
				</Box>
				<Container sx={{ paddingTop: "32px" }}>
					<CalendarPageSections />
				</Container>
			</Box>
		</>
	);
};

CalendarPage.getLayout = function getLayout(page) {
	return <BaseLayout>{page}</BaseLayout>;
};

export default CalendarPage;
