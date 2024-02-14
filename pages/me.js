import { AUTH } from "constants/API_URLS";
import useLocalStorage from "customHooks/useLocalStorage";
import BaseLayout from "layouts/BaseLayout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataStart } from "redux/user/userSlice";
import ProfilePageSections from "sections/ApplicationSections/ProfilePageSections";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const ProfilePage = () => {
	const router = useRouter();
	const {currentUser}=useSelector(mapState)
	const dispatch = useDispatch();
	const fetchProfile = () => {
		dispatch(
			fetchUserDataStart({
				url: AUTH.FETCH_PROFILE,
				data: { user_id: currentUser.user_id },
			}),
		);
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<>
			<NextSeo title="My profile" />
			<ProfilePageSections />
		</>
	);
};

ProfilePage.getLayout = function getLayout(page) {
	return <BaseLayout>{page}</BaseLayout>;
};

export default ProfilePage;
