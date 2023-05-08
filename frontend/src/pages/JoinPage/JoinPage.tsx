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
          console.log("에러 발생!");
          console.log(error);

          if (error.response.status === 400) {
            toast.error(error.response.data);
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
