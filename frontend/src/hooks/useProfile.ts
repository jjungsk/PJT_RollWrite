import { useState, useEffect } from "react";
import { getUserDetail } from "../apis/user";
import { Profile } from "../constants/types";
import { toast } from "react-hot-toast";

function useProfile(editProfileMode?: boolean) {
  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    profileImage: "",
    cntMeetingProgress: 0,
    cntMeetingProgressIsDone: 0,
  });

  useEffect(() => {
    getUserDetail().then((res) => {
      setProfile(res.data);
    });
  }, [editProfileMode]);

  return profile;
}

export default useProfile;
