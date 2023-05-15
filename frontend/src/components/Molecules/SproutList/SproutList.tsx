import React from "react";
import { SPROUT_LIST } from "../../../constants/sprout";
import { padding } from "@mui/system";

function SproutList() {
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
      <div>답변률에 따라 새싹이 진화합니다</div>
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
        {SPROUT_LIST.map((s, i) => i !== 0 && s)}
      </div>
    </div>
  );
}

export default SproutList;
