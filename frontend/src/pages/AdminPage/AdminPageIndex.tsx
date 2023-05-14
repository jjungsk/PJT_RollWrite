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

function AdminPageIndex() {
  const [userCnt, setUserCnt] = useState<number>(0);
  const [adminCnt, setAdminCnt] = useState<number>(0);
  const [meetingCnt, setMeetingCnt] = useState<number>(0);
  const [meetingStats, setMeetingStats] = useState<MeetingStats[]>([]);
  const [participantStats, setParticipantStats] = useState<
    { name: string; value: number }[]
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
      var statsClassify = [
        { name: "0개", value: 0 },
        { name: "1개", value: 0 },
        { name: "2개", value: 0 },
        { name: "3개", value: 0 },
        { name: "4개", value: 0 },
        { name: "5개 이상", value: 0 },
      ];
      res.data.map((stats: ParticipantStats) => {
        statsClassify[stats.meetingCnt <= 5 ? stats.meetingCnt : 5].value +=
          stats.findUserResDtoList?.length ?? 0;
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
        />
        <YAxis
          label={{ value: yLabel, angle: -90, position: "insideLeft", dx: 10 }}
          allowDecimals={false}
        />
        <Tooltip />
        <CartesianGrid stroke="#E5E5E5" strokeDasharray="5 5" />
        <Bar dataKey={yKey} fill="#007AFF" barSize={30} />
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
              />
            )
        )}
      </Pie>
      <Tooltip />
    </PieChart>
  );

  return (
    <>
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
