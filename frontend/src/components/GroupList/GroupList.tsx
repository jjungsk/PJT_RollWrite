import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import GroupCard from "../../components/GroupCard/GroupCard";
import { GroupInfo } from "../../constants/types";

interface GroupListProps {
  groupList?: GroupInfo[];
  onIndexChanged: (index: number) => void;
}

function GroupList({ groupList, onIndexChanged }: GroupListProps) {
  return (
    <Swiper
      width={360}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={(e) => onIndexChanged(e.activeIndex)}
    >
      {groupList?.map((groupInfo, i) => (
        <SwiperSlide key={i}>
          <GroupCard groupInfo={groupInfo} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GroupList;
