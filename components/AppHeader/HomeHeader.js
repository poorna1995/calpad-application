import { AppBar, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useRouter } from "next/router";
import React from "react";

const HomeHeader = () => {
	const router = useRouter();
	return (
		<AppBar
			elevation={0}
			color="default"
			sx={{
				// bgcolor: appHeaderBg || "rgba(21, 50, 48, 1)",
				// "transparent",
				// color: "white",
				// borderBottom: "1px solid #DADEE6",
				paddingTop: "8px",
				background: "white",
			}}
		>
			<Toolbar>
				<Container
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<div>
						<AppImage
							src="/calpad-logo.svg"
							height="40"
							width="160"
						/>
					</div>
					<div>
						<OutlinedButton
							sx={{ marginRight: "16px" }}
							onClick={() => router.push("/login")}
						>
							Log in
						</OutlinedButton>
						<PrimaryButton onClick={() => router.push("/sign-up")}>
							Sign up for free
						</PrimaryButton>
					</div>
				</Container>
			</Toolbar>
		</AppBar>
	);
};

export default HomeHeader;
