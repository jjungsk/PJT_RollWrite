import React, { useEffect, useState } from "react";
import { InvitePageContainer } from "./style";
import { getInviteUrl } from "../../apis/home";
import { useParams } from "react-router-dom";
import InputLine from "../../elements/InputLine/InputLine";
import { ReactComponent as Copy } from "../../assets/Copy.svg";
import GhostBtn from "../../elements/Button/GhostBtn";
import { handleKakaoClick } from "../../apis/kakaoShare";

function InvitePageContinger() {
  const { meetingId } = useParams();
  const [inviteUrl, setInviteUrl] = useState("");
  const QRCode = require("qrcode");

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      alert("복사 성공!");
    } catch (error) {
      alert("복사 실패!");
    }
  };

  useEffect(() => {
    if (meetingId)
      getInviteUrl(meetingId)
        .then((res) => {
          console.log(res);
          setInviteUrl(res.data.inviteUrl);
          const canvas = document.getElementById("roomCode");
          QRCode.toCanvas(canvas, res.data.inviteUrl);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [meetingId, QRCode]);

  return (
    <InvitePageContainer>
      <div>초대해보세요</div>

      <canvas
        id="roomCode"
        style={{ borderRadius: 20, margin: "auto" }}
      ></canvas>
      <InputLine
        label="초대링크"
        name="link"
        value={inviteUrl}
        Icon={Copy}
        onClick={handleCopyClipBoard}
      />
      <GhostBtn label="공유하기" onClick={() => handleKakaoClick(inviteUrl)} />
    </InvitePageContainer>
  );
}

export default InvitePageContinger;
