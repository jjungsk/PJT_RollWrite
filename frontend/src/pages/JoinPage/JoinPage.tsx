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
    if (isLogin && inviteCode) {
      joinGroup(inviteCode)
        .then(() => {
          toast("가입을 완료했습니다.");
          navigate("/home");
        })
        .catch((error) => {
          if (error.statusCode === 400) {
            toast.error(error.message);
            navigate("/question");
          } else {
            toast.error("로그인을 먼저 해주세요!");
            navigate("/login");
          }
        });
    }
  });

  return (
    <div>
      <Toaster />
    </div>
  );
}

export default JoinPage;
