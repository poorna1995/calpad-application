import PropTypes from "prop-types";
import React from "react";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import {
	Avatar,
	Box,
	Container,
	Grid,
	IconButton,
	Menu,
	Tooltip,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { FaArrowLeft, FaChevronLeft } from "react-icons/fa";
import SelectTimezone from "components/Common/Inputs/SelectInput/SelectTimezone";
// import { ReactComponent as Globe } from "assets/svg/admin-icons/globe.svg";

// import { ReactComponent as ArrowDown } from "assets/svg/admin-icons/arrow-down.svg";
// import { ReactComponent as ArrowLeft } from "assets/svg/admin-icons/arrow-left.svg";
// import SelectTimezone from "components/Common/Inputs/SelectInput/SelectTimezone";
// import DropDownMenuItemButton from "components/AppHeader/DropDownMenu/DropDownMenuItemButton";
// import DropDownMenuItemLink from "components/AppHeader/DropDownMenu/DropDownMenuItemLink";
// import UserProfileMenuItem from "components/AppHeader/DropDownMenu/ProfileMenuItem";

export let navigate = {
	PREVIOUS: "PREV",
	NEXT: "NEXT",
	TODAY: "TODAY",
	DATE: "DATE",
};
class SPCustomToolbar extends React.Component {
	render() {
		let {
			localizer: { messages },
			label,
		} = this.props;

		const currentDate = new Date();
		let date = navigate.DATE;
		let disablePrev = date < currentDate;

		return (
			<Box
				style={{
					width: "100%",
					paddingBottom: "12px",
					// paddingTop: "12px",
					// borderTop: "1px solid rgba(203, 198, 198, 1)",
				}}
			>
				<Grid container>
					<Grid
						item
						xs={12}
						md={9}
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<OutlinedButton
							sx={{
								background: "#FFFFFF",
								border: "1px solid #E8E8E8",
								borderRadius: "10px",
								fontWeight: 600,
								fontSize: "16px",
								lineHeight: "20px",
								letterSpacing: "-1px",
								color: "#363636",
							}}
							title={messages.today}
							type="button"
							onClick={this.navigate.bind(null, navigate.TODAY)}
						>
							{messages.today}
						</OutlinedButton>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								// marginLeft: "24px",
							}}
						>
							<IconButton
								sx={{ color: "black", marginLeft: "16px" }}
								type="button"
								disabled={disablePrev}
								onClick={this.navigate.bind(
									null,
									navigate.PREVIOUS,
								)}
							>
								<FaChevronLeft height="18px" width="18px" />
							</IconButton>
							<IconButton
								sx={{
									color: "black",
									transform: "rotate(180deg)",
								}}
								type="button"
								onClick={this.navigate.bind(
									null,
									navigate.NEXT,
								)}
							>
								<FaChevronLeft
									transform="rotateX(180deg)"
									height="18px"
									width="18px"
								/>
							</IconButton>
							<span
								style={{
									//
									paddingRight: "24px",
									fontWeight: "600",
									fontSize: "16px",
									marginLeft: "24px",
								}}
							>
								{label}
							</span>
						</div>
					</Grid>
					{/* <Grid item xs={12} md={3}>
          <div>{this.viewNamesGroup(messages)}</div>
        </Grid> */}
					<Grid item xs={12} md={3}>
						<SelectTimezone />
					</Grid>
				</Grid>
			</Box>
		);
	}

	navigate = (action) => {
		this.props.onNavigate(action);
	};

	view = (view) => {
		this.props.onView(view);
	};

	viewNamesGroup(messages) {
		let viewNames = this.props.views;
		const view = this.props.view;

		if (viewNames.length > 1) {
			return viewNames.map((name) => (
				<>
					{view === name ? (
						<PrimaryButton
							type="button"
							key={name}
							title={messages[name]}
							style={{
								marginRight: "-8px",
								width: "100px",
								fontWeight: "bold",
								borderRadius: "5px",
								zIndex: "3",
								fontSize: "18px",
							}}
							//   className={clsx({ "rbc-active": view === name })}
							onClick={this.view.bind(null, name)}
						>
							{messages[name]}
						</PrimaryButton>
					) : (
						<OutlinedButton
							type="button"
							key={name}
							title={messages[name]}
							style={{
								marginRight: "-8px",
								width: "100px",
								background: "#F3F3F3",
								fontWeight: "bold",
								color: "black",
								border: "none",
								borderRadius: "5px",
								zIndex: "2",
								fontSize: "18px",
							}}
							//   className={clsx({ "rbc-active": view === name })}
							onClick={this.view.bind(null, name)}
						>
							{messages[name]}
						</OutlinedButton>
					)}
				</>
			));
		}
	}
}

SPCustomToolbar.propTypes = {
	view: PropTypes.string.isRequired,
	views: PropTypes.arrayOf(PropTypes.string).isRequired,
	label: PropTypes.node.isRequired,
	localizer: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
	onView: PropTypes.func.isRequired,
};

export default SPCustomToolbar;

// SPCustomToolbar.propTypes = {
//   view: PropTypes.string.isRequired,
//   views: PropTypes.arrayOf(PropTypes.string).isRequired,
//   label: PropTypes.node.isRequired,
//   localizer: PropTypes.object,
//   onNavigate: PropTypes.func.isRequired,
//   onView: PropTypes.func.isRequired,
// };
