import React from "react";
import { DOG_LIST, SPROUT_LIST } from "../../../constants/sprout";

interface Props {
  thema: string;
}
function SproutList({ thema }: Props) {
  const SproutThema = thema === "#CEEDC7" ? DOG_LIST : SPROUT_LIST;
  console.log(SproutThema);
  return (
    <div
      style={{
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <div>답변률에 따라 진화합니다</div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          paddingBlock: "16px",
          backgroundColor: "var(--white-color)",
          borderRadius: "16px",
        }}
      >
        {SproutThema.map((s, i) => i !== 0 && s)}
      </div>
    </div>
  );
}

export default SproutList;
