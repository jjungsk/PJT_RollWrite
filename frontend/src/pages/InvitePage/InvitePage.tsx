import React, { useEffect, useState } from "react";
import { InvitePageContainer } from "./style";
import { getInviteUrl } from "../../apis/home";
import { useParams } from "react-router-dom";
import InputLine from "../../elements/InputLine/InputLine";
import { ReactComponent as CopyIcon } from "../../assets/Copy.svg";
import GhostButton from "../../elements/Button/GhostBtn";
import { handleKakaoShare } from "../../utils/kakaoShare";

function InvitePage() {
  const { meetingId } = useParams();
  const [inviteUrl, setInviteUrl] = useState("");
  const QRCode = require("qrcode");

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      alert("복사 성공!");
    } catch (error) {
      alert("복사 실패!");
    }
  };

  const generateQRCode = (url: string) => {
    const canvas = document.getElementById("roomCode");
    QRCode.toCanvas(canvas, url);
  };

  useEffect(() => {
    if (meetingId) {
      getInviteUrl(meetingId)
        .then((response) => {
          const url = response.data.inviteUrl;
          setInviteUrl(url);
          generateQRCode(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

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
        Icon={CopyIcon}
        onClick={handleCopyToClipboard}
      />
      <GhostButton
        label="공유하기"
        onClick={() => handleKakaoShare(inviteUrl)}
      />
    </InvitePageContainer>
  );
}

export default InvitePage;
