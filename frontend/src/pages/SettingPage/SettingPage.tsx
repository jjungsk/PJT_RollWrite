import React, { useEffect, useState } from "react";
import {
  SettingBtnContainer,
  SettingContainer,
  SettingMenuItem,
  SettingMenuItemText,
  SettingSection,
  SettingSectionTitle,
} from "./style";
import SwitchBtn from "../../components/Atom/SwitchBtn/SwitchBtn";
import { ReactComponent as Back } from "../../assets/Back.svg";
import { logout, withdraw } from "../../apis/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { persistor } from "../../store/store";
import Btn from "../../components/Atom/Btn/Btn";
import { pop } from "../../utils/pop";
import { motion, useAnimation } from "framer-motion";

function SettingPage() {
  const navigate = useNavigate();
  const purge = async () => {
    await persistor.purge();
  };

  const handleClickMenu = (path: string) => {
    if (path === "service") {
      toast("아직 개발중입니다.", {
        icon: "🤦‍♂️",
      });
      return;
    } else {
      navigate(`/${path}`);
    }
  };

  const handleClickLogoutBtn = () => {
    logout()
      .then((res) => {
        if (res.statusCode === 200) {
          toast("정상적으로 로그아웃이 되었습니다.", {
            icon: "🚪",
          });
          purge();
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("로그아웃 중 문제가 발생하였습니다.");
      });
  };

  const handleClickWithdrawBtn = () => {
    var checkWithdraw = window.confirm("정말 탈퇴하시겠습니까?");

    if (checkWithdraw) {
      withdraw()
        .then((res) => {
          if (res.statusCode === 200) {
            toast("정상적으로 탈퇴하었습니다.", {
              icon: "🏃‍♂️",
            });
            purge();
            navigate("/");
          }
        })
        .catch(() => {
          toast.error("회원탈퇴 중 문제가 발생하였습니다.");
        });
    }
  };

  const controls = useAnimation();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1 });
  });

  const handleClickVersion = () => {
    setClickCount((prevClickCount) => prevClickCount + 1);

    if (clickCount === 2) {
      // pop(100);
      toast("That's Rollwrite!", {
        icon: "🤟",
      });
      setTimeout(() => setClickCount(0), 500);
    }
  };

  return (
    <SettingContainer>
      {/* <SettingSection>
        <SettingSectionTitle>알림 설정</SettingSectionTitle>
        <SettingMenuItem>
          <SettingMenuItemText>
            중요알림 받기
            <div>질문 알림, 멘션 알림, 완성 알림 등</div>
          </SettingMenuItemText>
          <SwitchBtn />
        </SettingMenuItem>
        <SettingMenuItem>
          <SettingMenuItemText>
            기타알림 받기
            <div>운영자의 알림, 관심글, 키워드 알림 등</div>
          </SettingMenuItemText>
          <SwitchBtn />
        </SettingMenuItem>
      </SettingSection> */}
      <SettingSection>
        {/* <SettingSectionTitle>기타 안내</SettingSectionTitle> */}
        <SettingMenuItem onClick={() => handleClickMenu("notice")}>
          <SettingMenuItemText>공지사항</SettingMenuItemText>
          <Back />
        </SettingMenuItem>
        <SettingMenuItem onClick={() => handleClickMenu("inquiry")}>
          <SettingMenuItemText>의견 보내기</SettingMenuItemText>
          <Back />
        </SettingMenuItem>
        <SettingMenuItem onClick={() => handleClickMenu("service")}>
          <SettingMenuItemText>서비스 이용약관</SettingMenuItemText>
          <Back />
        </SettingMenuItem>
        <SettingMenuItem onClick={handleClickVersion}>
          <SettingMenuItemText>버전 정보</SettingMenuItemText>
          <div>1.2.1</div>
        </SettingMenuItem>
      </SettingSection>

      <SettingBtnContainer>
        <div>
          <Btn label="로그아웃" onClick={handleClickLogoutBtn} color="fill" />
        </div>
        {/* <div>
          <GhostBtn label="회원탈퇴" onClick={handleClickWithdrawBtn} />
        </div> */}
      </SettingBtnContainer>
    </SettingContainer>
  );
}

export default SettingPage;
