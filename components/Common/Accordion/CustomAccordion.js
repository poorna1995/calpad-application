import * as React from "react";
import { styled } from "@mui/material/";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import SectionTitleText from "../Typography/HeadingText/SectionTitleText";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: "transparent",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  background: "inherit",
  // borderBottom: "1px solid rga(0,0,0,0.1)",
  // backgroundColor:
  // 	theme.palette.mode === "dark"
  // 		? "rgba(255, 255, 255, .05)"
  // 		: "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions({ data }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === item.panelID}
            onChange={handleChange(item.panelID)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <SectionTitleText
                sx={{
                  fontWeight: 700,
                  fontSize: `18px`,
                  lineHeight: `28px`,
                }}
              >
                {item.title}
              </SectionTitleText>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: `14px`,
                  lineHeight: `28px`,
                  color: "#1f1f1f",
                }}
              >
                {item.description ||
                  `Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Suspendisse malesuada lacus ex, sit amet
							blandit leo lobortis eget. Lorem ipsum dolor sit
							amet, consectetur adipiscing elit. Suspendisse
							malesuada lacus ex, sit amet blandit leo lobortis
							eget.`}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}
