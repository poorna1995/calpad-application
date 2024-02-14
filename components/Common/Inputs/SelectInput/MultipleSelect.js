import { InputLabel } from "@mui/material";
import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
const animatedComponents = makeAnimated();

const customStyles = {
	multiValueRemove: (styles) => ({
		...styles,
		":hover": {
			backgroundColor: "#484A9E",
			color: "white",
		},
	}),
	control: (styles) => ({
		...styles,
		paddingTop: "5px",
		paddingBottom: "5px",
		":hover": {
			borderColor: "black",
		},
	}),
};
const MultipleSelect = ({ title, options, required, isDisabled, ...props }) => {
	// const ref = React.createRef();

	return (
		<div style={{ paddingTop: "24px" }}>
			<InputLabel
				style={{
					color: "black",
					marginBottom: "8px",
					fontWeight: "bold",
				}}
			>
				{title}
				{required && "*"}
			</InputLabel>
			<Select
				// ref={ref}
				isMulti
				styles={customStyles}
				components={animatedComponents}
				options={options}
				isDisabled={isDisabled}
				theme={(theme) => ({
					...theme,
					// borderRadius: 0,
					colors: {
						...theme.colors,
						primary: "#484A9E",
					},
					borderColor: theme.primary,
				})}
				{...props}
			/>
		</div>
	);
};

export default MultipleSelect;
