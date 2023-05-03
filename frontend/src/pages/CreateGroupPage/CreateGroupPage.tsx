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
import { handleKakaoClick } from "../../utils/kakaoShare";

function CreateGroupPage() {
  const navigate = useNavigate();
  const [GruopCreatStep, setGruopCreatStep] = useState(0);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [newGroupInfo, setNewGroupInfo] = useState<GroupInfo>();

  useEffect(() => {
    getGroupTag()
      .then((res) => {
        console.log(res);
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
      alert("모임명은 1~24 글자로 입력해주세요.");
      return false;
    }

    if (!startDay) {
      alert("모임 시작일을 선택해주세요.");
      return false;
    }

    if (!endDay) {
      alert("모임 종료일을 선택해주세요.");
      return false;
    }

    if (!color) {
      alert("모임 테마를 선택해주세요.");
      return false;
    }

    if (isAfter(new Date(startDay), new Date(endDay))) {
      alert("시작일이 종료일 이후입니다.");
      return false;
    }

    if (isAfter(subDays(new Date(), 1), new Date(startDay))) {
      alert("시작일이 오늘보다 이전입니다.");
      return false;
    }

    return true;
  };

  const handleClickBackBtn = () => {
    if (GruopCreatStep === 0) navigate(-1);

    setGruopCreatStep(GruopCreatStep - 1);
  };

  const handleClickConfirmBtn = () => {
    if (GruopCreatStep === 1 && !validateForm()) return;

    if (GruopCreatStep === 2)
      createGroup(groupInfo)
        .then((res) => {
          console.log(res);
          setNewGroupInfo(res.data);
        })
        .catch((error) => {
          console.error(error);
          return;
        });

    if (GruopCreatStep === 3) navigate("/home");

    setGruopCreatStep(GruopCreatStep + 1);
  };

  return (
    <>
      <BackNavigation onClick={handleClickBackBtn} />
      {GruopCreatStep === 0 && (
        <CreateGroupStepOne onClick={handleClickConfirmBtn} />
      )}
      {GruopCreatStep === 1 && (
        <CreateGroupStepTwo
          onClick={handleClickConfirmBtn}
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
        />
      )}
      {GruopCreatStep === 2 && (
        <CreateGroupStepThree
          tagList={tagList}
          onClick={handleClickConfirmBtn}
          groupInfo={groupInfo}
          setGroupInfo={setGroupInfo}
        />
      )}
      {GruopCreatStep === 3 && newGroupInfo && (
        <Info
          title={newGroupInfo?.title}
          subTitle="모임을 만들었어요."
          fillLabel="초대하기"
          ghostLabel="홈으로"
          fillOnClick={() => handleKakaoClick(newGroupInfo?.inviteUrl!)}
          ghostOnClick={handleClickConfirmBtn}
        />
      )}
    </>
  );
}

export default CreateGroupPage;
