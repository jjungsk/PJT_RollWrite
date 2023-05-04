import { useState } from "react";
import { Question } from "../constants/types";
import { getGroupList } from "../apis/home";
import { toast } from "react-hot-toast";

function useGroupList() {
  const [groupList, setGroupList] = useState<Question[]>();

  getGroupList().then((res) => {
    setGroupList(res.data);
  });
  return groupList;
}

export default useGroupList;
