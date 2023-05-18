import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AccordionItem, AccordionItemTitle } from "./style";
import { ReactComponent as Arrow } from "../../../assets/Arrow.svg";
import { AccordionItemType } from "../../../constants/types";

function AccordionList(props: { items: AccordionItemType[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div style={{ height: "calc(100% - 40px)", overflow: "scroll" }}>
      {props.items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionItemTitle
            isOpen={activeIndex === index}
            onClick={() => handleClick(index)}
          >
            {item.title}
            <Arrow />
          </AccordionItemTitle>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: "0px", opacity: 0 }}
                animate={{ height: "fit-content", opacity: 1 }}
                exit={{ height: "0px", opacity: 0 }}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </AccordionItem>
      ))}
    </div>
  );
}

export default AccordionList;
