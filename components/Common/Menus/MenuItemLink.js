import { MenuItem } from "@mui/material";
import React from "react";
import AppLink from "../AppLink";

const MenuItemLink = ({ children, sx, ...props }) => {
  return (
    <MenuItem component={AppLink} {...props}>
      {children}
    </MenuItem>
  );
};

export default MenuItemLink;
