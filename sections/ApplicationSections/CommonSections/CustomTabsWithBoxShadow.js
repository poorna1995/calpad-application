import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Container, styled } from "@mui/material";
import SectionTitleText from "../../../components/Common/Typography/HeadingText/SectionTitleText";

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
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
		// centered
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
		backgroundColor: "#07617D",
	},
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: "none",
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		// color: "rgba(255, 255, 255, 0.7)",
		color: "rgba(54, 54, 54, 0.7)",
		"&.Mui-selected": {
			color: "#07617D",
		},
		"&.Mui-focusVisible": {
			backgroundColor: "rgba(100, 95, 228, 0.32)",
		},
	}),
);

export default function CustomTabsWithBoxShadow({ sectionTitle, data }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.08)" }}>
				<Container sx={{ paddingTop: "16px" }}>
					<SectionTitleText
						sx={{
							marginBottom: "16px",
							// textTransform: "uppercase",
							fontWeight: 600,
						}}
					>
						{sectionTitle || "Your Meetings"}
					</SectionTitleText>
					<StyledTabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						{data.map((item, index) => (
							<StyledTab
								key={index}
								label={item.label}
								sx={{
									textTransform: "initial",
									fontWeight: 600,
									fontSize: "16px",
									lineHeight: "30px",
									fontStyle: "normal",
								}}
								{...a11yProps(index)}
							/>
						))}
					</StyledTabs>
				</Container>
			</Box>
			<Box>
				<Container>
					{data.map((item, index) => (
						<TabPanel key={index} value={value} index={index}>
							{item.component}
						</TabPanel>
					))}
				</Container>
			</Box>
		</Box>
	);
}
