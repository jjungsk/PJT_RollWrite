import React, { useRef } from "react";
import { TabsContainer, TabsContent, TabsUnderline } from "./style";

interface Props {
  menuTabList: string[];
  selectedMenuIndex: number;
  setSelectedMenuIndex: React.Dispatch<React.SetStateAction<number>>;
}
function Tabs({ menuTabList, selectedMenuIndex, setSelectedMenuIndex }: Props) {
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (index: number) => {
    setSelectedMenuIndex(index);
  };

  const calculateUnderlinePosition = () => {
    if (!tabsRef.current) return "0px";

    const children = Array.from(tabsRef.current.children) as HTMLElement[];
    const selectedChild = children[selectedMenuIndex];
    return `${selectedChild.offsetLeft}px`;
  };

  return (
    <TabsContainer ref={tabsRef}>
      {menuTabList.map((menu, index) => (
        <TabsContent
          key={index}
          isClicked={index === selectedMenuIndex}
          onClick={() => handleClick(index)}
        >
          {menu}
        </TabsContent>
      ))}
      <TabsUnderline style={{ left: calculateUnderlinePosition() }} />
    </TabsContainer>
  );
}

export default Tabs;
