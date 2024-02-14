import AuthLayout from "layouts/AuthLayout";
import React from "react";
import AddMoreDetailsSection from "sections/AuthPagesSections/SignUpSection/AddMoreDetailsSection";

const AddMoreUserDetalsPage = () => {
	return (
		<AuthLayout pageTitle={`Add more details`} autoHeight>
			<AddMoreDetailsSection />
		</AuthLayout>
	);
};

export default AddMoreUserDetalsPage;
