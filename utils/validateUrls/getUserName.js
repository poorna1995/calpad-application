import URLS from "constants/Social_URLS";

const getUserName = (mediaType, url) => {
    let baseURL = URLS[mediaType];
    let username = url.split(`${baseURL}/`)[1];
    return username;
};
export default getUserName