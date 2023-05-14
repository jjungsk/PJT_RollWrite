import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AdminPageChartContainer,
  AdminPageChartWrap,
  AdminPageStatsSummary,
} from "./style";
import {
  getMeetingList,
  getMeetingStatistics,
  getParticipantStatistics,
  getUser,
  getUserStatistics,
} from "./admin";
import { MeetingStats, ParticipantStats, UserStats } from "./type";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  useMediaQuery,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { User } from "./type";
import { Meeting } from "./type";

function AdminPageIndex() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<{
    mode: "meeting" | "user" | "participant";
    key: string;
  }>();
  const [meetingList, setMeetingList] = useState<Meeting[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [participantList, setParticipantList] = useState<User[]>([]);
  const [userCnt, setUserCnt] = useState<number>(0);
  const [adminCnt, setAdminCnt] = useState<number>(0);
  const [meetingCnt, setMeetingCnt] = useState<number>(0);
  const [meetingStats, setMeetingStats] = useState<MeetingStats[]>([]);
  const [participantStats, setParticipantStats] = useState<
    { name: string; value: number; userList: User[] }[]
  >([]);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [resize, setResize] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  useEffect(() => {
    getUser("user").then((res) => {
      setUserCnt(res.data.length);
    });

    getUser("admin").then((res) => {
      setAdminCnt(res.data.length);
      setUserCnt((prevState) => prevState + res.data.length);
    });

    getMeetingList().then((res) => {
      setMeetingCnt(res.data.length);
    });

    getMeetingStatistics().then((res) => {
      setMeetingStats(res.data);
    });

    getUserStatistics().then((res) => {
      setUserStats(res.data);
    });

    getParticipantStatistics().then((res) => {
      var statsClassify: { name: string; value: number; userList: User[] }[] = [
        { name: "0개", value: 0, userList: [] },
        { name: "1개", value: 0, userList: [] },
        { name: "2개", value: 0, userList: [] },
        { name: "3개", value: 0, userList: [] },
        { name: "4개", value: 0, userList: [] },
        { name: "5개 이상", value: 0, userList: [] },
      ];
      res.data.map((stats: ParticipantStats) => {
        statsClassify[stats.meetingCnt <= 5 ? stats.meetingCnt : 5].value +=
          stats.findUserResDtoList?.length ?? 0;
        (stats.findUserResDtoList ?? []).forEach((user: User) =>
          statsClassify[
            stats.meetingCnt <= 5 ? stats.meetingCnt : 5
          ].userList.push(user)
        );
        return null;
      });
      setParticipantStats(statsClassify);
    });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const makeChart = (
    data: MeetingStats[] | ParticipantStats[] | UserStats[],
    xKey: string,
    xLabel: string,
    yKey: string,
    yLabel: string
  ) => {
    return (
      <BarChart
        data={data}
        width={resize > 768 ? 600 : 350}
        height={resize > 768 ? 350 : 300}
      >
        <XAxis
          dataKey={xKey}
          label={{ value: xLabel, position: "insideBottomRight", dy: 8 }}
          stroke="#007AFF"
          cursor={"pointer"}
          onClick={(e: any) => handleClickChart(yKey, e.value)}
        />
        <YAxis
          label={{ value: yLabel, angle: -90, position: "insideLeft", dx: 10 }}
          allowDecimals={false}
        />
        <Tooltip />
        <CartesianGrid stroke="#E5E5E5" strokeDasharray="5 5" />
        <Bar
          dataKey={yKey}
          fill="#007AFF"
          barSize={30}
          cursor={"pointer"}
          onClick={(e: any) => handleClickChart(yKey, e.day)}
        />
      </BarChart>
    );
  };

  const renderMeetingChart = makeChart(
    meetingStats,
    "day",
    "날짜",
    "meetingCnt",
    "생성된 모임 수"
  );
  const renderUserChart = makeChart(
    userStats,
    "day",
    "날짜",
    "userCnt",
    "가입한 사용자 수"
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        {percent !== 0 && (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${participantStats[index].name} ${(percent * 100).toFixed(0)}%`}
          </text>
        )}
      </>
    );
  };

  const renderParticipantChart = (
    <PieChart
      width={resize > 768 ? 350 : 300}
      height={resize > 768 ? 350 : 300}
    >
      <Pie
        data={participantStats}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={resize > 768 ? 175 : 150}
        fill="#8884d8"
        dataKey="value"
      >
        {participantStats.map(
          (entry, index) =>
            entry && (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                onClick={() => handleClickChart("participantCnt", index + "")}
              />
            )
        )}
      </Pie>
      <Tooltip />
    </PieChart>
  );

  const handleClickChart = (key: string, value: string) => {
    if (key === "meetingCnt") {
      meetingStats.map((stats: MeetingStats) => {
        if (value === stats.day) {
          setMeetingList(stats.findMeetingResDtoList);
          setDialogMode({ mode: "meeting", key: value });
          handleClickDialogOpen();
        }
        return null;
      });
    } else if (key === "userCnt") {
      userStats.map((stats: UserStats) => {
        if (value === stats.day) {
          setUserList(stats.findUserResDtoList);
          setDialogMode({ mode: "user", key: value });
          handleClickDialogOpen();
        }
        return null;
      });
    } else if (key === "participantCnt") {
      setParticipantList(participantStats[Number(value)].userList);
      setDialogMode({ mode: "participant", key: value });
      handleClickDialogOpen();
    }
  };

  const handleClickDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const makeChartDetail = () => {
    return (
      <>
        {dialogMode && (
          <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {dialogMode.mode === "meeting" &&
                `${dialogMode.key} 생성된 모임 목록`}
              {dialogMode.mode === "user" &&
                `${dialogMode.key} 가입한 사용자 목록`}
              {dialogMode.mode === "participant" &&
                `${dialogMode.key}개${
                  dialogMode.key === "5" ? " 이상" : ""
                }의 모임을 가입한 사용자 목록`}
            </DialogTitle>
            <DialogContent>
              {dialogMode.mode === "meeting" && (
                <TableContainer component={Paper}>
                  <Table sx={{ width: 500 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>모임 이름</TableCell>
                        <TableCell align="center">시작일</TableCell>
                        <TableCell align="center">종료일</TableCell>
                        <TableCell align="center">테마</TableCell>
                        <TableCell align="center">태그</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {meetingList?.map((meeting) => (
                        <TableRow
                          key={meeting.meetingId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {meeting.title}
                          </TableCell>
                          <TableCell align="center">
                            {meeting.startDay}
                          </TableCell>
                          <TableCell align="center">{meeting.endDay}</TableCell>
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
                          <TableCell align="center">
                            {meeting.tag.map(
                              (t, i) =>
                                t.content +
                                (i < meeting.tag.length - 1 ? ", " : "")
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {(dialogMode.mode === "user" ||
                dialogMode.mode === "participant") && (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 720,
                    margin: "auto",
                  }}
                >
                  {(dialogMode.mode === "user"
                    ? userList
                    : participantList
                  )?.map((user, i) => (
                    <div key={user.userId}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={user.nickname} src={user.profileImage} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.nickname}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                User Type -{" "}
                              </Typography>
                              {user.userType}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {i < userList.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </div>
                  ))}
                </List>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>닫기</Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    );
  };

  const renderMeetingDetail = makeChartDetail();
  const renderUserDetail = makeChartDetail();
  const renderParticipantDetail = makeChartDetail();

  return (
    <>
      {dialogMode && (
        <>
          {dialogMode.mode === "meeting" && renderMeetingDetail}
          {dialogMode.mode === "user" && renderUserDetail}
          {dialogMode.mode === "participant" && renderParticipantDetail}
        </>
      )}

      <AdminPageStatsSummary>
        🤷사용자: {userCnt}명 &nbsp;&nbsp;&nbsp;&nbsp; 👨‍💻관리자: {adminCnt}명
        &nbsp;&nbsp;&nbsp;&nbsp; 👪모임: {meetingCnt}개
      </AdminPageStatsSummary>
      <AdminPageChartWrap>
        <AdminPageChartContainer>
          <div>모임 생성</div>
          {renderMeetingChart}
        </AdminPageChartContainer>
        <AdminPageChartContainer>
          <div>사용자 가입</div>
          {renderUserChart}
        </AdminPageChartContainer>
        <AdminPageChartContainer>
          <div>참여중인 모임 개수</div>
          {renderParticipantChart}
        </AdminPageChartContainer>
      </AdminPageChartWrap>
    </>
  );
}

export default AdminPageIndex;
