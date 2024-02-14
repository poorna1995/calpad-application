function isValidImageSrc(image_url = "") {
	if (image_url === "" || image_url === undefined) return "";
	if (image_url.startsWith("https://")) return image_url;
	return `https://${image_url}`;
}

export default isValidImageSrc;
