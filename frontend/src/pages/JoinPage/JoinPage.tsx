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
        .then((res) => {
          console.log("응답");
          console.log(res);

          if (res.status === 200) {
            toast("가입을 완료했습니다.");
            navigate("/home");
          } else if (res.status === 400) {
            toast.error(res.data.message);
            navigate("/question");
          } else {
            toast.error("로그인을 먼저 해주세요!");
            navigate("/login");
          }
        })
        .catch(() => {
          navigate("/error");
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
