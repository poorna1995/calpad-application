import { Typography, styled } from "@mui/material";
import React from "react";

const StyledText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "28px",
  color: "#1f1f1f",
  fontweight: "400",
}));
const DescriptionText = ({ children, ...props }) => {
  return <StyledText {...props}>{children}</StyledText>;
};

export default DescriptionText;
