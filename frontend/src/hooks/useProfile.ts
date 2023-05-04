import { useState, useEffect } from "react";
import { getUserDetail } from "../apis/user";
import { Profile } from "../constants/types";
import { toast } from "react-hot-toast";

function useProfile() {
  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    profileImage: "",
    cntMeetingProgress: 0,
    cntMeetingProgressIsDone: 0,
  });

  useEffect(() => {
    getUserDetail()
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return profile;
}

export default useProfile;
