import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getInviteUrl } from "../../../apis/home";
import InputLine from "../../Molecules/InputLine/InputLine";
import { ReactComponent as CopySvg } from "../../../assets/Copy.svg";
import Btn from "../../Atom/Btn/Btn";
import { handleKakaoShare } from "../../../utils/kakaoShare";
import { GroupInviteContainer } from "./style";

interface Props {
  meetingId: number;
}

function GroupInvite({ meetingId }: Props) {
  const [inviteUrl, setInviteUrl] = useState("");
  const QRCode = require("qrcode");

  useEffect(() => {
    if (meetingId) {
      getInviteUrl(String(meetingId)).then((response) => {
        const url = response.data.inviteUrl;
        setInviteUrl(url);
        generateQRCode(url);
      });
    }
  });

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast("복사 성공!", {
        icon: "📋",
      });
    } catch (error) {
      toast.error("복사 실패");
    }
  };

  const generateQRCode = (url: string) => {
    const canvas = document.getElementById("roomCode");
    QRCode.toCanvas(canvas, url);
  };
  return (
    <GroupInviteContainer>
      <canvas id="roomCode" style={{ borderRadius: 20 }}></canvas>
      <InputLine
        label="초대링크"
        name="link"
        value={inviteUrl}
        Icon={CopySvg}
        onClick={handleCopyToClipboard}
      />
      <Btn label="공유하기" onClick={() => handleKakaoShare(inviteUrl)} />
    </GroupInviteContainer>
  );
}

export default GroupInvite;
