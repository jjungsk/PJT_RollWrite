import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { ReactComponent as BackArrow } from "../../../assets/Back_Btn.svg";
import { ReactComponent as PrevArrow } from "../../../assets/Prev_Btn.svg";
import { EmojiCarouselContainer } from "./style";
import { Question } from "../../../constants/types";
import Emoji from "../../Atom/Emoji/Emoji";
import Box from "../../Atom/Box/Box";

interface Props {
  questionList: Question[];
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  currentSlide: number;
}

function EmojiCarousel({ questionList, setCurrentSlide, currentSlide }: Props) {
  const [swiper, setSwiper] = useState<SwiperType>();

  const nextTo = () => {
    swiper?.slideNext();
  };

  const backTo = () => {
    swiper?.slidePrev();
  };
  return (
    <EmojiCarouselContainer>
      {currentSlide === 0 ? (
        <Box height="60px" width="60px" />
      ) : (
        <BackArrow onClick={backTo} />
      )}
      <Swiper
        style={{ width: "200px", overflow: "hidden" }}
        slidesPerView={1}
        spaceBetween={50}
        onRealIndexChange={(element) => setCurrentSlide(element.activeIndex)}
        onSwiper={(s) => {
          setSwiper(s);
        }}
      >
        {questionList.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Emoji label={item.emoji} imgSrc={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      {currentSlide === questionList.length - 1 ? (
        <Box height="60px" width="60px" />
      ) : (
        <PrevArrow onClick={nextTo} />
      )}
    </EmojiCarouselContainer>
  );
}

export default EmojiCarousel;
