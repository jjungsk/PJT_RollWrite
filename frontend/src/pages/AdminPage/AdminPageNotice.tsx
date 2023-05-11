import React, { useState, useEffect } from "react";
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
import TextField from "@mui/material/TextField";
import { AdminPageWrapper } from "./style";
import { Notice } from "./type";
import { toast } from "react-hot-toast";
import {
  UpdateNoitce,
  createNoitce,
  deleteNoitce,
  getNoitceList,
} from "./admin";

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
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [myNotice, setMyNotice] = useState<Notice>({ title: "", content: "" });
  const [noticeList, setNoticeList] = useState<Notice[]>();

  useEffect(() => {
    getNoitceList().then((res) => {
      toast.success(res.message);
      setNoticeList(res.data);
    });
  }, []);
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setMyNotice({
      ...myNotice,
      [name]: value,
    });
  };

  const handleClickBtn = () => {
    if (myNotice.title.length === 0) {
      toast.error("제목이 없습니다.");
      return;
    } else if (myNotice.content.length === 0) {
      toast.error("내용이 없습니다.");
      return;
    }

    isSave
      ? createNoitce(myNotice).then((res) => {
          toast.success(res.message);
          setIsEditing(false);
          getNoitceList().then((res) => {
            toast.success(res.message);
            setNoticeList(res.data);
          });
        })
      : UpdateNoitce(myNotice).then((res) => {
          toast.success(res.message);
          setIsEditing(false);
          getNoitceList().then((res) => {
            toast.success(res.message);
            setNoticeList(res.data);
          });
        });
  };

  const handleClickDelete = (noticeId?: number) => {
    noticeId &&
      deleteNoitce(noticeId).then((res) => {
        toast.success(res.message);
        getNoitceList().then((res) => {
          toast.success(res.message);
          setNoticeList(res.data);
        });
      });
  };

  const handleClickUpdate = (notice: Notice) => {
    setIsEditing(true);
    setIsSave(false);
    setMyNotice(notice);
  };

  const handleClickSave = () => {
    setIsEditing(true);
    setIsSave(true);
    setMyNotice({ title: "", content: "" });
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
        <Button
          variant="contained"
          endIcon={<CreateRoundedIcon />}
          onClick={handleClickSave}
        >
          공지 작성
        </Button>
      </div>
      {isEditing && (
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
            value={myNotice.title}
            sx={{ width: "90%", margin: "auto" }}
            name="title"
            onChange={handleChangeInput}
          />
          <TextField
            id="outlined-multiline-static"
            label="내용"
            multiline
            rows={4}
            name="content"
            value={myNotice.content}
            onChange={handleChangeInput}
            sx={{ width: "90%", margin: "auto" }}
          />
          <div>
            <Button
              variant="contained"
              sx={{ width: "100px", marginInline: "16px" }}
              onClick={handleClickBtn}
            >
              {isSave ? `저장하기` : `수정하기`}
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{ width: "100px", marginInline: "16px" }}
              onClick={() => setIsEditing(false)}
            >
              취소하기
            </Button>
          </div>
        </div>
      )}
      {noticeList?.map((notice) => (
        <Accordion
          expanded={expanded === `panel${notice.noticeId}`}
          onChange={handleChange(`panel${notice.noticeId}`)}
          key={notice.noticeId}
          sx={{ width: "100%", maxWidth: "1080px", margin: "auto" }}
        >
          <AccordionSummary>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography>
                #{notice.noticeId} {notice.title} ({notice.createdAt})
              </Typography>
              <div style={{ display: "flex", gap: "16px" }}>
                <EditRoundedIcon onClick={() => handleClickUpdate(notice)} />
                <DeleteRoundedIcon
                  onClick={() => handleClickDelete(notice.noticeId)}
                />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "start" }}>
            <Typography>{notice.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </AdminPageWrapper>
  );
}
