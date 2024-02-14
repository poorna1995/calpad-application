//  Helper functions to call backend APIs
import appFetch from "utils/appFetch";

export const handleAuthApiCalls = (url, data) => {
	return new Promise((resolve, reject) => {
		appFetch(url, data)
			.then((response) => {
				if (response.status === "success") {
					const result = response.user_data;
					return resolve(result);
				}
				reject(response);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
};
