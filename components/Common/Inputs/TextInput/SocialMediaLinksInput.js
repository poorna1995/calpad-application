import { Box, Input, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { SiFacebook, SiLinkedin, SiTwitter } from "react-icons/si";

const SocialMediaLinksInput = ({
	mediaType,
	setMediaType,
	username,
	setUsername,
	options,
	disabled,
	mediaTypeDisabled,
}) => {
	return (
		<Box
			sx={{
				marginTop: "16px",
				display: "flex",
				alignItems: "center",
				border: "1px solid rgba(0,0,0,0.1)",
				borderRadius: "10px",
				"&:hover": {
					border: (theme) =>
						`2px solid ${theme.palette.primary.main}`,
				},
			}}
		>
			<Select
				variant="filled"
				defaultValue={mediaType}
				value={mediaType}
				disabled={mediaTypeDisabled}
				onChange={(e) => setMediaType(e.target.value)}
				sx={{
					borderRight: "none",
					borderTopLeftRadius: "10px",
					borderBottomLeftRadius: "10px",
					"&::before": {
						borderBottom: "none",
					},
					"&::after": {
						borderBottom: "none",
					},
					"&:hover:not(.Mui-disabled):before": {
						borderBottom: "none",
					},
					"&.Mui-disabled:before": {
						borderBottom: "none",
					},
				}}
				inputProps={{
					sx: {
						paddingTop: "15px",
						background: "#E8E8E8",
						borderBottom: "none",
						// borderRadius: "10px",
						borderTopLeftRadius: "10px",
						borderBottomLeftRadius: "10px",
						// paddingBottom: "14px",
						// borderRadius: "10px",
					},
				}}
			>
				{Array.isArray(options) &&
					options.map((item, index) => {
						const { icon: Icon } = item;
						return (
							<MenuItem key={index} value={item.title} sx={{}}>
								<Icon height="20" width="20" />
							</MenuItem>
						);
					})}
			</Select>
			<TextField
				variant="filled"
				inputProps={{
					sx: {
						paddingTop: "15px",
						background: "white",
						borderTopRightRadius: "10px",
						borderBottomRightRadius: "10px",
						overflow: "hidden",
					},
				}}
				sx={{
					borderBottom: "none",

					"& .MuiFilledInput-root": {
						background: "white",
						borderTopRightRadius: "10px",
						borderBottomRightRadius: "10px",

						"&::before": {
							borderBottom: "none",
						},
						"&:hover:not(.Mui-disabled):before": {
							borderBottom: "none",
						},
						"&::after": {
							borderBottom: "none",
						},
						"&.Mui-disabled:before": {
							borderBottom: "none",
						},
					},
				}}
				fullWidth
				value={username}
				disabled={disabled}
				onChange={(e) => setUsername(e.target.value)}
			/>
		</Box>
	);
};

export default SocialMediaLinksInput;
