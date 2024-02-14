import { Chip, styled } from "@mui/material";
import React from "react";

const StyledChip = styled(Chip)(({ theme }) => ({
  boxShadow: "0px 4px 54px rgba(14, 192, 180, 0.2)",
  background: "white",
  color: "#153230",
  fontSize: "16px",
  lineHeight: "28px",
  fontWeight: "600",
  paddingRight: "24px",
  paddingLeft: "24px",
  ...theme,
}));

const CustomChip = ({ ...props }) => {
  return <StyledChip {...props} />;
};

export default CustomChip;
