import React from "react";
import { joinGroup } from "../../apis/home";
import { useParams } from "react-router-dom";

function JoinPage() {
  const { inviteCode } = useParams();
  console.log(inviteCode);
  if (inviteCode)
    joinGroup(inviteCode)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  return <div>JoinPage</div>;
}

export default JoinPage;
