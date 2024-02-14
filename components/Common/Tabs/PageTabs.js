import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{}}>{children}</Box>}
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
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		TabIndicatorProps={{
			children: <span className="MuiTabs-indicatorSpan" />,
		}}
	/>
))({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	"& .MuiTabs-indicatorSpan": {
		// maxWidth: 40,
		width: "100%",
		backgroundColor: "#2E3749 !important",
	},
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		// textTransform: "none",
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		// color: "#2E3749",
		"&.Mui-selected": {
			color: "#2E3749",
			fontWeight: 700,
		},
		"&.Mui-focusVisible": {
			backgroundColor: "#2E3749",
		},
	}),
);

export default function PageTabs({ data }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ background: "#F5F9F6" }}>
				<StyledTabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					centered
				>
					{data.map((item, index) => (
						<StyledTab
							key={index}
							label={item.label}
							sx={{
								// textTransform: "initial",
								fontWeight: 400,
								fontSize: "16px",
								lineHeight: "20px",
								paddingTop: "24px",
								paddingBottom: "24px",
								letterSpacing: "0.3em",
							}}
							{...a11yProps(index)}
						/>
					))}
				</StyledTabs>
			</Box>
			{data.map((item, index) => (
				<TabPanel key={index} value={value} index={index}>
					{item.component}
				</TabPanel>
			))}
		</Box>
	);
}
