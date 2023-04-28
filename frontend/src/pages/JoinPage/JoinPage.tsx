import React from "react";
import { joinGroup } from "../../apis/home";
import { useNavigate, useParams } from "react-router-dom";

function JoinPage() {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  console.log(inviteCode);
  if (inviteCode)
    joinGroup(inviteCode)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate(-1);
      });
  return <div>JoinPage</div>;
}

export default JoinPage;
