import React, { ChangeEvent, useEffect, useState } from "react";
import Info from "../../components/Info/Info";
import { useNavigate } from "react-router-dom";
import {
  GroupInput,
  GroupNameContainer,
  TagBtn,
  TagListContainer,
  ThemaBox,
  ThemaSelect,
  Title,
} from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import { CreateGroup, Tag } from "../../constants/types";
import { ReactComponent as Check } from "../../assets/Check.svg";
import { createGroup, getGroupTag } from "../../apis/group";
import GroupTag from "../../elements/GroupTag/GroupTag";
import { isAfter, subDays } from "date-fns";

function CreateGroupPage() {
  const navigate = useNavigate();
  const [createState, setCreateState] = useState(0);
  const [tagList, setTagList] = useState<Tag[]>([]);

  const [selectedTagList, setSelectedTagList] = useState();

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
  const { title, tag, startDay, endDay, color } = groupInfo;

  const handleChangeGroupInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    setGroupInfo({
      ...groupInfo,
      [name]: value,
    });
  };

  const handleClickThemaBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value, name } = e.target as HTMLButtonElement;
    setGroupInfo({
      ...groupInfo,
      [name]: value,
    });
  };

  const handleClickTagBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value, name } = e.target as HTMLButtonElement;

    tag.includes(parseInt(value))
      ? setGroupInfo({
          ...groupInfo,
          [name]: tag.filter((item) => item !== parseInt(value)),
        })
      : tag.length > 3
      ? alert("최대 4개까지 가능합니다")
      : setGroupInfo({
          ...groupInfo,
          [name]: [...tag, parseInt(value)],
        });
    console.log(groupInfo);
  };

  const handelClickNextBtn = () => {
    if (!validateForm()) {
      return;
    }
    setCreateState(2);
  };
  const handelClickCreateGroup = () => {
    createGroup(groupInfo)
      .then((res) => {
        console.log(res);
        setCreateState(3);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  return (
    <>
      {createState === 0 && (
        <Info
          emoji="👋"
          title="새로운 모임을"
          subTitle="생성하시겠어요?"
          ghostLabel="확인"
          ghostOnClick={() => setCreateState(1)}
        />
      )}
      {createState === 1 && (
        <>
          <Title>
            <div>정보를 입력하고</div>
            <div> 아래 확인 버튼을 누르세요</div>
          </Title>

          <GroupNameContainer>
            <p>모임명</p>
            <GroupInput
              name="title"
              onChange={handleChangeGroupInfo}
              value={title}
            />
          </GroupNameContainer>
          <GroupNameContainer>
            <p>모임 시작일</p>
            <GroupInput
              type="date"
              name="startDay"
              onChange={handleChangeGroupInfo}
              value={startDay}
            />
          </GroupNameContainer>
          <GroupNameContainer>
            <p>모임 종료일</p>
            <GroupInput
              type="date"
              name="endDay"
              onChange={handleChangeGroupInfo}
              value={endDay}
            />
          </GroupNameContainer>
          <GroupNameContainer>
            <p>모임 테마</p>
            <ThemaSelect>
              <ThemaBox
                color="var(--orange-color)"
                name="color"
                onClick={handleClickThemaBtn}
                value="#FFD4B2"
              >
                {color === "#FFD4B2" && <Check />}
              </ThemaBox>
              <ThemaBox
                color="var(--yellow-color)"
                name="color"
                onClick={handleClickThemaBtn}
                value="#FFF6BD"
              >
                {color === "#FFF6BD" && <Check />}
              </ThemaBox>
              <ThemaBox
                color="var(--green-color)"
                name="color"
                onClick={handleClickThemaBtn}
                value="#CEEDC7"
              >
                {color === "#CEEDC7" && <Check />}
              </ThemaBox>

              <ThemaBox
                color="var(--blue-color)"
                name="color"
                onClick={handleClickThemaBtn}
                value="#D1D9F8"
              >
                {color === "#D1D9F8" && <Check />}
              </ThemaBox>
            </ThemaSelect>
          </GroupNameContainer>

          <GhostBtn
            label="확인"
            margin="64px 0px"
            onClick={handelClickNextBtn}
          />
        </>
      )}
      {createState === 2 && (
        <>
          <Title>
            <div>{title}은</div>
            <div> 어떤 모임인가요?</div>
            <p> 최대 4개를 선택할수 있습니다.</p>
          </Title>
          <TagListContainer>
            {tagList.map((tagListTag) => (
              <TagBtn
                name="tag"
                value={tagListTag.tagId}
                onClick={handleClickTagBtn}
                isTagged={tag.includes(tagListTag.tagId)}
              >
                {tagListTag.content}
              </TagBtn>
            ))}
          </TagListContainer>

          <GhostBtn
            label="확인"
            margin="64px 0px"
            onClick={handelClickCreateGroup}
          />
        </>
      )}
      {createState === 3 && (
        <Info
          title="자율 PJT 팀 가보자구"
          subTitle="모임을 만들었어요."
          fillLabel="초대하기"
          ghostLabel="홈으로"
          fillOnClick={() => setCreateState(0)}
          ghostOnClick={() => navigate("/home")}
        />
      )}
    </>
  );
}

export default CreateGroupPage;
