import React from "react";
import { Notify } from "../../../constants/types";
import NotifyCard from "../../Molecules/NotifyCard/NotifyCard";
import { NotifyCardListContainer } from "./style";

function NotifyCardList(props: { notifyList: Notify[] }) {
  return (
    <NotifyCardListContainer>
      {props.notifyList.map((notify) => (
        <NotifyCard notify={notify} key={notify.id} margin={"12px auto"} />
      ))}
    </NotifyCardListContainer>
  );
}

export default NotifyCardList;
