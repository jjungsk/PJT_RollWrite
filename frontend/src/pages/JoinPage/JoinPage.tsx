import React, { useEffect } from "react";
import { joinGroup } from "../../apis/home";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "../../constants/types";

function JoinPage() {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (isLogin && inviteCode)
      toast
        .promise(joinGroup(inviteCode), {
          loading: "모임에 가입중입니다...",
          success: <b>가입을 완료했습니다.</b>,
          error: <b>가입에 실패했습니다.</b>,
        })
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          toast.error(error.message);
          navigate("/question");
        });
  });

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default JoinPage;
