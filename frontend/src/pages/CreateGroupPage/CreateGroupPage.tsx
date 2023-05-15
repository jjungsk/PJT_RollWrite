import React, { useEffect, useState } from "react";
import Info from "../../components/Molecules/EmojiTitleBtn/Info";
import { useNavigate } from "react-router-dom";
import { CreateGroup, Group, Tag } from "../../constants/types";
import { createGroup, getGroupTag } from "../../apis/home";
import { isAfter, subDays } from "date-fns";
import BackNavigation from "../../components/Organism/BackNavigation/BackNavigation";
import CreateGroupStepOne from "../../components/Organism/CreateGroupSteps/CreateGroupStepOne";
import CreateGroupStepTwo from "../../components/Organism/CreateGroupSteps/CreateGroupStepTwo";
import CreateGroupStepThree from "../../components/Organism/CreateGroupSteps/CreateGroupStepThree";
import { handleKakaoInviteShare } from "../../utils/kakaoShare";
import toast from "react-hot-toast";
import { differenceInDays } from "date-fns";

function CreateGroupPage() {
  const navigate = useNavigate();
  const [groupCreateStep, setGroupCreateStep] = useState(0);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [newGroupInfo, setNewGroupInfo] = useState<Group>();

  useEffect(() => {
    getGroupTag().then((res) => {
      setTagList(res.data);
    });
  }, []);

  const [groupInfo, setGroupInfo] = useState<CreateGroup>({
    title: "",
    tag: [],
    startDay: new Date().toString(),
    endDay: "",
    color: "",
  });
  const { title, startDay, endDay, color } = groupInfo;

  const validateForm = () => {
    const titleLength = title.trim().length;

    if (titleLength === 0 || titleLength > 24) {
      toast.error("모임명은 1~24자 이내로 입력해주세요.");
      return false;
    }

    if (!startDay || !endDay) {
      toast.error("시작일과 종료일을 선택해 주세요.");
      return false;
    }

    if (!color) {
      toast.error("모임 테마를 설정해 주세요");
      return false;
    }

    if (isAfter(new Date(startDay), new Date(endDay))) {
      toast.error("시작일이 종료일보다 느립니다.");
      return false;
    }

    if (isAfter(subDays(new Date(), 1), new Date(startDay))) {
      toast.error("시작일이 오늘 이전입니다.");
      return false;
    }

    if (differenceInDays(new Date(endDay), new Date(startDay)) < 2) {
      toast.error("모임기간은 최소 3일 입니다.");
      return false;
    }

    if (differenceInDays(new Date(endDay), new Date(startDay)) > 30) {
      toast.error("모임기간은 최대 30일 입니다.");
      return false;
    }

    return true;
  };

  const handleBackButtonClick = () => {
    if (groupCreateStep === 0) navigate(-1);
    setGroupCreateStep(groupCreateStep - 1);
  };

  const handleConfirmButtonClick = () => {
    if (groupCreateStep === 1 && !validateForm()) return;

    if (groupCreateStep === 2) {
      toast
        .promise(createGroup(groupInfo), {
          loading: "모임을 생성중입니다...",
          success: <b>생성을 완료했습니다.</b>,
          error: <b>생성에 실패했습니다.</b>,
        })
        .then((res) => {
          setNewGroupInfo(res.data);
        })
        .catch(() => {
          return;
        });
    }

    if (groupCreateStep === 3) navigate("/home");

    setGroupCreateStep(groupCreateStep + 1);
  };

  return (
    <>
      <BackNavigation onClick={handleBackButtonClick} />
      {groupCreateStep === 0 && (
        <CreateGroupStepOne onClick={handleConfirmButtonClick} />
      )}
      {groupCreateStep === 1 && (
        <CreateGroupStepTwo
          onClick={handleConfirmButtonClick}
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
        />
      )}
      {groupCreateStep === 2 && (
        <CreateGroupStepThree
          tagList={tagList}
          onClick={handleConfirmButtonClick}
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
        />
      )}
      {groupCreateStep === 3 && newGroupInfo && (
        <Info
          title={newGroupInfo?.title}
          subTitle="모임을 만들었어요."
          emoji="🤝"
          fillLabel="초대하기"
          ghostLabel="홈으로"
          fillOnClick={() => handleKakaoInviteShare(newGroupInfo)}
          ghostOnClick={handleConfirmButtonClick}
        />
      )}
    </>
  );
}

export default CreateGroupPage;
