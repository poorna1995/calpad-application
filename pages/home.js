import BaseLayout from "layouts/BaseLayout";
import { NextSeo } from "next-seo";
import HomePageSections from "sections/ApplicationSections/HomePageSections";

export default function Home() {
	return (
		<>
			<NextSeo title="Home - Sessions" />
			<HomePageSections />
		</>
	);
}
Home.getLayout = function getLayout(page) {
	return <BaseLayout>{page}</BaseLayout>;
};
