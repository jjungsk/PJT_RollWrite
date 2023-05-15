import { useState, useEffect } from "react";
import { getUserDetail } from "../apis/user";
import { Profile } from "../constants/types";

function useProfile(editProfileMode?: boolean) {
  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    profileImage: "",
    cntMeetingProgress: 0,
    cntMeetingProgressIsDone: 0,
    point: 0,
  });

  useEffect(() => {
    getUserDetail().then((res) => {
      setProfile(res.data);
    });
  }, [editProfileMode]);

  return profile;
}

export default useProfile;
