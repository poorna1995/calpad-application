import {
	AppBar,
	Avatar,
	Box,
	Button,
	Fade,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Popover,
	Popper,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import MenuItemLink from "components/Common/Menus/MenuItemLink";
// import linksData from "constant_data/navigation/linksData";
import React, { useState } from "react";
import { useEffect } from "react";
import {
	usePopupState,
	bindHover,
	bindPopper,
	bindTrigger,
	bindPopover,
} from "material-ui-popup-state/hooks";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "redux/user/userSlice";
import AppImage from "components/Common/AppImage";
import {
	MdLogout,
	MdNotifications,
	MdOutlineNotifications,
	MdPerson,
	MdPersonOutline,
} from "react-icons/md";
import appFetch from "utils/appFetch";
import { AUTH } from "constants/API_URLS";
import placeholder from "public/assets/app/placeholder/user_image.png";
import isValidImageSrc from "utils/isValidImageSrc";
import useLocalStorage from "customHooks/useLocalStorage";
import CalendarIcon from "svg-icons/AppIcons/CalendarIcon";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const AppHeader = ({ appHeaderBg, ...props }) => {
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const [user, setUser] = useLocalStorage("currentUser");
	// console.log({ popupState, isOpen: popupState.isOpen });
	const router = useRouter();
	const pathname = router.asPath;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const USER_ID = currentUser.user_id;
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// console.log
	const handleLogout = () => {
		const data = {
			user_id: currentUser.user_id,
		};
		appFetch(AUTH.LOGOUT, data).then((json) => {
			if (json.status === "success") {
				dispatch(signOutUser({}));
			}
		});
	};
	// console.log({ popperData });
	const links = [
		{
			title: "Home",
			url: "/home",
		},
		// {
		// 	title: "Calendar",
		// 	url: "/calendar",
		// },
	];
	const profileImageURL = isValidImageSrc(currentUser.image_url);
	return (
		<>
			<AppBar
				elevation={0}
				color="default"
				sx={{
					// bgcolor: appHeaderBg || "rgba(21, 50, 48, 1)",
					// "transparent",
					// color: "white",
					borderBottom: "1px solid #DADEE6",
					background: "white",
				}}
			>
				<Toolbar>
					<Container
						sx={{
							display: "flex",
							flex: 1,
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<AppImage
							src="/icon.svg"
							width="40"
							height="40"
							onClick={() => router.push("/home")}
							sx={{ cursor: "pointer" }}
						/>

						<div style={{ flex: 1 }} />
						{links.map((item, index) => {
							return (
								<AppLink
									key={index}
									href={item.url}
									sx={{
										marginRight: "24px",
										color:
											pathname === item.url
												? "#07617D"
												: "rgba(54, 54, 54, 0.6)",
										fontWeight:
											// pathname === item.url &&
											700,
										// padding: "8px",
										// "&:hover": {
										// 	background: "rgba(0,0,0,0.1)",
										// },
									}}
								>
									{item.title}
								</AppLink>
							);
						})}
						<IconButton
							sx={{
								marginRight: "16px",
								"& svg": {
									color: "black",
									// fill: "black",
								},
								"& path": {
									stroke: "black",
								},
							}}
							onClick={() => router.push("/calendar")}
						>
							<CalendarIcon />
						</IconButton>
						<Avatar
							sx={{ cursor: "pointer" }}
							onClick={(e) => handleClick(e)}
						>
							<AppImage
								src={profileImageURL || placeholder}
								width="40"
								height="40"
							/>
						</Avatar>
					</Container>
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					style: {
						boxShadow: "0px 0px 24px 4px rgba(72, 74, 158, 0.06)",
						borderRadius: "20px",
						marginTop: "20px",
					},
				}}
				transformOrigin={{
					horizontal: "right",
					vertical: "top",
				}}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom",
				}}
			>
				<MenuItem
					sx={{
						margin: "16px",
						fontWeight: 600,
						display: "flex",
					}}
					onClick={() => router.push(`/me`)}
				>
					<MdPersonOutline
						style={{ marginRight: "16px", fontSize: "24px" }}
					/>
					<span>Edit Profile</span>
				</MenuItem>
				<MenuItem
					sx={{
						margin: "16px",
						fontWeight: 600,
						color: (theme) => theme.palette.error.main,
						display: "flex",
					}}
					onClick={() => handleLogout()}
				>
					<MdLogout
						style={{ marginRight: "16px", fontSize: "24px" }}
					/>
					<span>Logout</span>
				</MenuItem>
			</Menu>
		</>
	);
};

export default AppHeader;
