import React from "react";
import Emoji from "../../Atom/Emoji/Emoji";
import { InfoContainer } from "./style";
import Btn from "../../Atom/Btn/Btn";

function Info(props: {
  emoji?: string;
  title?: string;
  subTitle?: string;
  fillLabel?: string;
  ghostLabel?: string;
  ghostOnClick?: () => void;
  fillOnClick?: () => void;
}) {
  return (
    <InfoContainer>
      {props.emoji && <Emoji label={props.emoji} />}
      {props.title && <div className="title">{props.title}</div>}
      {props.subTitle && <div className="subTitle">{props.subTitle}</div>}
      {props.fillLabel && (
        <Btn label={props.fillLabel} onClick={props.fillOnClick} />
      )}
      {props.ghostLabel && (
        <Btn label={props.ghostLabel} onClick={props.ghostOnClick} />
      )}
    </InfoContainer>
  );
}

export default Info;
