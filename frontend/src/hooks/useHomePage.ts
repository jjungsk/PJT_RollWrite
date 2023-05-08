import { useState } from "react";
import { Question } from "../constants/types";
import { getGroupList } from "../apis/home";

function useGroupList() {
  const [groupList, setGroupList] = useState<Question[]>();

  getGroupList().then((res) => {
    setGroupList(res.data);
  });
  return groupList;
}

export default useGroupList;
