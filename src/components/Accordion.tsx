"use client";
import * as React from "react";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import "./accordion.css";

type AccordionData = { title: string; description: string }[];

interface AccordionTransitionProps {
  data: AccordionData;
}

export default function AccordionTransition({ data }: AccordionTransitionProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleExpansion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mapData = data.map((item) => (
    <Accordion
      className="accordion__content"
      expanded={expanded === item.title}
      onChange={handleExpansion(item.title)}
      slots={{ transition: Fade as AccordionSlots["transition"] }}
      slotProps={{ transition: { timeout: 400 } }}
      sx={{
        width: "100%",
        margin: 0, 
        "& .MuiAccordionSummary-root": {
          minHeight: "40px", 
          height: "40px", 
          padding: "0 16px",
          justifyContent: "center",
        },
        "& .MuiAccordionSummary-root.Mui-expanded": {
          minHeight: "40px",
          height: "40px",
        },
        "& .MuiAccordionDetails-root": {
          padding: "16px",
          textAlign: "center",
          display: expanded === item.title ? "block" : "none", 
        },
        "&:not(.Mui-expanded)": {
          overflow: "hidden", 
        },
      }}
      key={item.title}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${item.title}-content`}
        id={`${item.title}-header`}
      >
        <Typography fontWeight={"bold"}  component="span">{item.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{item.description}</Typography>
      </AccordionDetails>
    </Accordion>
  ));

  return <div className="accordion__wrapper">{mapData}</div>;
}