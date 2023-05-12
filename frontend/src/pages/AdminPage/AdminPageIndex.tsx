import React, { useState, useEffect } from "react";
import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { AdminPageChartContainer, AdminPageChartWrap } from "./style";
import {
  getMeetingStatistics,
  getParticipantStatistics,
  getUserStatistics,
} from "./admin";
import { MeetingStats, ParticipantStats, UserStats } from "./type";

function AdminPageIndex() {
  const [meetingStats, setMeetingStats] = useState<MeetingStats[]>([]);
  const [participantStats, setParticipantStats] = useState<ParticipantStats[]>(
    []
  );
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [resize, setResize] = useState<number>(0);

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  useEffect(() => {
    getMeetingStatistics().then((res) => {
      setMeetingStats(res.data);
    });
    getParticipantStatistics().then((res) => {
      setParticipantStats(
        res.data.map((stats: ParticipantStats) => {
          return {
            ...stats,
            userCnt: stats.findUserResDtoList?.length ?? 0,
          };
        })
      );
    });
    getUserStatistics().then((res) => {
      setUserStats(res.data);
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
      <BarChart data={data} width={resize > 768 ? 600 : 360} height={300}>
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
  const renderParticipantChart = makeChart(
    participantStats,
    "meetingCnt",
    "참여중인 모임 수",
    "userCnt",
    "사용자 수"
  );

  return (
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
  );
}

export default AdminPageIndex;
