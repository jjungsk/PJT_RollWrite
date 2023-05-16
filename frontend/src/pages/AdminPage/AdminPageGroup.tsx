import React, { useEffect, useState } from "react";
import { AdminPageWrapper } from "./style";
import { Meeting, User } from "./type";
import { createTodayQuestion, getMeetingList } from "./admin";
import { toast } from "react-hot-toast";
import {
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogActions,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import AdminPageDialog from "./AdminPageDialog";
import { ReactComponent as Person } from "../../assets/Person.svg";

function AdminPageGroup() {
  const [meetingList, setMeetingList] = useState<Meeting[]>();
  const [userList, setUserList] = useState<User[]>();
  const [clickedMeeting, setClickedMeeting] = useState<Meeting>();
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    getMeetingList().then((res) => {
      toast.success(res.message);
      setMeetingList(res.data);
    });
  }, []);

  const handleClick = (meeting: Meeting) => {
    setClickedMeeting(meeting);
    setOpen(true);
  };

  const onAgree = () => {
    clickedMeeting &&
      createTodayQuestion(clickedMeeting.meetingId).then((res) => {
        toast.success(res.message);
        setMeetingList(res.data);
      });
  };

  const handleClickDialogOpen = (meetingId: number) => {
    meetingList?.map((meeting: Meeting) => {
      if (meeting.meetingId === meetingId) {
        setUserList(meeting.participant);
        setOpenDialog(true);
      }
      return null;
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">참여자 목록</DialogTitle>
          <DialogContent>
            <List
              sx={{
                width: "100%",
                maxWidth: 720,
                margin: "auto",
              }}
            >
              {userList?.map((user, i) => (
                <div key={user.userId}>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Avatar alt={user.nickname} src={user.profileImage} />
                    </ListItemAvatar>
                    <ListItemText>{user.nickname}</ListItemText>
                  </ListItem>
                  {i < userList.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </div>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      )}
      <AdminPageWrapper>
        <AdminPageDialog
          open={open}
          setOpen={setOpen}
          title={clickedMeeting?.title + "에 오늘의 질문을 추가하시겠습니까?"}
          onAgree={onAgree}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>모임 이름</TableCell>
                <TableCell align="center">시작일</TableCell>
                <TableCell align="center">종료일</TableCell>
                <TableCell align="center">참여자</TableCell>
                <TableCell align="center">테마</TableCell>
                <TableCell align="center">초대코드</TableCell>
                <TableCell align="center">태그</TableCell>
                <TableCell align="center">질문추가</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meetingList?.map((meeting) => (
                <TableRow
                  key={meeting.meetingId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {meeting.title}
                  </TableCell>
                  <TableCell align="center">{meeting.startDay}</TableCell>
                  <TableCell align="center">{meeting.endDay}</TableCell>
                  <TableCell
                    align="center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickDialogOpen(meeting.meetingId)}
                  >
                    <Person width={"16px"} height={"16px"} />{" "}
                    {meeting.participantCnt ?? 0}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: meeting.color,
                        margin: "auto",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{meeting.inviteUrl}</TableCell>
                  <TableCell align="center">
                    {meeting.tag.map(
                      (t, i) =>
                        t.content + (i < meeting.tag.length - 1 ? ", " : "")
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <MapsUgcRoundedIcon onClick={() => handleClick(meeting)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AdminPageWrapper>
    </>
  );
}

export default AdminPageGroup;
