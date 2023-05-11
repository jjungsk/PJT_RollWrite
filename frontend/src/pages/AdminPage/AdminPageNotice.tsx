import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import { AdminPageWrapper } from "./style";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
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

export default function AdminPageNotice() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <AdminPageWrapper>
      <div
        style={{
          textAlign: "end",
          margin: "auto",
          marginBottom: "16px",
          width: "100%",
          maxWidth: "1080px",
        }}
      >
        <Button variant="contained" endIcon={<CreateRoundedIcon />}>
          공지 작성
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "white",
          padding: "32px",
          margin: "auto",
          marginBottom: "16px",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "1080px",
        }}
      >
        공지 작성
        <TextField
          id="standard-basic"
          label="제목"
          variant="standard"
          sx={{ width: "90%", margin: "auto" }}
        />
        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          sx={{ width: "90%", margin: "auto" }}
        />
        <div>
          <Button
            variant="contained"
            sx={{ width: "100px", marginInline: "16px" }}
          >
            저장하기
          </Button>
          <Button
            color="secondary"
            variant="contained"
            sx={{ width: "100px", marginInline: "16px" }}
          >
            취소하기
          </Button>
        </div>
      </div>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ width: "100%", maxWidth: "1080px", margin: "auto" }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography>Collapsible Group Item #1</Typography>
            <div style={{ display: "flex", gap: "16px" }}>
              <EditRoundedIcon />
              <DeleteRoundedIcon />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </AdminPageWrapper>
  );
}
