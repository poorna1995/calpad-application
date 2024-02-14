import { InputLabel } from "@mui/material";
import React from "react";
import Select from "react-select";

const customStyles = {
	control: (styles) => ({
		...styles,
		paddingTop: "5px",
		paddingBottom: "5px",
		borderRadius: "10px",
		// fontFamily: "Mulish, sans-serif",
		":hover": {
			borderColor: "black",
		},
	}),
	menu: (provided) => ({
		...provided,
		zIndex: 9999,
		// fontFamily: "Mulish, sans-serif",
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: "none",
	}),
};
const FormSelectInput = ({
	title,
	required,
	options,
	labelStyles,
	noPadding,
	styles,
	...props
}) => {
	const ref = React.createRef();
	return (
		<div style={{ paddingTop: noPadding ? "0px" : "24px", width: "100%" }}>
			{title && (
				<InputLabel
					style={
						labelStyles
							? labelStyles
							: {
									color: "black",
									marginBottom: "8px",
									fontWeight: "bold",
							  }
					}
				>
					{title}
					{required && "*"}
				</InputLabel>
			)}
			<Select
				{...props}
				ref={ref}
				styles={styles || customStyles}
				closeMenuOnSelect
				theme={(theme) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: "#07617D",
					},
					borderColor: theme.primary,
				})}
				options={options}
			/>
		</div>
	);
};

export default FormSelectInput;
