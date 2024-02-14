import { IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import TextInput from ".";

const PasswordInput = ({ title, containerStyles, required, ...props }) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div>
			<TextInput
				type={showPassword ? "text" : "password"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								disableRipple
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
								size="large"
							>
								{showPassword ? (
									<MdVisibility />
								) : (
									<MdVisibilityOff />
								)}
							</IconButton>{" "}
						</InputAdornment>
					),
				}}
				containerStyles={containerStyles}
				required={required}
				title={title}
				{...props}
			/>
		</div>
	);
};

export default PasswordInput;
