import React, { useEffect } from "react";
import { joinGroup } from "../../apis/home";
import { useNavigate, useParams } from "react-router-dom";

function JoinPage() {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (inviteCode)
      joinGroup(inviteCode)
        .then((res) => {
          console.log(res);
          navigate("/question ");
        })
        .catch((err) => {
          console.error(err);
          navigate("/question ");
        });
  });

  return <div>JoinPage</div>;
}

export default JoinPage;