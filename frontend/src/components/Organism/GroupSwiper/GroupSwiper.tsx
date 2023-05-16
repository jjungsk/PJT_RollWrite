import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import GroupCard from "../../Molecules/GroupCard/GroupCard";
import { Group } from "../../../constants/types";

interface Props {
  groupList?: Group[];
  onIndexChanged: (index: number) => void;
  setHomeContent: React.Dispatch<React.SetStateAction<number>>;
  homeContent: number;
}

function GroupSwiper({
  groupList,
  onIndexChanged,
  setHomeContent,
  homeContent,
}: Props) {
  return (
    <Swiper
      style={{ height: "128px", width: "100vw", maxWidth: "450px" }}
      spaceBetween={20}
      slidesPerView={1}
      onSlideChange={(e) => onIndexChanged(e.activeIndex)}
    >
      {groupList?.map((groupInfo, i) => (
        <SwiperSlide key={i}>
          <GroupCard
            groupInfo={groupInfo}
            setHomeContent={setHomeContent}
            homeContent={homeContent}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GroupSwiper;
