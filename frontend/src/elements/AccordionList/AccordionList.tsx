import React, { useState } from "react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTitle,
} from "./style";
import { ReactComponent as Arrow } from "../../assets/Arrow.svg";
import { AccordionItemType } from "../../constants/types";

function AccordionList(props: { items: AccordionItemType[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      {props.items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionItemTitle
            isOpen={activeIndex === index}
            onClick={() => handleClick(index)}
          >
            {item.title}
            <Arrow />
          </AccordionItemTitle>
          {activeIndex === index && (
            <AccordionItemContent isOpen={activeIndex === index}>
              {item.content}
            </AccordionItemContent>
          )}
        </AccordionItem>
      ))}
    </div>
  );
}

export default AccordionList;
