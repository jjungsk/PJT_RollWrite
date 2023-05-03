import { useState, useEffect } from "react";
import { getUserDetail } from "../apis/user";
import { Profile } from "../constants/types";

function useProfile() {
  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    profileImage: "",
    ongoingGroupCnt: 0,
    completeGroupCnt: 0,
  });

  useEffect(() => {
    getUserDetail()
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return profile;
}

export default useProfile;
