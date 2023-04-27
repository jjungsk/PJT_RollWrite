import React, { useEffect, useState } from "react";
import {
  GroupInput,
  GroupNameContainer,
  Title,
} from "../CreateGroupPage/style";
import { InvitePageContainer } from "./style";

function InvitePageContinger() {
  const [inviteUrl, setInviteUrl] = useState(
    "http://localhost:8081/api/auth/join=[B@2706ea30"
  );

  const QRCode = require("qrcode");

  useEffect(() => {
    const canvas = document.getElementById("roomCode");
    QRCode.toCanvas(canvas, inviteUrl);
  }, [QRCode, inviteUrl]);
  return (
    <InvitePageContainer>
      <Title>
        <div>초대해보세요</div>
      </Title>
      <canvas
        id="roomCode"
        style={{ borderRadius: 20, margin: "auto" }}
      ></canvas>
      <GroupNameContainer>
        <p>초대링크</p>
        <GroupInput value={inviteUrl} disabled />
      </GroupNameContainer>
    </InvitePageContainer>
  );
}

export default InvitePageContinger;
