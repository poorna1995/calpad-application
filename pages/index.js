import { Box } from "@mui/material";
import WebsiteLayout from "layouts/WebsiteLayout";
import FeaturesSection from "sections/WebsiteSections/FeaturesSection";
import FooterCardSection from "sections/WebsiteSections/FooterCardSection";
import HeroSection from "sections/WebsiteSections/HeroSection";
import MoreFeaturesSection from "sections/WebsiteSections/MoreFeaturesSection";
import ScheduleSection from "sections/WebsiteSections/ScheduleSection";

export default function Home() {
	return (
		<Box sx={{ maxWidth: "100%" }}>
			<HeroSection />
			<FeaturesSection />
			<ScheduleSection />
			<MoreFeaturesSection />
			<FooterCardSection />
		</Box>
	);
}
Home.getLayout = function getLayout(page) {
	return <WebsiteLayout>{page}</WebsiteLayout>;
};
