import React, { useEffect, useState } from "react";
import {
  AddProfileImgBtn,
  EditProfileBtnContainer,
  GroupListContainer,
  Nickname,
  ProfileContainer,
  ProfileImg,
  ProfileImgBG,
  ProfileInfo,
  ProfileInfoDetail,
} from "./style";
import ProfileCard from "../../assets/Profile_Card.svg";
import { ReactComponent as Sprout } from "../../assets/Sprout_2.svg";
import { ReactComponent as Flower } from "../../assets/Flower.svg";
import { ReactComponent as PlusWhite } from "../../assets/Plus_White.svg";
import { ReactComponent as Trash } from "../../assets/Trash-alt.svg";
import { GroupInfo } from "../../constants/types";
import Contour from "../../elements/Contour/Contour";
import GroupCard from "../../components/GroupCard/GroupCard";
import { useNavigate } from "react-router-dom";
import { getUserGroupIsDoneList, updateUserDetail } from "../../apis/user";
import useProfile from "../../hooks/useProfile";
import FillBtn from "../../elements/Button/FillBtn";
import GhostBtn from "../../elements/Button/GhostBtn";
import { toast } from "react-hot-toast";

function MyPage() {
  const navigate = useNavigate();

  const [profileImgFile, setProfileImgFile] = useState<File>();
  const [tmpProfileImg, setTmpProfileImg] = useState<string>("");
  const [isDeleteImg, setIsDeleteImg] = useState<boolean>(false);
  const [tmpNickname, setTmpNickname] = useState<string>("");
  const [editProfileMode, setEditProfileMode] = useState<boolean>(false);
  const [groupList, setGroupList] = useState<GroupInfo[]>([]);

  const profile = useProfile(editProfileMode);

  useEffect(() => {
    getUserGroupIsDoneList(0, 10).then((res) => {
      setGroupList(res.data);
    });
  }, []);

  useEffect(() => {
    setTmpProfileImg(profile.profileImage);
    setTmpNickname(profile.nickname);
  }, [profile]);

  const handleClickGroup = (meetingId: number) => {
    navigate(`/result/${meetingId}`);
  };

  const handleClickEditProfileBtn = () => {
    setEditProfileMode(true);
  };

  const cancelEditProfile = () => {
    setTmpProfileImg(profile.profileImage);
    setTmpNickname(profile.nickname);
    setEditProfileMode(false);
  };

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setTmpProfileImg(e.target.result as string);
          setProfileImgFile(files[0]);
          setIsDeleteImg(false);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpNickname(e.target.value);
  };

  const editProfile = () => {
    if (tmpNickname.length <= 15) {
      const data = JSON.stringify({
        isRemoveImage: isDeleteImg,
        nickname: tmpNickname,
      });
      const jsonData = new Blob([data], { type: "application/json" });

      const formData = new FormData();
      formData.append("modifyUserReqDto", jsonData);
      if (!isDeleteImg && profileImgFile) {
        formData.append("profileImage", profileImgFile);
      }

      updateUserDetail(formData)
        .then((res) => {
          if (res.statusCode === 200) {
            toast("정상적으로 수정되었습니다!", {
              icon: "✔️",
            });
            setIsDeleteImg(false);
            setEditProfileMode(false);
          }
        })
        .catch(() => toast.error("회원정보 수정 중에 문제가 발생하였습니다."));
    } else {
      toast.error("닉네임은 15자 이내로 작성하셔야 합니다!");
    }
  };

  const handelClickDeleteBtn = () => {
    setIsDeleteImg(true);
    setTmpProfileImg("");
  };

  return (
    <div>
      <ProfileContainer style={{ backgroundImage: `url(${ProfileCard})` }}>
        <ProfileImg size={110} bgImg={tmpProfileImg}>
          {editProfileMode && (
            <>
              <ProfileImgBG size={110} />
              <AddProfileImgBtn htmlFor="profile-img">
                <PlusWhite />
              </AddProfileImgBtn>
              <input
                id="profile-img"
                type="file"
                accept="image/*"
                onChange={handleProfileImg}
                style={{ display: "none" }}
              />
              {tmpProfileImg && (
                <Trash
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    backgroundColor: "var(--white-color)",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.25) 2px 2px 2px",
                  }}
                  onClick={handelClickDeleteBtn}
                />
              )}
            </>
          )}
        </ProfileImg>
        <ProfileInfo>
          <Nickname
            type="text"
            onChange={handleChange}
            value={tmpNickname}
            disabled={!editProfileMode}
          />
          <ProfileInfoDetail>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Sprout />
                  </td>
                  <td>진행 중인 모임</td>
                  <td>{profile.cntMeetingProgress}</td>
                </tr>
                <tr>
                  <td>
                    <Flower />
                  </td>
                  <td>완료된 모임</td>
                  <td>{profile.cntMeetingProgressIsDone}</td>
                </tr>
              </tbody>
            </table>
          </ProfileInfoDetail>
          {!editProfileMode && (
            <GhostBtn label="프로필 편집" onClick={handleClickEditProfileBtn} />
          )}
          {editProfileMode && (
            <EditProfileBtnContainer>
              <FillBtn label="수정" onClick={editProfile} />
              <GhostBtn label="취소" onClick={cancelEditProfile} />
            </EditProfileBtnContainer>
          )}
        </ProfileInfo>
      </ProfileContainer>

      <Contour text="참여한 모임" />

      <GroupListContainer>
        {groupList.map((group: GroupInfo) => (
          <div
            key={group.meetingId}
            onClick={() => handleClickGroup(group.meetingId)}
          >
            <GroupCard
              complete
              width="calc(100% - 60px)"
              height="90px"
              groupInfo={group}
              margin="16px auto"
            />
          </div>
        ))}
        <div></div>
      </GroupListContainer>
    </div>
  );
}

export default MyPage;
