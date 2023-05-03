import React, { useEffect, useState } from "react";
import Info from "../../components/EmojiTitleBtn/Info";
import { useNavigate } from "react-router-dom";
import { CreateGroup, GroupInfo, Tag } from "../../constants/types";
import { createGroup, getGroupTag } from "../../apis/home";
import { isAfter, subDays } from "date-fns";
import BackNavigation from "../../components/BackNavigation/BackNavigation";
import CreateGroupStepOne from "../../components/CreateGroupSteps/CreateGroupStepOne";
import CreateGroupStepTwo from "../../components/CreateGroupSteps/CreateGroupStepTwo";
import CreateGroupStepThree from "../../components/CreateGroupSteps/CreateGroupStepThree";
import { handleKakaoShare } from "../../utils/kakaoShare";
import toast, { Toaster } from "react-hot-toast";

function CreateGroupPage() {
  const navigate = useNavigate();
  const [groupCreateStep, setGroupCreateStep] = useState(0);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [newGroupInfo, setNewGroupInfo] = useState<GroupInfo>();

  useEffect(() => {
    getGroupTag()
      .then((res) => {
        setTagList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [groupInfo, setGroupInfo] = useState<CreateGroup>({
    title: "",
    tag: [],
    startDay: "",
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

    return true;
  };

  const handleBackButtonClick = () => {
    if (groupCreateStep === 0) navigate(-1);
    setGroupCreateStep(groupCreateStep - 1);
  };

  const handleConfirmButtonClick = () => {
    if (groupCreateStep === 1 && !validateForm()) return;

    if (groupCreateStep === 2) {
      createGroup(groupInfo)
        .then((res) => {
          setNewGroupInfo(res.data);
        })
        .catch((error) => {
          console.error(error);
          return;
        });
    }

    if (groupCreateStep === 3) navigate("/home");

    setGroupCreateStep(groupCreateStep + 1);
  };

  return (
    <>
      <Toaster />
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
          fillLabel="초대하기"
          ghostLabel="홈으로"
          fillOnClick={() => handleKakaoShare(newGroupInfo?.inviteUrl!)}
          ghostOnClick={handleConfirmButtonClick}
        />
      )}
    </>
  );
}

export default CreateGroupPage;
