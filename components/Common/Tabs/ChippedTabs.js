import React from "react";

import { Chip, Tab, Tabs, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";

import PropTypes from "prop-types";
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
			// style={{ maxWidth: "100%" }}
		>
			{value === index && (
				<div
					style={
						{
							//  maxWidth: "100%"
						}
					}
				>
					{children}
				</div>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}
const StyledTabs = styled((props) => (
	<Tabs
		disableRipple
		{...props}
		TabIndicatorProps={{
			children: <span className="MuiTabs-indicatorSpan" />,
		}}
		// style={{
		//   background: "rgba(255,255,255,0.2)",
		// }}
	/>
))({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	"& .MuiTabs-indicatorSpan": {
		//   maxWidth: 40,
		//   width: '100%',
		//   backgroundColor: '#635ee7',
	},
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: "none",
		fontWeight: theme.typography.fontWeightRegular,
		//   fontSize: theme.typography.pxToRem(15),
		marginRight: "-12px",
		//   color: 'rgba(255, 255, 255, 0.7)',
		"&.Mui-selected": {
			// color: '#fff',
			// border:'1px solid red'
		},
		"&.Mui-focusVisible": {
			// backgroundColor: 'rgba(100, 95, 228, 0.32)',
		},
	}),
);

const ChippedTabs = ({ alldata = [], component: Component }) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// console.log({ value });

	const renderTab = (label, value, id) => {
		return (
			<Chip
				label={label}
				clickable
				// disableRipple
				sx={{
					background:
						value === id ? "#2E3749" : "rgba(46, 55, 73, 0.05)",
					color: value === id ? "white" : "#2E3749",
					fontWeight: value === id ? 800 : 400,
					fontSize: "18px",
					lineHeight: "28px",
					height: "52px",

					borderRadius: "50px",
					"&:hover": {
						background:
							value === id ? "#2E3749" : "rgba(46, 55, 73, 0.05)",
						color: value === id ? "white" : "#2E3749",
					},
					padding: "12px 23px",
					// marginRight: {
					//   xs: "-12px",
					// },

					// marginLeft: {
					//   xs: "-12px",
					// },
					// border:
					// 	value === id
					// 		? ""
					// 		: "1.5px solid rgba(72, 74, 158, 0.1)",

					// fontWeight: 700,
					// fontSize: {
					// 	xs: "12px",
					// 	md: "14px",
					// },
					// paddingLeft: {
					// 	xs: "8px",
					// 	md: "16px",
					// },
					// paddingRight: {
					// 	xs: "8px",
					// 	md: "16px",
					// },
					// height: {
					// 	xs: "32px",
					// 	md: "42px",
					// },
				}}
			/>
		);
	};
	const tabListData = alldata;
	// .map((item, index) => {
	// 	const { id, title, show, component } = item;

	// 	return {
	// 		id: index,
	// 		title,
	// 		show,
	// 		component,
	// 	};
	// })
	// .filter((item, index) => {
	// 	const { id, title, show, component } = item && item;
	// 	if (!show) return null;
	// 	return {
	// 		id: index,
	// 		title,
	// 		show,
	// 		component,
	// 	};
	// });

	return (
		<Box
			sx={{ marginTop: "32px" }}
			// style={{ maxWidth: "100%" }}
		>
			{tabListData.length > 0 && (
				<>
					<StyledTabs
						value={value}
						onChange={handleChange}
						aria-label="styled tabs"
						variant="scrollable"
						scrollButtons="auto"
						// disableRipple
						// style={{ background: "rgba(255,255,255,0.6)" }}
					>
						{tabListData.map((item, index) => {
							const { title, show } = item;
							// if (!show) return null;
							return (
								<StyledTab
									key={index}
									// disableRipple
									label={renderTab(title, value, index)}
									{...a11yProps(index)}
								/>
							);
						})}
					</StyledTabs>
					<Box
						sx={{
							marginTop: "32px",
						}}
						// style={{ maxWidth: "100%" }}
					>
						{tabListData.map((item, index) => {
							const { component } = item;
							// if (!show) return null;

							return (
								<TabPanel
									key={index}
									value={value}
									index={index}
								>
									{component}
								</TabPanel>
							);
						})}
					</Box>
				</>
			)}

			{tabListData.length === 0 && <>{Component}</>}
		</Box>
	);
};

export default ChippedTabs;
