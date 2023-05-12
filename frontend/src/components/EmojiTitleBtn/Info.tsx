import React from "react";
import Emoji from "../../elements/Emoji/Emoji";
import { InfoContainer } from "./style";
import GhostBtn from "../../elements/Button/GhostBtn";
import FillBtn from "../../elements/Button/FillBtn";

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
        <FillBtn label={props.fillLabel} onClick={props.fillOnClick} />
      )}
      {props.ghostLabel && (
        <GhostBtn label={props.ghostLabel} onClick={props.ghostOnClick} />
      )}
    </InfoContainer>
  );
}

export default Info;
