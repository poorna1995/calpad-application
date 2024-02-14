import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import placeholderImage from "public/assets/app/placeholder/user_image.png";

import { styled } from "@mui/material";
import AppImage from "../AppImage";

const StyledProfilePicPreview = styled("div")(({ theme }) => ({
	...theme,
	borderRadius: "500px",
	width: "100px",
	height: "100px",
	objectFit: "cover",
	zIndex: 2,
	// cursor: "pointer",
	overflow: "hidden",
}));

const StyledProfilePicContainer = styled("div")(({ theme }) => ({
	...theme,
	position: "relative",
	borderRadius: "500px",
	width: "100px",
	height: "100px",
	objectFit: "cover",
	zIndex: 2,
	// cursor: "pointer",
	overflow: "hidden",
}));
const StyledProfileUploadInput = styled("div")(({ theme }) => ({
	...theme,
	position: "absolute",
	borderRadius: "500px",
	overflow: "hidden",
	top: "0px",
	zIndex: 3,
	opacity: "0",
	// cursor: "pointer",
	height: "100%",
	"&:hover": {
		// display: "flex",
		opacity: 0.4,
	},
}));

const ImagesUpload = ({
	images,
	onChange,
	disabled,
	setDisabled,
	image_url,
}) => {
	// const classes = useStyles();
	const [timestamp, setTimestamp] = useState(Date.now());

	return (
		<div>
			<ImageUploading
				maxFileSize={5048576}
				value={images}
				onChange={onChange}
				dataURLKey="data_url"
			>
				{({
					imageList,
					onImageUpload,
					onImageUpdate,
					dragProps,
					errors,
				}) => (
					// write your building UI
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div>
							{/* If image_url exists */}
							{imageList[0] === undefined ? (
								<div>
									{image_url ? (
										<StyledProfilePicContainer
										// className={classes.profilePicContainer}
										>
											<StyledProfilePicPreview
											//  className={classes.profilePicPreview}
											>
												<AppImage
													key={timestamp}
													style={{
														cursor: "pointer",
													}}
													// className={classes.profilePicPreview}
													src={`${image_url}`}
													alt=""
													width="100"
													height="100"
												/>
											</StyledProfilePicPreview>
											<StyledProfileUploadInput
											// className={classes.profileUploadInput}
											>
												<div
													onClick={onImageUpload}
													{...dragProps}
												>
													<AppImage
														style={{
															cursor: "pointer",
														}}
														// className={classes.profilePicPreview}
														src={placeholderImage}
														alt={"profile img"}
														width="100"
														height="100"
														// className={classes.profilePicPreview}
													/>
												</div>
											</StyledProfileUploadInput>
											{/* here write logic when there is no image selected */}
										</StyledProfilePicContainer>
									) : (
										<StyledProfilePicContainer
										// className={
										// classes.profilePicContainer
										// }
										>
											<StyledProfilePicPreview
											// className={
											// classes.profilePicPreview
											// }
											></StyledProfilePicPreview>

											{/* {/* if image_url does not exists  */}
											<StyledProfileUploadInput
												// className={
												// 	classes.profileUploadInput
												// }
												style={{ opacity: 1 }}
											>
												<div
													onClick={() =>
														onImageUpload()
													}
													{...dragProps}
													htmlFor="profile-pic-input"
												>
													<AppImage
														style={{
															cursor: "pointer",
														}}
														src={placeholderImage}
														alt={"profile img"}
														width="100"
														height="100"
														// className={
														// 	classes.profilePicPreview
														// }
													/>
												</div>
											</StyledProfileUploadInput>
										</StyledProfilePicContainer>
									)}
								</div>
							) : (
								<div>
									{/* when image is selected */}
									{
										<StyledProfilePicContainer
										// className={
										// 	classes.profilePicContainer
										// }
										>
											<StyledProfilePicPreview
											// className={
											// 	classes.profilePicPreview
											// }
											>
												<AppImage
													style={{
														cursor: "pointer",
													}}
													// className={
													// 	classes.profilePicPreview
													// }
													src={imageList[0]?.data_url}
													alt=""
													width="100"
													height="100"
												/>
											</StyledProfilePicPreview>
											<StyledProfileUploadInput
											// className={
											// 	classes.profileUploadInput
											// }
											// style={{ opacit}}
											>
												<div
													onClick={() =>
														onImageUpdate()
													}
													{...dragProps}
													htmlFor="profile-pic-input"
												>
													<AppImage
														style={{
															cursor: "pointer",
														}}
														src={placeholderImage}
														alt={"profile img"}
														width="100"
														height="100"

														// className={
														// 	classes.profilePicPreview
														// }
													/>
												</div>
											</StyledProfileUploadInput>
										</StyledProfilePicContainer>
									}
								</div>
							)}
						</div>

						{errors && (
							<div style={{ marginTop: "32px", color: "red" }}>
								{errors.maxNumber && (
									<span>
										Number of selected images exceed
										maxNumber
									</span>
								)}
								{errors.acceptType && (
									<span>
										Your selected file type is not allow
									</span>
								)}
								{errors.maxFileSize && (
									<span>
										Please select an image less than 4 MB
									</span>
								)}
								{errors.resolution && (
									<span>
										Selected file is not match your desired
										resolution
									</span>
								)}
							</div>
						)}
					</div>
				)}
			</ImageUploading>
			{/* <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} /> */}
		</div>
	);
};

export default ImagesUpload;
