import React from "react";
import {
  SettingContainer,
  SettingMenuItem,
  SettingMenuItemText,
  SettingSection,
  SettingSectionTitle,
} from "./style";
import SwitchBtn from "../../elements/Button/SwitchBtn";
import { ReactComponent as Back } from "../../assets/Back.svg";

function SettingPage() {
  return (
    <SettingContainer>
      <SettingSection>
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
      </SettingSection>
      <SettingSection>
        <SettingSectionTitle>기타 안내</SettingSectionTitle>
        <SettingMenuItem>
          <SettingMenuItemText>공지사항</SettingMenuItemText>
          <Back />
        </SettingMenuItem>
        <SettingMenuItem>
          <SettingMenuItemText>문의사항</SettingMenuItemText>
          <Back />
        </SettingMenuItem>
        <SettingMenuItem>
          <SettingMenuItemText>서비스 상세정보 / 약관</SettingMenuItemText>
          <Back />
        </SettingMenuItem>
        <SettingMenuItem>
          <SettingMenuItemText>버전 정보</SettingMenuItemText>
          <div>1.1.1</div>
        </SettingMenuItem>
      </SettingSection>
    </SettingContainer>
  );
}

export default SettingPage;
