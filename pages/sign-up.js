import AppLink from "components/Common/AppLink";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import AuthLayout from "layouts/AuthLayout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SignUpSection from "sections/AuthPagesSections/SignUpSection";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export async function getStaticProps(context) {
	return {
		props: {
			title: "Create new account",
		}, // will be passed to the page component as props
	};
}
const SignUpPage = (props) => {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	// useEffect(() => {
	// 	if (currentUser && currentUser.email) router.push("/");
	// }, [currentUser, router]);

	const pageTitle = props.title;
	const pageDescription = "Create new Account on Calpad";
	return (
		<>
			<NextSeo title={pageTitle} description={pageDescription} />
			<SignUpSection />
		</>
	);
};

SignUpPage.getLayout = function getLayout(page) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default SignUpPage;
